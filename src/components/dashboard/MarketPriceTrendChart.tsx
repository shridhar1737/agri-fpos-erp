
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { useState } from "react";

// Market price trends for different crops (simulated data)
const marketTrends = {
  wheat: [
    { month: "Jan", msp: 2015, market: 2150, previous: 2050 },
    { month: "Feb", msp: 2015, market: 2180, previous: 2080 },
    { month: "Mar", msp: 2015, market: 2250, previous: 2120 },
    { month: "Apr", msp: 2015, market: 2280, previous: 2200 },
    { month: "May", msp: 2015, market: 2320, previous: 2250 },
    { month: "Jun", msp: 2015, market: 2350, previous: 2300 },
    { month: "Jul", msp: 2100, market: 2200, previous: 2320 },
    { month: "Aug", msp: 2100, market: 2150, previous: 2300 },
    { month: "Sep", msp: 2100, market: 2180, previous: 2250 },
    { month: "Oct", msp: 2100, market: 2220, previous: 2200 },
    { month: "Nov", msp: 2100, market: 2300, previous: 2150 },
    { month: "Dec", msp: 2100, market: 2350, previous: 2100 }
  ],
  rice: [
    { month: "Jan", msp: 1940, market: 2050, previous: 1980 },
    { month: "Feb", msp: 1940, market: 2080, previous: 2000 },
    { month: "Mar", msp: 1940, market: 2150, previous: 2050 },
    { month: "Apr", msp: 1940, market: 2200, previous: 2100 },
    { month: "May", msp: 1940, market: 2180, previous: 2150 },
    { month: "Jun", msp: 1940, market: 2150, previous: 2180 },
    { month: "Jul", msp: 2000, market: 2100, previous: 2150 },
    { month: "Aug", msp: 2000, market: 2050, previous: 2120 },
    { month: "Sep", msp: 2000, market: 2090, previous: 2080 },
    { month: "Oct", msp: 2000, market: 2150, previous: 2050 },
    { month: "Nov", msp: 2000, market: 2200, previous: 2020 },
    { month: "Dec", msp: 2000, market: 2280, previous: 2000 }
  ],
  pulses: [
    { month: "Jan", msp: 6000, market: 7200, previous: 6800 },
    { month: "Feb", msp: 6000, market: 7350, previous: 6900 },
    { month: "Mar", msp: 6000, market: 7500, previous: 7000 },
    { month: "Apr", msp: 6000, market: 7600, previous: 7100 },
    { month: "May", msp: 6000, market: 7800, previous: 7200 },
    { month: "Jun", msp: 6000, market: 8000, previous: 7300 },
    { month: "Jul", msp: 6300, market: 7900, previous: 7500 },
    { month: "Aug", msp: 6300, market: 7850, previous: 7600 },
    { month: "Sep", msp: 6300, market: 7700, previous: 7700 },
    { month: "Oct", msp: 6300, market: 7500, previous: 7600 },
    { month: "Nov", msp: 6300, market: 7400, previous: 7400 },
    { month: "Dec", msp: 6300, market: 7300, previous: 7200 }
  ]
};

// Define chart config for legends
const config = {
  msp: {
    label: "MSP",
    theme: {
      light: "#2563eb",
      dark: "#3b82f6"
    }
  },
  market: {
    label: "Current Market",
    theme: {
      light: "#16a34a",
      dark: "#22c55e"
    }
  },
  previous: {
    label: "Previous Year",
    theme: {
      light: "#94a3b8",
      dark: "#cbd5e1"
    }
  }
};

export function MarketPriceTrendChart() {
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary-600" />
            <CardTitle>Market Price Trends</CardTitle>
          </div>
          <CardDescription className="mt-1">Compare MSP vs market prices</CardDescription>
        </div>
        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select crop" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wheat">Wheat</SelectItem>
            <SelectItem value="rice">Rice</SelectItem>
            <SelectItem value="pulses">Pulses</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line">
          <div className="flex justify-between mb-4">
            <TabsList>
              <TabsTrigger value="line">Line Chart</TabsTrigger>
              <TabsTrigger value="area">Area Chart</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="line" className="h-[300px]">
            <ChartContainer config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketTrends[selectedCrop as keyof typeof marketTrends]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Price (₹/quintal)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value) => [`₹${value}/quintal`, ``]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="msp" 
                    stroke="#2563eb" 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="market" 
                    stroke="#16a34a" 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="previous" 
                    stroke="#94a3b8" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    dot={{ r: 2 }}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          
          <TabsContent value="area" className="h-[300px]">
            <ChartContainer config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketTrends[selectedCrop as keyof typeof marketTrends]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Price (₹/quintal)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value) => [`₹${value}/quintal`, ``]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="msp" 
                    stackId="1"
                    stroke="#2563eb" 
                    fill="#2563eb20"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="market" 
                    stackId="2"
                    stroke="#16a34a" 
                    fill="#16a34a20"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="previous" 
                    stackId="3"
                    stroke="#94a3b8" 
                    fill="#94a3b820"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
