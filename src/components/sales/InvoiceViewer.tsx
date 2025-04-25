
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const invoices = [
  {
    id: "INV-2024-001",
    date: "2024-04-20",
    customer: "Metro Mart",
    amount: 45000,
    dueDate: "2024-05-20",
    status: "unpaid"
  },
  {
    id: "INV-2024-002",
    date: "2024-04-18",
    customer: "Fresh Foods Ltd",
    amount: 32000,
    dueDate: "2024-05-18",
    status: "paid"
  },
  {
    id: "INV-2024-003",
    date: "2024-04-15",
    customer: "Hotel Grand",
    amount: 85000,
    dueDate: "2024-05-15",
    status: "partial"
  }
];

export function InvoiceViewer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount (₹)</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.amount.toLocaleString()}</TableCell>
                <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={
                    invoice.status === "paid" ? "success" :
                    invoice.status === "partial" ? "warning" : "destructive"
                  }>
                    {invoice.status}
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
