
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

// Sample data for sales trends
const salesTrendData = [
  { month: "Jan", year: 2023, sales: 285000, target: 300000, lastYear: 254000 },
  { month: "Feb", year: 2023, sales: 320000, target: 310000, lastYear: 279000 },
  { month: "Mar", year: 2023, sales: 340000, target: 320000, lastYear: 295000 },
  { month: "Apr", year: 2023, sales: 375000, target: 350000, lastYear: 310000 },
  { month: "May", year: 2023, sales: 410000, target: 380000, lastYear: 330000 },
  { month: "Jun", year: 2023, sales: 395000, target: 400000, lastYear: 345000 },
  { month: "Jul", year: 2023, sales: 385000, target: 390000, lastYear: 340000 },
  { month: "Aug", year: 2023, sales: 420000, target: 400000, lastYear: 360000 },
  { month: "Sep", year: 2023, sales: 450000, target: 425000, lastYear: 380000 },
  { month: "Oct", year: 2023, sales: 475000, target: 450000, lastYear: 400000 },
  { month: "Nov", year: 2023, sales: 490000, target: 480000, lastYear: 420000 },
  { month: "Dec", year: 2023, sales: 515000, target: 500000, lastYear: 450000 },
];

// Chart config for legends
const config = {
  sales: {
    label: "Actual Sales",
    theme: {
      light: "#16a34a",
      dark: "#22c55e"
    }
  },
  target: {
    label: "Target",
    theme: {
      light: "#2563eb",
      dark: "#3b82f6"
    }
  },
  lastYear: {
    label: "Last Year",
    theme: {
      light: "#94a3b8",
      dark: "#cbd5e1"
    }
  }
};

export function SalesTrendChart() {
  const [timeframe, setTimeframe] = useState("yearly");

  // Calculate aggregated metrics
  const totalSales = salesTrendData.reduce((sum, item) => sum + item.sales, 0);
  const totalTarget = salesTrendData.reduce((sum, item) => sum + item.target, 0);
  const totalLastYear = salesTrendData.reduce((sum, item) => sum + item.lastYear, 0);
  const growthRate = ((totalSales - totalLastYear) / totalLastYear * 100).toFixed(1);
  const targetAchievement = ((totalSales / totalTarget) * 100).toFixed(1);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary-600" />
          <CardTitle>Sales Trend Analysis</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-background border rounded px-2 py-1 text-sm"
          >
            <option value="yearly">Yearly</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line">
          <TabsList className="mb-4">
            <TabsTrigger value="line">Line Chart</TabsTrigger>
            <TabsTrigger value="area">Area Chart</TabsTrigger>
          </TabsList>
          
          <TabsContent value="line" className="w-full">
            <div className="w-full h-[350px]">
              <ChartContainer config={config} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesTrendData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: '#d1d5db' }}
                      axisLine={{ stroke: '#d1d5db' }}
                    />
                    <YAxis 
                      label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: '#d1d5db' }}
                      axisLine={{ stroke: '#d1d5db' }}
                      tickFormatter={(value) => `₹${(value/1000)}k`}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${Number(value).toLocaleString()}`, ``]}
                      labelFormatter={(label) => `Month: ${label}`}
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      name="Actual Sales" 
                      stroke="#16a34a" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      name="Target" 
                      stroke="#2563eb" 
                      strokeWidth={2} 
                      strokeDasharray="5 5"
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="lastYear" 
                      name="Last Year" 
                      stroke="#94a3b8" 
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="area" className="w-full">
            <div className="w-full h-[350px]">
              <ChartContainer config={config} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesTrendData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: '#d1d5db' }}
                      axisLine={{ stroke: '#d1d5db' }}
                    />
                    <YAxis 
                      label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: '#d1d5db' }}
                      axisLine={{ stroke: '#d1d5db' }}
                      tickFormatter={(value) => `₹${(value/1000)}k`}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${Number(value).toLocaleString()}`, ``]}
                      labelFormatter={(label) => `Month: ${label}`}
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      name="Actual Sales" 
                      stroke="#16a34a" 
                      fill="#16a34a20"
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="target" 
                      name="Target" 
                      stroke="#2563eb" 
                      fill="#2563eb20"
                      strokeWidth={2} 
                      strokeDasharray="5 5"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="lastYear" 
                      name="Last Year" 
                      stroke="#94a3b8" 
                      fill="#94a3b820"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h4 className="text-sm font-medium text-green-700">Total Sales</h4>
            <p className="text-xl font-bold text-green-600">₹{totalSales.toLocaleString()}</p>
            <p className="text-sm text-green-600">Year 2023</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="text-sm font-medium text-blue-700">Total Target</h4>
            <p className="text-xl font-bold text-blue-600">₹{totalTarget.toLocaleString()}</p>
            <p className="text-sm text-blue-600">Year 2023</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <h4 className="text-sm font-medium text-amber-700">Growth Rate</h4>
            <p className="text-xl font-bold text-amber-600">{growthRate}%</p>
            <p className="text-sm text-amber-600">vs Last Year</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h4 className="text-sm font-medium text-purple-700">Target Achievement</h4>
            <p className="text-xl font-bold text-purple-600">{targetAchievement}%</p>
            <p className="text-sm text-purple-600">Overall Progress</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
