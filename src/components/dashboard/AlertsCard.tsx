
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Info, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "warning" | "info" | "danger";
  title: string;
  description: string;
  time: string;
}

interface AlertsCardProps {
  alerts: Alert[];
}

export function AlertsCard({ alerts }: AlertsCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Alerts & Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50">
              <div className={cn(
                "p-2 rounded-md",
                alert.type === "warning" ? "bg-amber-100 text-amber-600" : 
                alert.type === "danger" ? "bg-red-100 text-red-600" : 
                "bg-blue-100 text-blue-600"
              )}>
                {alert.type === "warning" ? (
                  <AlertTriangle className="h-4 w-4" />
                ) : alert.type === "danger" ? (
                  <AlertTriangle className="h-4 w-4" />
                ) : (
                  <Info className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-medium">{alert.title}</h4>
                  <Badge variant="outline" className={cn(
                    "text-xs",
                    alert.type === "warning" ? "border-amber-200 text-amber-700" : 
                    alert.type === "danger" ? "border-red-200 text-red-700" : 
                    "border-blue-200 text-blue-700"
                  )}>
                    {alert.type === "warning" ? "Warning" : 
                     alert.type === "danger" ? "Urgent" : "Info"}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">{alert.description}</p>
                <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
