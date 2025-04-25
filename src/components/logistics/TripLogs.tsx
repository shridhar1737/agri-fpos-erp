
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const tripLogs = [
  {
    id: "TRIP-001",
    date: "2024-04-22",
    driver: "Suresh Kumar",
    vehicle: "MH-01-AB-1234",
    route: "Warehouse to City Market",
    startTime: "06:00 AM",
    endTime: "09:30 AM",
    status: "completed"
  },
  {
    id: "TRIP-002",
    date: "2024-04-22",
    driver: "Ramesh Patil",
    vehicle: "MH-01-CD-5678",
    route: "Farm to Processing Unit",
    startTime: "07:30 AM",
    endTime: "10:00 AM",
    status: "in-progress"
  },
  {
    id: "TRIP-003",
    date: "2024-04-22",
    driver: "Prakash Singh",
    vehicle: "MH-01-EF-9012",
    route: "Processing Unit to Distribution Center",
    startTime: "08:45 AM",
    endTime: "--",
    status: "planned"
  }
];

export function TripLogs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Trip Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trip ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tripLogs.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell className="font-medium">{trip.id}</TableCell>
                <TableCell>{new Date(trip.date).toLocaleDateString()}</TableCell>
                <TableCell>{trip.driver}</TableCell>
                <TableCell>{trip.vehicle}</TableCell>
                <TableCell>{trip.route}</TableCell>
                <TableCell>{trip.startTime}</TableCell>
                <TableCell>{trip.endTime}</TableCell>
                <TableCell>
                  <Badge variant={
                    trip.status === "completed" ? "success" :
                    trip.status === "in-progress" ? "warning" : "secondary"
                  }>
                    {trip.status}
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
