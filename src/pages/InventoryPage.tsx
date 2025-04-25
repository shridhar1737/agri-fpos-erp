
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputDemandTable } from "@/components/inventory/InputDemandTable";
import { PurchaseOrderForm } from "@/components/inventory/PurchaseOrderForm";
import { StockMovementLog } from "@/components/inventory/StockMovementLog";
import { InventoryAlerts } from "@/components/inventory/InventoryAlerts";

export default function InventoryPage() {
  return (
    <AppLayout title="Inventory Management">
      <Tabs defaultValue="demand" className="w-full">
        <TabsList>
          <TabsTrigger value="demand">Input Demand</TabsTrigger>
          <TabsTrigger value="purchase">Purchase Orders</TabsTrigger>
          <TabsTrigger value="stock">Stock Movement</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="demand" className="mt-4">
          <InputDemandTable />
        </TabsContent>
        <TabsContent value="purchase" className="mt-4">
          <PurchaseOrderForm />
        </TabsContent>
        <TabsContent value="stock" className="mt-4">
          <StockMovementLog />
        </TabsContent>
        <TabsContent value="alerts" className="mt-4">
          <InventoryAlerts />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
