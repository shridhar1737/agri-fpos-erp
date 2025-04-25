
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { Leaf, TrendingUp, Users, Warehouse } from "lucide-react";

export function AdminDashboard() {
  const stats = [
    {
      title: "Total Sales",
      value: "₹24,85,000",
      change: 12.5,
      status: "This month",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Active Farmers",
      value: "1,284",
      change: 4.3,
      status: "Since last month",
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "Crop Varieties",
      value: "48",
      change: 8.1,
      status: "New additions",
      icon: <Leaf className="h-4 w-4" />
    },
    {
      title: "Storage Capacity",
      value: "85%",
      change: -2.4,
      status: "Current utilization",
      icon: <Warehouse className="h-4 w-4" />
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
