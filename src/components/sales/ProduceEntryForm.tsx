
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ProduceEntryForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produce Entry Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cropName">Crop Name</Label>
              <Input id="cropName" placeholder="Enter crop name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="variety">Variety</Label>
              <Input id="variety" placeholder="Enter variety" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (kg)</Label>
              <Input id="quantity" type="number" placeholder="Enter quantity" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quality">Quality Grade</Label>
              <Input id="quality" placeholder="Enter quality grade" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farmerId">Farmer ID</Label>
              <Input id="farmerId" placeholder="Enter farmer ID" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Harvest Date</Label>
              <Input id="date" type="date" />
            </div>
          </div>
          <Button className="w-full">Submit Entry</Button>
        </form>
      </CardContent>
    </Card>
  );
}
