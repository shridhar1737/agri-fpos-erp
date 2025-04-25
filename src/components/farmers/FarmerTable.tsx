
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, DownloadIcon, Upload, Filter } from "lucide-react";

// Mock data
const farmers = [
  { id: 1, name: "Ramesh Kumar", village: "Ganeshpura", landSize: 3.5, mainCrop: "Wheat", status: "active" },
  { id: 2, name: "Sunil Patel", village: "Madhopura", landSize: 2.2, mainCrop: "Rice", status: "active" },
  { id: 3, name: "Harish Singh", village: "Ganeshpura", landSize: 5.0, mainCrop: "Maize", status: "inactive" },
  { id: 4, name: "Vijay Sharma", village: "Jaitpura", landSize: 4.1, mainCrop: "Pulses", status: "active" },
  { id: 5, name: "Prakash Meena", village: "Sherpura", landSize: 1.8, mainCrop: "Vegetables", status: "pending" },
  { id: 6, name: "Lokesh Gupta", village: "Madhopura", landSize: 3.2, mainCrop: "Wheat", status: "active" },
  { id: 7, name: "Mahendra Jat", village: "Jaitpura", landSize: 6.5, mainCrop: "Rice", status: "active" },
  { id: 8, name: "Dinesh Kumawat", village: "Ganeshpura", landSize: 2.8, mainCrop: "Pulses", status: "inactive" },
  { id: 9, name: "Bhavesh Sharma", village: "Sherpura", landSize: 4.3, mainCrop: "Wheat", status: "active" },
  { id: 10, name: "Rajesh Meena", village: "Ganeshpura", landSize: 3.7, mainCrop: "Vegetables", status: "pending" },
];

export function FarmerTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [villageFilter, setVillageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [cropFilter, setCropFilter] = useState("");

  // Get unique villages for filter dropdown
  const villages = Array.from(new Set(farmers.map(farmer => farmer.village)));
  const crops = Array.from(new Set(farmers.map(farmer => farmer.mainCrop)));
  
  // Filter farmers based on search and filters
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVillage = villageFilter === "" || farmer.village === villageFilter;
    const matchesStatus = statusFilter === "" || farmer.status === statusFilter;
    const matchesCrop = cropFilter === "" || farmer.mainCrop === cropFilter;
    
    return matchesSearch && matchesVillage && matchesStatus && matchesCrop;
  });

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <CardTitle>Farmers Directory</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex gap-2">
            <Upload className="h-4 w-4" />
            Import CSV
          </Button>
          <Button variant="outline" className="flex gap-2">
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
                <SelectItem value="all-villages">All Villages</SelectItem>
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
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={cropFilter} onValueChange={setCropFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Crop Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-crops">All Crops</SelectItem>
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
              {filteredFarmers.length > 0 ? (
                filteredFarmers.map((farmer) => (
                  <TableRow key={farmer.id}>
                    <TableCell className="font-medium">{farmer.name}</TableCell>
                    <TableCell>{farmer.village}</TableCell>
                    <TableCell>{farmer.landSize}</TableCell>
                    <TableCell>{farmer.mainCrop}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          farmer.status === "active"
                            ? "default"
                            : farmer.status === "inactive"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {farmer.status.charAt(0).toUpperCase() + farmer.status.slice(1)}
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
