
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample data
const demandData = [
  {
    id: 1,
    farmer: "Ramesh Kumar",
    input: "NPK Fertilizer",
    quantity: 50,
    unit: "bags",
    status: "pending",
    requestDate: "2024-04-20"
  },
  {
    id: 2,
    farmer: "Sunil Patel",
    input: "Pesticide Spray",
    quantity: 20,
    unit: "liters",
    status: "approved",
    requestDate: "2024-04-19"
  },
  {
    id: 3,
    farmer: "Harish Singh",
    input: "Seeds - Wheat",
    quantity: 100,
    unit: "kg",
    status: "fulfilled",
    requestDate: "2024-04-18"
  },
  {
    id: 4,
    farmer: "Vijay Sharma",
    input: "Micronutrients",
    quantity: 30,
    unit: "packets",
    status: "pending",
    requestDate: "2024-04-21"
  },
  {
    id: 5,
    farmer: "Anita Desai",
    input: "Organic Compost",
    quantity: 200,
    unit: "kg",
    status: "approved",
    requestDate: "2024-04-17"
  },
  {
    id: 6,
    farmer: "Prakash Joshi",
    input: "Irrigation Pipes",
    quantity: 15,
    unit: "sets",
    status: "fulfilled",
    requestDate: "2024-04-16"
  }
];

export function InputDemandTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Input Demand Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Farmer</TableHead>
              <TableHead>Input Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demandData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.farmer}</TableCell>
                <TableCell>{item.input}</TableCell>
                <TableCell>{item.quantity} {item.unit}</TableCell>
                <TableCell>{new Date(item.requestDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "approved" ? "default" :
                      item.status === "fulfilled" ? "warning" : "secondary"
                    }
                    className={item.status === "fulfilled" ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {item.status}
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
