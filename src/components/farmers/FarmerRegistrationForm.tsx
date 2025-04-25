
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, User, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function FarmerRegistrationForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Farmer registered successfully",
        description: "The farmer has been added to the system."
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Farmer Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="name">Full Name*</Label>
                <Input id="name" placeholder="Farmer's full name" required />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="phone">Phone Number*</Label>
                <Input id="phone" placeholder="10-digit mobile number" required />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="village">Village*</Label>
                <Input id="village" placeholder="Village name" required />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="district">District*</Label>
                <Input id="district" placeholder="District" required />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="photo">Farmer's Photo</Label>
              <div className="flex items-center gap-4">
                <div className="h-24 w-24 rounded-md bg-gray-100 flex items-center justify-center border">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
                <Button type="button" variant="outline" className="flex gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <Label htmlFor="id-doc">ID Document</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aadhar">Aadhar Card</SelectItem>
                  <SelectItem value="voter">Voter ID</SelectItem>
                  <SelectItem value="pan">PAN Card</SelectItem>
                  <SelectItem value="dl">Driving License</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-2">
                <Button type="button" variant="outline" className="flex gap-2">
                  <Upload className="h-4 w-4" />
                  Upload ID Document
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="land-size">Land Size (Acres)*</Label>
                <Input id="land-size" type="number" step="0.01" placeholder="Total land in acres" required />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="gps">GPS Coordinates</Label>
                <div className="flex gap-2">
                  <Input id="gps" placeholder="Lat, Long" />
                  <Button type="button" variant="outline" className="shrink-0">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <Label htmlFor="main-crop">Main Crops</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="maize">Maize</SelectItem>
                  <SelectItem value="pulses">Pulses</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mt-4 space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Any additional information about the farmer" />
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register Farmer"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
