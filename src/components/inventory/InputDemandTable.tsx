
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function InputDemandTable() {
  // Placeholder component - will be expanded in future iterations
  return (
    <Card>
      <CardHeader>
        <CardTitle>Input Demand Table</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Farmer</TableHead>
              <TableHead>Input Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Ramesh Kumar</TableCell>
              <TableCell>Urea</TableCell>
              <TableCell>50 bags</TableCell>
              <TableCell><Badge>Pending</Badge></TableCell>
            </TableRow>
            {/* Add more rows here */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
