
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileTextIcon } from "lucide-react";

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
  },
  {
    id: "TRIP-004",
    date: "2024-04-23",
    driver: "Ajay Chauhan",
    vehicle: "MH-01-GH-3456",
    route: "Distribution Center to Retail Outlet",
    startTime: "06:30 AM",
    endTime: "10:15 AM",
    status: "completed"
  },
  {
    id: "TRIP-005",
    date: "2024-04-23",
    driver: "Vijay Sharma",
    vehicle: "MH-01-IJ-7890",
    route: "Processing Unit to Warehouse",
    startTime: "08:00 AM",
    endTime: "11:30 AM",
    status: "completed"
  },
  {
    id: "TRIP-006",
    date: "2024-04-23",
    driver: "Kiran Patel",
    vehicle: "MH-01-KL-1234",
    route: "Farm to Cold Storage",
    startTime: "09:15 AM",
    endTime: "--",
    status: "in-progress"
  },
  {
    id: "TRIP-007",
    date: "2024-04-24",
    driver: "Raj Malhotra",
    vehicle: "MH-01-MN-5678",
    route: "Warehouse to Export Facility",
    startTime: "05:30 AM",
    endTime: "10:45 AM",
    status: "completed"
  },
  {
    id: "TRIP-008",
    date: "2024-04-24",
    driver: "Sanjay Gupta",
    vehicle: "MH-01-OP-9012",
    route: "Farm to Local Market",
    startTime: "06:45 AM",
    endTime: "--",
    status: "planned"
  }
];

export function TripLogs() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <FileTextIcon size={20} />
          Delivery Trip Logs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
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
        </div>
      </CardContent>
    </Card>
  );
}
