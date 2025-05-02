
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, DownloadIcon, Upload, Filter, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Farmer {
  id: string;
  name: string;
  village: string;
  land_size: number;
  main_crop: string;
  status: string;
}

export function FarmerTable() {
  const { toast } = useToast();
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [villageFilter, setVillageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [cropFilter, setCropFilter] = useState("");

  // Fetch farmers data from Supabase
  useEffect(() => {
    const fetchFarmers = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('farmers')
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          setFarmers(data as Farmer[]);
        }
      } catch (error) {
        console.error('Error fetching farmers:', error);
        toast({
          title: "Error fetching data",
          description: "Could not load farmers data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, [toast]);

  // Get unique villages for filter dropdown
  const villages = Array.from(new Set(farmers.map(farmer => farmer.village)));
  const crops = Array.from(new Set(farmers.map(farmer => farmer.main_crop)));
  
  // Filter farmers based on search and filters
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVillage = villageFilter === "" || farmer.village === villageFilter;
    const matchesStatus = statusFilter === "" || farmer.status === statusFilter;
    const matchesCrop = cropFilter === "" || farmer.main_crop === cropFilter;
    
    return matchesSearch && matchesVillage && matchesStatus && matchesCrop;
  });

  // Handle CSV export
  const exportToCSV = () => {
    const headers = ['Name', 'Village', 'Land Size (acres)', 'Main Crop', 'Status'];
    const csvData = filteredFarmers.map(farmer => 
      [farmer.name, farmer.village, farmer.land_size, farmer.main_crop, farmer.status]
    );
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'farmers_data.csv');
    link.click();
  };

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <CardTitle>Farmers Directory</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex gap-2">
            <Upload className="h-4 w-4" />
            Import CSV
          </Button>
          <Button variant="outline" className="flex gap-2" onClick={exportToCSV}>
            <DownloadIcon className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search farmers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={villageFilter} onValueChange={setVillageFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Village" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Villages</SelectItem>
                {villages.map(village => (
                  <SelectItem key={village} value={village}>{village}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={cropFilter} onValueChange={setCropFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Crop Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Crops</SelectItem>
                {crops.map(crop => (
                  <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Village</TableHead>
                <TableHead>Land Size (acres)</TableHead>
                <TableHead>Main Crop</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    <div className="flex justify-center items-center">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      Loading farmers data...
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredFarmers.length > 0 ? (
                filteredFarmers.map((farmer) => (
                  <TableRow key={farmer.id}>
                    <TableCell className="font-medium">{farmer.name}</TableCell>
                    <TableCell>{farmer.village}</TableCell>
                    <TableCell>{farmer.land_size}</TableCell>
                    <TableCell>{farmer.main_crop}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          farmer.status === "Active"
                            ? "default"
                            : farmer.status === "Inactive"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {farmer.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No farmers found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
