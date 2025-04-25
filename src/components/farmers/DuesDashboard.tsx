
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function DuesDashboard() {
  // Mock data for dues
  const dues = [
    { id: 1, name: "Ramesh Kumar", village: "Ganeshpura", amount: 12500, daysOverdue: 15, type: "Input Credit" },
    { id: 2, name: "Sunil Patel", village: "Madhopura", amount: 8700, daysOverdue: 5, type: "Input Credit" },
    { id: 3, name: "Harish Singh", village: "Ganeshpura", amount: 25000, daysOverdue: 30, type: "Advance Payment" },
    { id: 4, name: "Vijay Sharma", village: "Jaitpura", amount: 15000, daysOverdue: 10, type: "Input Credit" },
    { id: 5, name: "Prakash Meena", village: "Sherpura", amount: 7500, daysOverdue: 2, type: "Membership Fee" },
  ];

  const totalDues = dues.reduce((sum, due) => sum + due.amount, 0);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{totalDues.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">From {dues.length} farmers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overdue &gt; 30 days</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              ₹{dues.filter(d => d.daysOverdue > 30).reduce((sum, due) => sum + due.amount, 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {dues.filter(d => d.daysOverdue > 30).length} critical accounts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Due This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">
              ₹{dues.filter(d => d.daysOverdue <= 7).reduce((sum, due) => sum + due.amount, 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {dues.filter(d => d.daysOverdue <= 7).length} upcoming dues
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Farmer Dues Ledger</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farmer Name</TableHead>
                <TableHead>Village</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount (₹)</TableHead>
                <TableHead className="text-right">Days Overdue</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dues.map(due => (
                <TableRow key={due.id}>
                  <TableCell className="font-medium">{due.name}</TableCell>
                  <TableCell>{due.village}</TableCell>
                  <TableCell>{due.type}</TableCell>
                  <TableCell className="text-right">₹{due.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{due.daysOverdue}</TableCell>
                  <TableCell>
                    <Badge variant={due.daysOverdue > 30 ? "destructive" : due.daysOverdue > 7 ? "warning" : "default"}>
                      {due.daysOverdue > 30 ? "Critical" : due.daysOverdue > 7 ? "Overdue" : "Upcoming"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
