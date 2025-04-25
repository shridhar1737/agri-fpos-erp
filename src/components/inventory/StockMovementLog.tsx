
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const stockMovements = [
  {
    id: 1,
    date: "2024-04-20",
    product: "NPK Fertilizer",
    batch: "B2024041",
    type: "inward",
    quantity: 100,
    location: "Main Warehouse",
    expiry: "2025-04-20"
  },
  {
    id: 2,
    date: "2024-04-21",
    product: "Pesticide Spray",
    batch: "B2024042",
    type: "outward",
    quantity: 25,
    location: "Distribution Center",
    expiry: "2025-06-15"
  },
  {
    id: 3,
    date: "2024-04-21",
    product: "Wheat Seeds",
    batch: "B2024043",
    type: "inward",
    quantity: 500,
    location: "Cold Storage",
    expiry: "2024-12-31"
  }
];

export function StockMovementLog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Movement Log</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Expiry</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockMovements.map((movement) => (
              <TableRow key={movement.id}>
                <TableCell>{new Date(movement.date).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">{movement.product}</TableCell>
                <TableCell>{movement.batch}</TableCell>
                <TableCell>
                  <Badge variant={movement.type === "inward" ? "default" : "secondary"}>
                    {movement.type}
                  </Badge>
                </TableCell>
                <TableCell>{movement.quantity}</TableCell>
                <TableCell>{movement.location}</TableCell>
                <TableCell>{new Date(movement.expiry).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
