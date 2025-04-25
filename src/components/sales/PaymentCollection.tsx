
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const payments = [
  {
    id: "PAY-001",
    date: "2024-04-22",
    customer: "Metro Mart",
    amount: 25000,
    method: "Bank Transfer",
    status: "completed"
  },
  {
    id: "PAY-002",
    date: "2024-04-21",
    customer: "Fresh Foods Ltd",
    amount: 32000,
    method: "UPI",
    status: "pending"
  },
  {
    id: "PAY-003",
    date: "2024-04-20",
    customer: "Hotel Grand",
    amount: 45000,
    method: "Cheque",
    status: "processing"
  }
];

export function PaymentCollection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount (₹)</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                <TableCell>{payment.customer}</TableCell>
                <TableCell>{payment.amount.toLocaleString()}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>
                  <Badge variant={
                    payment.status === "completed" ? "success" :
                    payment.status === "processing" ? "warning" : "secondary"
                  }>
                    {payment.status}
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
