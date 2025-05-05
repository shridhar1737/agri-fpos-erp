
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

        <div className="h-[300px]">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropInputOutput}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, ``]}
                  labelFormatter={(label) => `Crop: ${label}`}
                />
                <Legend />
                <Bar dataKey="inputCost" name="Input Cost" fill="#dc2626" radius={[4, 4, 0, 0]} />
                <Bar dataKey="yieldValue" name="Yield Value" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
