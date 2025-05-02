
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PurchaseOrder {
  id: string;
  vendor_name: string;
  product_name: string;
  quantity: number;
  rate: number;
  total_amount: number;
  status: "Pending" | "Approved" | "Rejected" | "Completed";
  created_at: string;
}

export function PurchaseOrderList() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: purchaseOrders, loading, error } = useSupabaseData<PurchaseOrder>({ 
    tableName: 'purchase_orders',
    orderBy: { column: 'created_at', ascending: false }
  });

  const filteredOrders = purchaseOrders.filter(order => 
    order.vendor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-500";
      case "Approved": return "bg-green-500";
      case "Rejected": return "bg-red-500";
      case "Completed": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase Orders</CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by vendor or product..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading purchase orders...</p>
        ) : error ? (
          <p className="text-red-500">Error loading purchase orders: {error.message}</p>
        ) : filteredOrders.length === 0 ? (
          <p>No purchase orders found.</p>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{formatDate(order.created_at)}</TableCell>
                    <TableCell>{order.vendor_name}</TableCell>
                    <TableCell>{order.product_name}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{formatCurrency(order.rate)}</TableCell>
                    <TableCell>{formatCurrency(order.total_amount)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
