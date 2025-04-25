
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "critical",
    title: "Low Stock Alert",
    description: "NPK Fertilizer stock is below minimum threshold (10 bags remaining)",
    date: "2024-04-21"
  },
  {
    id: 2,
    type: "warning",
    title: "Approaching Expiry",
    description: "Batch B2024042 of Pesticide Spray will expire in 30 days",
    date: "2024-04-20"
  },
  {
    id: 3,
    type: "info",
    title: "Stock Update",
    description: "New shipment of Wheat Seeds expected to arrive tomorrow",
    date: "2024-04-19"
  }
];

export function InventoryAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.type === "critical" ? "destructive" : "default"}
            className="border-l-4 border-l-red-500"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="flex items-center gap-2">
              {alert.title}
              <Badge variant={alert.type === "critical" ? "destructive" : "secondary"}>
                {alert.type}
              </Badge>
            </AlertTitle>
            <AlertDescription className="mt-2">
              {alert.description}
              <div className="text-sm text-muted-foreground mt-1">
                Reported on: {new Date(alert.date).toLocaleDateString()}
              </div>
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
}
