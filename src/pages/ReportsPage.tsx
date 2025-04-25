
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminDashboard } from "@/components/reports/AdminDashboard";
import { ReportFilters } from "@/components/reports/ReportFilters";
import { CropProfitChart } from "@/components/reports/CropProfitChart";
import { FarmerContributionChart } from "@/components/reports/FarmerContributionChart";
import { SalesTrendChart } from "@/components/reports/SalesTrendChart";

export default function ReportsPage() {
  return (
    <AppLayout title="Analytics & Reports">
      <AdminDashboard />
      <div className="mt-6">
        <ReportFilters />
      </div>
      <Tabs defaultValue="crop" className="w-full mt-6">
        <TabsList>
          <TabsTrigger value="crop">Crop-wise Profit</TabsTrigger>
          <TabsTrigger value="farmer">Farmer Contribution</TabsTrigger>
          <TabsTrigger value="sales">Sales Trend</TabsTrigger>
        </TabsList>
        <TabsContent value="crop" className="mt-4">
          <CropProfitChart />
        </TabsContent>
        <TabsContent value="farmer" className="mt-4">
          <FarmerContributionChart />
        </TabsContent>
        <TabsContent value="sales" className="mt-4">
          <SalesTrendChart />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
