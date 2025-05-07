
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCcw } from "lucide-react";
import { PurchaseOrder } from "./types";
import { formatDate, formatCurrency } from "./utils";

// Import components for table display
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PurchaseOrderRow } from "./PurchaseOrderRow";
import { Skeleton } from "@/components/ui/skeleton";

// Create a simple skeleton component for loading state
function PurchaseOrderSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-20" />
        </div>
      ))}
    </div>
  );
}

export function PurchaseOrderList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const { data: purchaseOrders, loading, error, refetch } = useSupabaseData<PurchaseOrder>({ 
    tableName: 'purchase_orders',
    orderBy: { column: 'created_at', ascending: false }
  });

  // Force refetch on component load and when refreshTrigger changes
  useEffect(() => {
    refetch();
  }, [refetch, refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const filteredOrders = purchaseOrders?.filter(order => 
    order.vendor_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Purchase Orders</CardTitle>
        <Button size="sm" variant="outline" onClick={handleRefresh}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by vendor or product..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <PurchaseOrderSkeleton />
        ) : error ? (
          <div className="p-4 text-center">
            <p className="text-red-500 mb-4">Error loading purchase orders: {error.message}</p>
            <Button variant="outline" onClick={handleRefresh}>
              Try Again
            </Button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center py-6">No purchase orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Document</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <PurchaseOrderRow 
                    key={order.id} 
                    order={order} 
                    formatDate={formatDate} 
                    formatCurrency={formatCurrency} 
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
