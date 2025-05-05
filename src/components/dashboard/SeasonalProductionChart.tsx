
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Sprout } from "lucide-react";

const seasonalData = [
  { month: "Jan", kharif: 0, rabi: 2500, zaid: 800 },
  { month: "Feb", kharif: 0, rabi: 3200, zaid: 1100 },
  { month: "Mar", kharif: 0, rabi: 2800, zaid: 1500 },
  { month: "Apr", kharif: 0, rabi: 1500, zaid: 2200 },
  { month: "May", kharif: 0, rabi: 800, zaid: 2600 },
  { month: "Jun", kharif: 1200, rabi: 400, zaid: 1800 },
  { month: "Jul", kharif: 2800, rabi: 0, zaid: 1100 },
  { month: "Aug", kharif: 3500, rabi: 0, zaid: 800 },
  { month: "Sep", kharif: 4200, rabi: 0, zaid: 600 },
  { month: "Oct", kharif: 3800, rabi: 0, zaid: 400 },
  { month: "Nov", kharif: 2200, rabi: 800, zaid: 0 },
  { month: "Dec", kharif: 1000, rabi: 1600, zaid: 0 }
];

// Define chart config for legends
const config = {
  kharif: {
    label: "Kharif Season",
    theme: {
      light: "#16a34a",
      dark: "#22c55e"
    }
  },
  rabi: {
    label: "Rabi Season",
    theme: {
      light: "#2563eb",
      dark: "#3b82f6"
    }
  },
  zaid: {
    label: "Zaid Season",
    theme: {
      light: "#ea580c",
      dark: "#f97316"
    }
  }
};

export function SeasonalProductionChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sprout className="h-5 w-5 text-primary-600" />
          <CardTitle>Seasonal Production Trends</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line">
          <div className="flex justify-between mb-4">
            <TabsList>
              <TabsTrigger value="line">Line Chart</TabsTrigger>
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="line" className="h-[300px]">
            <ChartContainer config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={seasonalData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Production (Quintals)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value) => [`${value} quintals`, ``]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="kharif" 
                    stroke="#16a34a" 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rabi" 
                    stroke="#2563eb" 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="zaid" 
                    stroke="#ea580c" 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          
          <TabsContent value="bar" className="h-[300px]">
            <ChartContainer config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seasonalData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Production (Quintals)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value) => [`${value} quintals`, ``]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="kharif" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="rabi" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="zaid" fill="#ea580c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
