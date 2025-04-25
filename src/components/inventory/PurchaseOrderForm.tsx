
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Sample data
const vendors = [
  { id: 1, name: "AgriChem Suppliers Ltd." },
  { id: 2, name: "Green Farm Inputs Pvt." },
  { id: 3, name: "Organic Solutions Inc." },
  { id: 4, name: "Krishak Inputs Co." },
];

const products = [
  { id: "SKU001", name: "NPK Fertilizer 15-15-15", unit: "bag", price: 1200 },
  { id: "SKU002", name: "Pesticide Spray - Premium", unit: "liter", price: 450 },
  { id: "SKU003", name: "Wheat Seeds - Grade A", unit: "kg", price: 80 },
  { id: "SKU004", name: "Micronutrients Mix", unit: "packet", price: 150 },
];

export function PurchaseOrderForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Purchase Order Created",
        description: "The purchase order has been generated successfully."
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Purchase Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Vendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map(vendor => (
                    <SelectItem key={vendor.id} value={vendor.id.toString()}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(product => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} (₹{product.price}/{product.unit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-4">
              <Input type="number" placeholder="Quantity" className="flex-1" />
              <Input type="number" placeholder="Rate per unit" className="flex-1" />
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating Order..." : "Create Order"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
