
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ReportFilters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateRange">Date Range</Label>
            <Input type="date" id="dateRange" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select 
              id="category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              <option value="">All Categories</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <select 
              id="region"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              <option value="">All Regions</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline">Reset</Button>
          <Button>Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
}
