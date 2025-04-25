
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const transactions = [
  {
    id: "TRX-001",
    date: "2024-04-22",
    farmerId: "F101",
    farmerName: "Rajesh Kumar",
    description: "Organic Tomatoes Sale",
    credit: 45000,
    debit: 0,
    balance: 45000,
    type: "credit"
  },
  {
    id: "TRX-002",
    date: "2024-04-21",
    farmerId: "F102",
    farmerName: "Amit Singh",
    description: "Input Purchase - Seeds",
    credit: 0,
    debit: 15000,
    balance: 30000,
    type: "debit"
  },
  {
    id: "TRX-003",
    date: "2024-04-20",
    farmerId: "F103",
    farmerName: "Priya Patel",
    description: "Green Chili Sale",
    credit: 25000,
    debit: 0,
    balance: 55000,
    type: "credit"
  }
];

export function FarmerLedger() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Farmer Transaction Ledger</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Farmer</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Credit (₹)</TableHead>
              <TableHead>Debit (₹)</TableHead>
              <TableHead>Balance (₹)</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.farmerName}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.credit.toLocaleString()}</TableCell>
                <TableCell>{transaction.debit.toLocaleString()}</TableCell>
                <TableCell>{transaction.balance.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={transaction.type === "credit" ? "success" : "destructive"}>
                    {transaction.type}
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
