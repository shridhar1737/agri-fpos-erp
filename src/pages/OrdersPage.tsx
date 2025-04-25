
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCatalog } from "@/components/orders/ProductCatalog";
import { OrderManagement } from "@/components/orders/OrderManagement";
import { PaymentOptions } from "@/components/orders/PaymentOptions";
import { OrderTracking } from "@/components/orders/OrderTracking";

export default function OrdersPage() {
  return (
    <AppLayout title="Order Management">
      <Tabs defaultValue="catalog" className="w-full">
        <TabsList>
          <TabsTrigger value="catalog">Product Catalog</TabsTrigger>
          <TabsTrigger value="orders">Order Management</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="tracking">Order Tracking</TabsTrigger>
        </TabsList>
        <TabsContent value="catalog" className="mt-4">
          <ProductCatalog />
        </TabsContent>
        <TabsContent value="orders" className="mt-4">
          <OrderManagement />
        </TabsContent>
        <TabsContent value="payments" className="mt-4">
          <PaymentOptions />
        </TabsContent>
        <TabsContent value="tracking" className="mt-4">
          <OrderTracking />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
