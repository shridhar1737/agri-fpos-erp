
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, User, ShoppingCart, FileText, Package } from "lucide-react";

export function QuickActionsCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button className="justify-start h-auto py-4 bg-primary-50 hover:bg-primary-100 text-primary-700 hover:text-primary-800">
            <User className="h-4 w-4 mr-2" />
            <div className="text-left">
              <div className="font-medium">Add Farmer</div>
              <div className="text-xs mt-0.5 text-primary-600">Register a new farmer</div>
            </div>
          </Button>
          
          <Button className="justify-start h-auto py-4 bg-primary-50 hover:bg-primary-100 text-primary-700 hover:text-primary-800">
            <ShoppingCart className="h-4 w-4 mr-2" />
            <div className="text-left">
              <div className="font-medium">Create Sale</div>
              <div className="text-xs mt-0.5 text-primary-600">Start a new sales order</div>
            </div>
          </Button>
          
          <Button className="justify-start h-auto py-4 bg-primary-50 hover:bg-primary-100 text-primary-700 hover:text-primary-800">
            <FileText className="h-4 w-4 mr-2" />
            <div className="text-left">
              <div className="font-medium">Generate Report</div>
              <div className="text-xs mt-0.5 text-primary-600">Create custom reports</div>
            </div>
          </Button>
          
          <Button className="justify-start h-auto py-4 bg-primary-50 hover:bg-primary-100 text-primary-700 hover:text-primary-800">
            <Package className="h-4 w-4 mr-2" />
            <div className="text-left">
              <div className="font-medium">Add Inventory</div>
              <div className="text-xs mt-0.5 text-primary-600">Record new stock</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
