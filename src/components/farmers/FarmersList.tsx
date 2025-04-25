
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Download, Upload, Filter } from "lucide-react";
import { useState } from "react";

interface Farmer {
  id: string;
  name: string;
  village: string;
  landSize: string;
  crops: string[];
  dues: number;
  status: "active" | "inactive" | "pending";
}

const mockFarmers: Farmer[] = [
  {
    id: "F001",
    name: "Rajesh Kumar",
    village: "Nandpur",
    landSize: "5.2 acres",
    crops: ["Wheat", "Rice"],
    dues: 2500,
    status: "active",
  },
  {
    id: "F002",
    name: "Sunita Devi",
    village: "Pratapgarh",
    landSize: "3.5 acres",
    crops: ["Rice", "Vegetables"],
    dues: 0,
    status: "active",
  },
  {
    id: "F003",
    name: "Mahesh Singh",
    village: "Nandpur",
    landSize: "8.0 acres",
    crops: ["Wheat", "Sugarcane"],
    dues: 5000,
    status: "active",
  },
  {
    id: "F004",
    name: "Anita Sharma",
    village: "Ganeshpur",
    landSize: "2.5 acres",
    crops: ["Vegetables"],
    dues: 1200,
    status: "inactive",
  },
  {
    id: "F005",
    name: "Vikas Patel",
    village: "Ganeshpur",
    landSize: "4.0 acres",
    crops: ["Rice", "Pulses"],
    dues: 3500,
    status: "pending",
  },
];

export function FarmersList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ village: "", status: "" });
  
  const filteredFarmers = mockFarmers.filter((farmer) => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          farmer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVillage = filters.village === "" || farmer.village === filters.village;
    const matchesStatus = filters.status === "" || farmer.status === filters.status;
    
    return matchesSearch && matchesVillage && matchesStatus;
  });
  
  const villages = Array.from(new Set(mockFarmers.map(farmer => farmer.village)));
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input 
              placeholder="Search farmers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full sm:w-[250px]"
            />
            {searchTerm && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6" 
                onClick={() => setSearchTerm("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              value={filters.village}
              onChange={(e) => setFilters({...filters, village: e.target.value})}
              className="border border-gray-200 rounded-md text-sm py-2 px-3"
            >
              <option value="">All Villages</option>
              {villages.map((village) => (
                <option key={village} value={village}>{village}</option>
              ))}
            </select>
            
            <select 
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="border border-gray-200 rounded-md text-sm py-2 px-3"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" /> Import
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="gap-2">
            <Filter className="h-4 w-4" /> Add Farmer
          </Button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Farmer ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Village</TableHead>
              <TableHead>Land Size</TableHead>
              <TableHead>Crops</TableHead>
              <TableHead>Dues</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFarmers.length > 0 ? (
              filteredFarmers.map((farmer) => (
                <TableRow key={farmer.id}>
                  <TableCell className="font-medium">{farmer.id}</TableCell>
                  <TableCell>{farmer.name}</TableCell>
                  <TableCell>{farmer.village}</TableCell>
                  <TableCell>{farmer.landSize}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {farmer.crops.map((crop) => (
                        <Badge key={crop} variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {farmer.dues > 0 ? (
                      <span className="text-red-500">₹{farmer.dues}</span>
                    ) : (
                      <span className="text-green-500">₹0</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        farmer.status === "active" ? "bg-green-100 text-green-700 hover:bg-green-100" : 
                        farmer.status === "inactive" ? "bg-gray-100 text-gray-700 hover:bg-gray-100" : 
                        "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      }
                    >
                      {farmer.status === "active" ? "Active" : 
                       farmer.status === "inactive" ? "Inactive" : 
                       "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No farmers found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
