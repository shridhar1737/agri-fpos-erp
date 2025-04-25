
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoutePlanner } from "@/components/logistics/RoutePlanner";
import { VehicleManagement } from "@/components/logistics/VehicleManagement";
import { TripLogs } from "@/components/logistics/TripLogs";
import { CostCalculator } from "@/components/logistics/CostCalculator";

export default function LogisticsPage() {
  return (
    <AppLayout title="Logistics Management">
      <Tabs defaultValue="routes" className="w-full">
        <TabsList>
          <TabsTrigger value="routes">Route Planner</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicle Management</TabsTrigger>
          <TabsTrigger value="trips">Trip Logs</TabsTrigger>
          <TabsTrigger value="costs">Cost Calculator</TabsTrigger>
        </TabsList>
        <TabsContent value="routes" className="mt-4">
          <RoutePlanner />
        </TabsContent>
        <TabsContent value="vehicles" className="mt-4">
          <VehicleManagement />
        </TabsContent>
        <TabsContent value="trips" className="mt-4">
          <TripLogs />
        </TabsContent>
        <TabsContent value="costs" className="mt-4">
          <CostCalculator />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
