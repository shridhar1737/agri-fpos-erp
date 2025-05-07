
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSupabaseData } from "@/hooks/useSupabaseData";

type SearchResult = {
  id: string;
  title: string;
  description: string;
  module: string;
  icon?: React.ReactNode;
  link: string;
};

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  // Example: Fetch data from different modules
  const { data: farmers } = useSupabaseData<any>({ 
    tableName: 'farmers',
    select: 'id, name, village, main_crop'
  });
  
  const { data: purchaseOrders } = useSupabaseData<any>({ 
    tableName: 'purchase_orders',
    select: 'id, vendor_name, product_name, total_amount'
  });
  
  const { data: inventory } = useSupabaseData<any>({ 
    tableName: 'stock_movements',
    select: 'id, product, quantity, type'
  });

  const { data: sales } = useSupabaseData<any>({
    tableName: 'sale_orders',
    select: 'id, order_number, product, customer_id'
  });

  useEffect(() => {
    // Keyboard shortcut to open search (Ctrl+K or Cmd+K)
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    // Normalize search query for case-insensitive matching
    const query = searchQuery.toLowerCase().trim();
    
    // Search across farmers
    const farmerResults = (farmers || [])
      .filter(f => 
        f.name?.toLowerCase().includes(query) || 
        f.village?.toLowerCase().includes(query) || 
        f.main_crop?.toLowerCase().includes(query)
      )
      .map(f => ({
        id: `farmer-${f.id}`,
        title: f.name || "Unnamed Farmer",
        description: `${f.village || "Unknown Village"} · ${f.main_crop || "Unknown Crop"}`,
        module: "Farmers",
        link: `/farmers?id=${f.id}`
      }));
    
    // Search across purchase orders
    const poResults = (purchaseOrders || [])
      .filter(po => 
        po.vendor_name?.toLowerCase().includes(query) || 
        po.product_name?.toLowerCase().includes(query)
      )
      .map(po => ({
        id: `po-${po.id}`,
        title: `PO: ${po.vendor_name}`,
        description: `${po.product_name} · ₹${po.total_amount}`,
        module: "Procurement",
        link: `/finance?po=${po.id}`
      }));
    
    // Search across inventory
    const inventoryResults = (inventory || [])
      .filter(i => 
        i.product?.toLowerCase().includes(query) || 
        i.type?.toLowerCase().includes(query)
      )
      .map(i => ({
        id: `inv-${i.id}`,
        title: i.product || "Unknown Product",
        description: `${i.type} · ${i.quantity} units`,
        module: "Inventory",
        link: `/inventory?id=${i.id}`
      }));
    
    // Search across sales orders
    const salesResults = (sales || [])
      .filter(s => 
        s.order_number?.toLowerCase().includes(query) || 
        s.product?.toLowerCase().includes(query)
      )
      .map(s => ({
        id: `sale-${s.id}`,
        title: `Order #${s.order_number}`,
        description: `${s.product}`,
        module: "Sales",
        link: `/sales?order=${s.id}`
      }));
    
    // Combine and limit results
    setResults([
      ...farmerResults, 
      ...poResults, 
      ...inventoryResults,
      ...salesResults
    ].slice(0, 10)); // Limit to 10 results to avoid overwhelming the UI
    
  }, [searchQuery, farmers, purchaseOrders, inventory, sales]);

  // Group results by module
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.module]) {
      acc[result.module] = [];
    }
    acc[result.module].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const handleSelect = (link: string) => {
    setOpen(false);
    navigate(link);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2"
      >
        <Search className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-500">Search...</span>
        <kbd className="ml-auto hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-gray-600 opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search across all modules..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {Object.entries(groupedResults).map(([module, moduleResults]) => (
            <CommandGroup key={module} heading={module}>
              {moduleResults.map((result) => (
                <CommandItem 
                  key={result.id}
                  onSelect={() => handleSelect(result.link)}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{result.title}</span>
                    <span className="text-xs text-gray-500">{result.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
