
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface InputDemand {
  id: string;
  farmer_id: string;
  input: string;
  type: string;
  quantity: string;
  request_date: string;
  status: string;
  farmer: {
    name: string;
  };
}

export function InputDemandTable() {
  const [demands, setDemands] = useState<InputDemand[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInputDemands = async () => {
      setLoading(true);
      try {
        // Currently we don't have actual input_demands data with farmer relations,
        // so we'll use mock data for now
        // In a real scenario, you'd fetch from Supabase with a join like this:
        // const { data, error } = await supabase
        //   .from('input_demands')
        //   .select('*, farmer:farmer_id(name)')
        
        // Using mock data until we populate the input_demands table
        const mockData = [
          {
            id: "1",
            farmer_id: "1",
            input: "Urea",
            type: "Fertilizer",
            quantity: "10 bags",
            request_date: "2025-04-01",
            status: "Pending",
            farmer: { name: "Ramesh Yadav" }
          },
          {
            id: "2",
            farmer_id: "2",
            input: "Seeds",
            type: "Wheat",
            quantity: "5 kg",
            request_date: "2025-04-03",
            status: "Approved",
            farmer: { name: "Anita Devi" }
          },
          {
            id: "3",
            farmer_id: "3",
            input: "DAP",
            type: "Fertilizer",
            quantity: "12 bags",
            request_date: "2025-04-02",
            status: "Pending",
            farmer: { name: "Mohan Singh" }
          },
          {
            id: "4",
            farmer_id: "4",
            input: "Tractor Hire",
            type: "Service",
            quantity: "2 hrs",
            request_date: "2025-04-04",
            status: "Rejected",
            farmer: { name: "Sita Kumari" }
          },
          {
            id: "5",
            farmer_id: "5",
            input: "Pesticide A",
            type: "Chemical",
            quantity: "1 liter",
            request_date: "2025-04-01",
            status: "Approved",
            farmer: { name: "Raju Kumar" }
          },
          {
            id: "6",
            farmer_id: "6",
            input: "Seeds",
            type: "Rice",
            quantity: "3 kg",
            request_date: "2025-04-03",
            status: "Pending",
            farmer: { name: "Geeta Devi" }
          }
        ];
        
        setDemands(mockData);
      } catch (error) {
        console.error('Error fetching input demands:', error);
        toast({
          title: "Error fetching data",
          description: "Could not load input demand data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInputDemands();
  }, [toast]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Input Demand Requests</CardTitle>
        <Button>Create New Request</Button>
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Loading input demands...
                  </div>
                </TableCell>
              </TableRow>
            ) : demands.length > 0 ? (
              demands.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.farmer.name}</TableCell>
                  <TableCell>{item.input} ({item.type})</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{new Date(item.request_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Approved" ? "default" :
                        item.status === "Fulfilled" ? "success" :
                        item.status === "Rejected" ? "destructive" : "secondary"
                      }
                      className={item.status === "Fulfilled" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                    {item.status === "Pending" && (
                      <Button variant="ghost" size="sm">Process</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No input demands found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
