
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const salesOrders = [
  {
    id: "SO-001",
    date: "2024-04-20",
    customer: "Metro Mart",
    product: "Organic Tomatoes",
    quantity: 500,
    unit: "kg",
    value: 45000,
    status: "pending"
  },
  {
    id: "SO-002",
    date: "2024-04-19",
    customer: "Fresh Foods Ltd",
    product: "Green Chilies",
    quantity: 200,
    unit: "kg",
    value: 16000,
    status: "delivered"
  },
  {
    id: "SO-003",
    date: "2024-04-18",
    customer: "Hotel Grand",
    product: "Premium Rice",
    quantity: 1000,
    unit: "kg",
    value: 85000,
    status: "processing"
  }
];

export function SaleOrderDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sale Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Value (₹)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity} {order.unit}</TableCell>
                <TableCell>{order.value.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={
                    order.status === "delivered" ? "success" :
                    order.status === "processing" ? "warning" : "secondary"
                  }>
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
