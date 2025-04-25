
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const monthlyData = [
  { month: 'Jan', revenue: 285000, expenses: 195000, profit: 90000 },
  { month: 'Feb', revenue: 320000, expenses: 210000, profit: 110000 },
  { month: 'Mar', revenue: 275000, expenses: 180000, profit: 95000 },
  { month: 'Apr', revenue: 340000, expenses: 225000, profit: 115000 }
];

export function ProfitLossReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit & Loss Report - 2024</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px]">
          <BarChart
            width={800}
            height={400}
            data={monthlyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#16a34a" name="Revenue" />
            <Bar dataKey="expenses" fill="#dc2626" name="Expenses" />
            <Bar dataKey="profit" fill="#2563eb" name="Profit" />
          </BarChart>
        </div>
      </CardContent>
    </Card>
  );
}
