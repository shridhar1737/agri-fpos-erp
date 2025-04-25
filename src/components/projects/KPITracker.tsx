
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const kpiData = [
  {
    id: 1,
    metric: "Farmer Training Sessions",
    target: 50,
    achieved: 35,
    unit: "sessions"
  },
  {
    id: 2,
    metric: "Organic Certification",
    target: 100,
    achieved: 68,
    unit: "farmers"
  },
  {
    id: 3,
    metric: "Water Conservation",
    target: 1000000,
    achieved: 750000,
    unit: "liters"
  },
  {
    id: 4,
    metric: "Solar Pump Installation",
    target: 25,
    achieved: 18,
    unit: "pumps"
  }
];

export function KPITracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project KPIs - 2024</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {kpiData.map((kpi) => (
          <div key={kpi.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{kpi.metric}</span>
              <span className="text-sm text-muted-foreground">
                {kpi.achieved} / {kpi.target} {kpi.unit}
              </span>
            </div>
            <Progress 
              value={(kpi.achieved / kpi.target) * 100} 
              className="h-2"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
