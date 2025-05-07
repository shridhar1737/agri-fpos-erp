
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Users, Medal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for farmer contributions
const farmerContributionData = [
  { name: "Rajesh Kumar", value: 420000, percentage: 21, products: 5 },
  { name: "Suresh Singh", value: 380000, percentage: 19, products: 4 },
  { name: "Amit Sharma", value: 350000, percentage: 17.5, products: 3 },
  { name: "Priya Patel", value: 290000, percentage: 14.5, products: 3 },
  { name: "Vinod Yadav", value: 260000, percentage: 13, products: 4 },
  { name: "Others", value: 300000, percentage: 15, products: 6 }
];

const COLORS = ['#16a34a', '#2563eb', '#ea580c', '#9333ea', '#0891b2', '#94a3b8'];

// Chart config for legend styling
const config = {
  contribution: {
    label: "Contribution",
    theme: {
      light: "#16a34a",
      dark: "#22c55e"
    }
  }
};

export function FarmerContributionChart() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary-600" />
          <CardTitle>Farmer Contribution Analysis</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pie">
          <TabsList className="mb-4">
            <TabsTrigger value="pie">Distribution</TabsTrigger>
            <TabsTrigger value="bar">Ranking</TabsTrigger>
          </TabsList>
        
          <TabsContent value="pie" className="w-full">
            <div className="w-full h-[350px]">
              <ChartContainer config={config} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={farmerContributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {farmerContributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`₹${Number(value).toLocaleString()}`, ``]}
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="bar" className="w-full">
            <div className="w-full h-[350px]">
              <ChartContainer config={config} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={farmerContributionData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 70, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis 
                      type="number" 
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: '#d1d5db' }}
                      axisLine={{ stroke: '#d1d5db' }}
                      tickFormatter={(value) => `₹${(value/1000)}k`}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: '#d1d5db' }}
                      axisLine={{ stroke: '#d1d5db' }}
                      width={60}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${Number(value).toLocaleString()}`, ``]}
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}
                    />
                    <Bar dataKey="value" fill="#16a34a" name="Contribution" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
            <Medal className="h-4 w-4 text-amber-500" /> 
            Top Contributors
          </h3>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {farmerContributionData.slice(0, 3).map((farmer, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-md shadow-sm">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-amber-100 text-amber-600' : 
                    index === 1 ? 'bg-slate-100 text-slate-600' : 
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{farmer.name}</p>
                    <p className="text-sm text-gray-500">₹{farmer.value.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
