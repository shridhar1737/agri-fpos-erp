
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { CreditCard } from "lucide-react";
import { useState } from "react";

// Sample data for crop profit chart
const cropProfitData = [
  { name: "Wheat", revenue: 285000, expenses: 195000, profit: 90000 },
  { name: "Rice", revenue: 320000, expenses: 210000, profit: 110000 },
  { name: "Pulses", revenue: 275000, expenses: 180000, profit: 95000 },
  { name: "Cotton", revenue: 340000, expenses: 225000, profit: 115000 },
  { name: "Vegetables", revenue: 420000, expenses: 260000, profit: 160000 },
  { name: "Maize", revenue: 190000, expenses: 120000, profit: 70000 }
];

// Chart config for legend styling
const config = {
  revenue: {
    label: "Revenue",
    theme: {
      light: "#16a34a",
      dark: "#22c55e"
    }
  },
  expenses: {
    label: "Expenses",
    theme: {
      light: "#dc2626",
      dark: "#ef4444"
    }
  },
  profit: {
    label: "Profit",
    theme: {
      light: "#2563eb",
      dark: "#3b82f6"
    }
  }
};

export function CropProfitChart() {
  const [year, setYear] = useState("2023");

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-primary-600" />
          <CardTitle>Crop-wise Profit Analysis</CardTitle>
        </div>
        <select 
          value={year} 
          onChange={(e) => setYear(e.target.value)}
          className="bg-background border rounded px-2 py-1 text-sm"
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px]">
          <ChartContainer config={config} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={cropProfitData}
                margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
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
                  labelFormatter={(label) => `Crop: ${label}`}
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar 
                  dataKey="revenue" 
                  name="Revenue" 
                  fill="#16a34a" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="expenses" 
                  name="Expenses" 
                  fill="#dc2626" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="profit" 
                  name="Profit" 
                  fill="#2563eb" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h4 className="text-sm font-medium text-green-700">Highest Revenue</h4>
            <p className="text-xl font-bold text-green-600">₹420,000</p>
            <p className="text-sm text-green-600">Vegetables</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h4 className="text-sm font-medium text-red-700">Highest Expense</h4>
            <p className="text-xl font-bold text-red-600">₹260,000</p>
            <p className="text-sm text-red-600">Vegetables</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="text-sm font-medium text-blue-700">Best ROI</h4>
            <p className="text-xl font-bold text-blue-600">61.5%</p>
            <p className="text-sm text-blue-600">Vegetables</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
