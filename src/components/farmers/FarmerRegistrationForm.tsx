
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, User, MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function FarmerRegistrationForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    village: "",
    district: "",
    landSize: "",
    mainCrop: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('farmers')
        .insert([{ 
          name: formData.name,
          village: formData.village,
          land_size: parseFloat(formData.landSize),
          main_crop: formData.mainCrop || "Not specified",
          status: "Active"
        }])
        .select();

      if (error) throw error;
      
      toast({
        title: "Farmer registered successfully",
        description: "The farmer has been added to the system."
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        village: "",
        district: "",
        landSize: "",
        mainCrop: "",
        notes: ""
      });
      
    } catch (error: any) {
      console.error("Error registering farmer:", error);
      toast({
        title: "Registration failed",
        description: error.message || "Could not register farmer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
                <Input 
                  id="name" 
                  placeholder="Farmer's full name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="phone">Phone Number*</Label>
                <Input 
                  id="phone" 
                  placeholder="10-digit mobile number" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="village">Village*</Label>
                <Input 
                  id="village" 
                  placeholder="Village name" 
                  required 
                  value={formData.village}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="district">District*</Label>
                <Input 
                  id="district" 
                  placeholder="District" 
                  required 
                  value={formData.district}
                  onChange={handleChange}
                />
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
                <Label htmlFor="landSize">Land Size (Acres)*</Label>
                <Input 
                  id="landSize" 
                  type="number" 
                  step="0.01" 
                  placeholder="Total land in acres" 
                  required
                  value={formData.landSize}
                  onChange={handleChange}
                />
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
              <Label htmlFor="mainCrop">Main Crop</Label>
              <Select onValueChange={(value) => handleSelectChange("mainCrop", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wheat">Wheat</SelectItem>
                  <SelectItem value="Rice">Rice</SelectItem>
                  <SelectItem value="Maize">Maize</SelectItem>
                  <SelectItem value="Pulses">Pulses</SelectItem>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Sugarcane">Sugarcane</SelectItem>
                  <SelectItem value="Mustard">Mustard</SelectItem>
                  <SelectItem value="Barley">Barley</SelectItem>
                  <SelectItem value="Paddy">Paddy</SelectItem>
                  <SelectItem value="Tomato">Tomato</SelectItem>
                  <SelectItem value="Onion">Onion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mt-4 space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Any additional information about the farmer"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                setFormData({
                  name: "",
                  phone: "",
                  village: "",
                  district: "",
                  landSize: "",
                  mainCrop: "",
                  notes: ""
                });
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : "Register Farmer"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
