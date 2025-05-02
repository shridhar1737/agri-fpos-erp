
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
import { MediaUploader } from "@/components/projects/MediaUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FarmerRegistrationForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [idDocumentUrl, setIdDocumentUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    village: "",
    district: "",
    landSize: "",
    mainCrop: "",
    notes: "",
    idDocumentType: ""
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
          phone: formData.phone, // Added to save phone number
          village: formData.village,
          district: formData.district, // Added to save district
          land_size: parseFloat(formData.landSize),
          main_crop: formData.mainCrop || "Not specified",
          status: "Active",
          notes: formData.notes, // Added to save notes
          photo_url: photoUrl, // Added to save photo URL
          id_document_type: formData.idDocumentType, // Added to save ID document type
          id_document_url: idDocumentUrl // Added to save ID document URL
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
        notes: "",
        idDocumentType: ""
      });
      setPhotoUrl(null);
      setIdDocumentUrl(null);
      setActiveTab("basic");
      
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

  const handlePhotoUpload = (url: string) => {
    setPhotoUrl(url);
    toast({
      title: "Photo uploaded",
      description: "The farmer's photo has been uploaded successfully."
    });
  };

  const handleIdDocumentUpload = (url: string) => {
    setIdDocumentUrl(url);
    toast({
      title: "ID Document uploaded",
      description: "The ID document has been uploaded successfully."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Farmer Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="documents">Documents & Photos</TabsTrigger>
            <TabsTrigger value="farm">Farm Details</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <TabsContent value="basic">
              <div className="space-y-4">
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
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Any additional information about the farmer"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="flex justify-end gap-4 pt-4">
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab("documents")} 
                    variant="outline"
                  >
                    Next: Documents & Photos
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Farmer's Photo</Label>
                  {photoUrl ? (
                    <div className="flex items-center gap-4">
                      <div className="h-24 w-24 rounded-md overflow-hidden border">
                        <img 
                          src={photoUrl} 
                          alt="Farmer" 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setPhotoUrl(null)}
                      >
                        Remove Photo
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <MediaUploader 
                        onUploadComplete={handlePhotoUpload}
                        accept="image/*"
                        maxSizeMB={2}
                        bucketName="farmers"
                        folderPath="photos"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idDocumentType">ID Document Type</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("idDocumentType", value)}
                    value={formData.idDocumentType}
                  >
                    <SelectTrigger id="idDocumentType">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhar">Aadhar Card</SelectItem>
                      <SelectItem value="voter">Voter ID</SelectItem>
                      <SelectItem value="pan">PAN Card</SelectItem>
                      <SelectItem value="dl">Driving License</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {idDocumentUrl ? (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="p-2 bg-green-50 rounded text-green-700 text-sm flex-1">
                        Document uploaded successfully
                      </div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIdDocumentUrl(null)}
                      >
                        Replace
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-2 bg-gray-50 p-4 rounded-md">
                      <MediaUploader 
                        onUploadComplete={handleIdDocumentUpload}
                        accept="image/*,application/pdf"
                        maxSizeMB={5}
                        bucketName="farmers"
                        folderPath="documents"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-between gap-4 pt-4">
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab("basic")} 
                    variant="outline"
                  >
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab("farm")}
                  >
                    Next: Farm Details
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="farm">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
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

                <div className="flex justify-between gap-4 pt-4">
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab("documents")} 
                    variant="outline"
                  >
                    Back
                  </Button>
                  <div className="flex gap-2">
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
                          notes: "",
                          idDocumentType: ""
                        });
                        setPhotoUrl(null);
                        setIdDocumentUrl(null);
                        setActiveTab("basic");
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
                </div>
              </div>
            </TabsContent>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
