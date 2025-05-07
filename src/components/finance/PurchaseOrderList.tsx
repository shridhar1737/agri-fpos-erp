
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, FileText, Loader2, ExternalLink, RefreshCcw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface PurchaseOrder {
  id: string;
  vendor_name: string;
  product_name: string;
  quantity: number;
  rate: number;
  total_amount: number;
  status: "Pending" | "Approved" | "Rejected" | "Completed";
  created_at: string;
  document_url?: string;
}

export function PurchaseOrderList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { toast } = useToast();
  
  const { data: purchaseOrders, loading, error, refetch } = useSupabaseData<PurchaseOrder>({ 
    tableName: 'purchase_orders',
    orderBy: { column: 'created_at', ascending: false }
  });

  // Force refetch on component load and when refreshTrigger changes
  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        await refetch();
      } catch (err) {
        console.error("Error fetching purchase orders:", err);
      }
    };
    
    fetchPurchaseOrders();
  }, [refetch, refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const filteredOrders = purchaseOrders?.filter(order => 
    order.vendor_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

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
                    <TableCell>
                      {order.document_url ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4 mr-1" /> View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Purchase Order Document</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col items-center justify-center p-4">
                              {order.document_url.toLowerCase().endsWith('.pdf') ? (
                                <div className="w-full h-[70vh]">
                                  <iframe 
                                    src={order.document_url} 
                                    className="w-full h-full border rounded"
                                    title="PDF Document"
                                  />
                                </div>
                              ) : order.document_url.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                                <img 
                                  src={order.document_url} 
                                  alt="Purchase Order Document" 
                                  className="max-h-[70vh] object-contain"
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center gap-4 p-8">
                                  <FileText className="h-16 w-16 text-gray-400" />
                                  <p>This document cannot be previewed</p>
                                  <a 
                                    href={order.document_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                  >
                                    <Button>
                                      Open Document <ExternalLink className="ml-2 h-4 w-4" />
                                    </Button>
                                  </a>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <span className="text-gray-400 text-sm">None</span>
                      )}
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
