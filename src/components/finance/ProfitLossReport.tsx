
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

const monthlyData = [
  { month: 'Jan', revenue: 285000, expenses: 195000, profit: 90000 },
  { month: 'Feb', revenue: 320000, expenses: 210000, profit: 110000 },
  { month: 'Mar', revenue: 275000, expenses: 180000, profit: 95000 },
  { month: 'Apr', revenue: 340000, expenses: 225000, profit: 115000 }
];

// Chart config
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

export function ProfitLossReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit & Loss Report - 2024</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px]">
          <ChartContainer config={config} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₹${(value/1000)}k`}
                  width={80}
                />
                <Tooltip
                  formatter={(value) => [`₹${Number(value).toLocaleString()}`, ``]}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '6px', 
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
                    border: '1px solid #e5e7eb',
                    padding: '8px'
                  }}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="revenue" name="Revenue" fill="#16a34a" />
                <Bar dataKey="expenses" name="Expenses" fill="#dc2626" />
                <Bar dataKey="profit" name="Profit" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
