
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { AlertsCard } from "@/components/dashboard/AlertsCard";
import { QuickActionsCard } from "@/components/dashboard/QuickActionsCard";
import { ShoppingCart, Package, Truck, Users } from "lucide-react";
import { SeasonalProductionChart } from "@/components/dashboard/SeasonalProductionChart";
import { InputYieldRatioChart } from "@/components/dashboard/InputYieldRatioChart";
import { MarketPriceTrendChart } from "@/components/dashboard/MarketPriceTrendChart";

const salesData = [
  { name: "Jan", value: 40000 },
  { name: "Feb", value: 35000 },
  { name: "Mar", value: 55000 },
  { name: "Apr", value: 48000 },
  { name: "May", value: 62000 },
  { name: "Jun", value: 58000 },
  { name: "Jul", value: 70000 },
  { name: "Aug", value: 75000 },
  { name: "Sep", value: 80000 },
  { name: "Oct", value: 85000 },
  { name: "Nov", value: 90000 },
  { name: "Dec", value: 95000 },
];

const cropData = [
  { name: "Wheat", value: 35 },
  { name: "Rice", value: 30 },
  { name: "Pulses", value: 15 },
  { name: "Vegetables", value: 12 },
  { name: "Others", value: 8 },
];

const alerts = [
  {
    id: "1",
    type: "warning" as const,
    title: "Low Stock Alert",
    description: "Urea stock has fallen below the minimum threshold of 50 bags.",
    time: "2 hours ago"
  },
  {
    id: "2",
    type: "info" as const,
    title: "Payment Received",
    description: "₹25,000 payment received from Bansal FPO for wheat delivery.",
    time: "5 hours ago"
  },
  {
    id: "3",
    type: "danger" as const,
    title: "Compliance Deadline",
    description: "Annual GST filing is due in 3 days. Complete all documentation.",
    time: "1 day ago"
  },
];

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Today's Revenue" 
          value="₹42,500" 
          change={12} 
          status="Updated 1h ago"
          icon={<ShoppingCart className="h-5 w-5 text-primary-600" />}
        />
        <StatCard 
          title="Inventory Value" 
          value="₹3,25,000" 
          change={-3} 
          status="Updated 3h ago"
          icon={<Package className="h-5 w-5 text-primary-600" />}
        />
        <StatCard 
          title="Deliveries" 
          value="12" 
          change={0} 
          status="On schedule"
          icon={<Truck className="h-5 w-5 text-primary-600" />}
        />
        <StatCard 
          title="Active Farmers" 
          value="245" 
          change={5} 
          status="This month"
          icon={<Users className="h-5 w-5 text-primary-600" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ChartCard 
            title="Sales Overview" 
            description="Monthly revenue from sales" 
            chartData={salesData} 
            type="line"
          />
        </div>
        <div>
          <ChartCard 
            title="Crop Distribution" 
            description="By revenue percentage" 
            chartData={cropData} 
            type="bar"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 mb-6">
        <MarketPriceTrendChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SeasonalProductionChart />
        <InputYieldRatioChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsCard alerts={alerts} />
        <QuickActionsCard />
      </div>
    </AppLayout>
  );
}
