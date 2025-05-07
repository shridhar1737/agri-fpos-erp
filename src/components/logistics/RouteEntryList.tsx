
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TruckIcon, PackageIcon } from "lucide-react";

interface RouteEntry {
  id: string;
  consignmentId: string;
  shipDate: Date;
  customerName: string;
  distance: string;
  commodity: string;
  route: string;
  quantity: string;
  carrierName: string;
  status: "Pending" | "In Transit" | "Delivered" | "Cancelled";
  deliveryDate?: Date;
}

interface RouteEntryListProps {
  routes: RouteEntry[];
}

export function RouteEntryList({ routes }: RouteEntryListProps) {
  if (routes.length === 0) {
    return null;
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-500";
      case "In Transit": return "bg-blue-500";
      case "Delivered": return "bg-green-500";
      case "Cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <TruckIcon size={20} />
          Route Plans
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Consignment ID</TableHead>
              <TableHead>Ship Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Commodity</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Carrier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Delivery Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.id}>
                <TableCell className="font-medium">{route.consignmentId}</TableCell>
                <TableCell>{format(route.shipDate, "dd MMM yyyy")}</TableCell>
                <TableCell>{route.customerName}</TableCell>
                <TableCell>{route.commodity}</TableCell>
                <TableCell>{route.quantity} kg</TableCell>
                <TableCell>{route.distance} km</TableCell>
                <TableCell>{route.carrierName}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(route.status)}>
                    {route.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {route.deliveryDate 
                    ? format(route.deliveryDate, "dd MMM yyyy")
                    : "Not scheduled"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
