
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ProduceEntryForm() {
  const [formData, setFormData] = useState({
    cropName: "",
    variety: "",
    quantity: "",
    quality: "",
    farmerId: "",
    harvestDate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Produce entry submitted successfully");
    setFormData({
      cropName: "",
      variety: "",
      quantity: "",
      quality: "",
      farmerId: "",
      harvestDate: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produce Entry Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cropName">Crop Name</Label>
              <Input 
                id="cropName" 
                placeholder="Enter crop name"
                value={formData.cropName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="variety">Variety</Label>
              <Input 
                id="variety" 
                placeholder="Enter variety"
                value={formData.variety}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (kg)</Label>
              <Input 
                id="quantity" 
                type="number" 
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quality">Quality Grade</Label>
              <Input 
                id="quality" 
                placeholder="Enter quality grade"
                value={formData.quality}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farmerId">Farmer ID</Label>
              <Input 
                id="farmerId" 
                placeholder="Enter farmer ID"
                value={formData.farmerId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="harvestDate">Harvest Date</Label>
              <Input 
                id="harvestDate" 
                type="date" 
                value={formData.harvestDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">Submit Entry</Button>
        </form>
      </CardContent>
    </Card>
  );
}
