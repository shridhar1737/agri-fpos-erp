
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const deliveryRoutes = [
  {
    id: "RT001",
    route: "Warehouse to City Market",
    distance: 45,
    fuelCost: 1350,
    laborCost: 800,
    totalCost: 2150,
    costPerKm: 47.78
  },
  {
    id: "RT002",
    route: "Farm to Processing Unit",
    distance: 25,
    fuelCost: 750,
    laborCost: 500,
    totalCost: 1250,
    costPerKm: 50.00
  },
  {
    id: "RT003",
    route: "Processing Unit to Distribution Center",
    distance: 60,
    fuelCost: 1800,
    laborCost: 1000,
    totalCost: 2800,
    costPerKm: 46.67
  }
];

export function CostCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Logistics Cost Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route</TableHead>
              <TableHead>Distance (km)</TableHead>
              <TableHead>Fuel Cost (₹)</TableHead>
              <TableHead>Labor Cost (₹)</TableHead>
              <TableHead>Total Cost (₹)</TableHead>
              <TableHead>Cost/km (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveryRoutes.map((route) => (
              <TableRow key={route.id}>
                <TableCell className="font-medium">{route.route}</TableCell>
                <TableCell>{route.distance}</TableCell>
                <TableCell>{route.fuelCost}</TableCell>
                <TableCell>{route.laborCost}</TableCell>
                <TableCell>{route.totalCost}</TableCell>
                <TableCell>{route.costPerKm.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
