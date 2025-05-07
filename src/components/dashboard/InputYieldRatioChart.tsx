
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { ArrowDownRight, ArrowUpRight, Scale } from "lucide-react";

const cropInputOutput = [
  { 
    name: "Wheat", 
    inputCost: 25000, 
    yieldValue: 62000, 
    roi: 148 
  },
  { 
    name: "Rice", 
    inputCost: 32000, 
    yieldValue: 78000, 
    roi: 143.75 
  },
  { 
    name: "Pulses", 
    inputCost: 18000, 
    yieldValue: 41000, 
    roi: 127.78 
  },
  { 
    name: "Cotton", 
    inputCost: 42000, 
    yieldValue: 85000, 
    roi: 102.38 
  },
  { 
    name: "Vegetables", 
    inputCost: 35000, 
    yieldValue: 92000, 
    roi: 162.86 
  }
];

// Define chart config for legends
const config = {
  inputCost: {
    label: "Input Cost",
    theme: {
      light: "#dc2626",
      dark: "#ef4444"
    }
  },
  yieldValue: {
    label: "Yield Value",
    theme: {
      light: "#16a34a",
      dark: "#22c55e"
    }
  }
};

export function InputYieldRatioChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Scale className="h-5 w-5 text-primary-600" />
          <CardTitle>Input Cost vs. Yield Value</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          {cropInputOutput.map((crop) => (
            <Card key={crop.name} className="bg-gray-50">
              <CardContent className="p-3">
                <p className="text-sm font-medium">{crop.name}</p>
                <h3 className="text-xl font-bold mt-1">{crop.roi}%</h3>
                <div className="flex items-center mt-1 text-xs">
                  {crop.roi > 130 ? (
                    <>
                      <ArrowUpRight className="h-3 w-3 mr-1 text-green-600" />
                      <span className="text-green-600">Good ROI</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="h-3 w-3 mr-1 text-amber-600" />
                      <span className="text-amber-600">Average ROI</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="h-[300px] w-full overflow-visible">
          <ChartContainer config={config} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={cropInputOutput}
                margin={{ top: 20, right: 30, left: 40, bottom: 30 }}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  axisLine={{ stroke: '#d1d5db' }}
                  height={50}
                />
                <YAxis 
                  label={{ 
                    value: 'Amount (₹)', 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: -30,
                    style: { textAnchor: 'middle', fontSize: 12 } 
                  }}
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  axisLine={{ stroke: '#d1d5db' }}
                  tickFormatter={(value) => `₹${(value/1000)}k`}
                  width={80}
                />
                <Tooltip 
                  formatter={(value) => [`₹${Number(value).toLocaleString()}`, ``]}
                  labelFormatter={(label) => `Crop: ${label}`}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '6px', 
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
                    border: '1px solid #e5e7eb',
                    padding: '8px'
                  }}
                  wrapperStyle={{ zIndex: 1000 }}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                />
                <Legend
                  verticalAlign="top"
                  wrapperStyle={{ paddingBottom: 10 }}
                />
                <Bar 
                  dataKey="inputCost" 
                  name="Input Cost" 
                  fill="#dc2626" 
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
                <Bar 
                  dataKey="yieldValue" 
                  name="Yield Value" 
                  fill="#16a34a" 
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
