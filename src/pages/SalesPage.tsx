
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProduceEntryForm } from "@/components/sales/ProduceEntryForm";
import { SaleOrderDashboard } from "@/components/sales/SaleOrderDashboard";
import { InvoiceViewer } from "@/components/sales/InvoiceViewer";
import { PaymentCollection } from "@/components/sales/PaymentCollection";

export default function SalesPage() {
  return (
    <AppLayout title="Sales Management">
      <Tabs defaultValue="produce" className="w-full">
        <TabsList>
          <TabsTrigger value="produce">Produce Entry</TabsTrigger>
          <TabsTrigger value="orders">Sale Orders</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>
        <TabsContent value="produce" className="mt-4">
          <ProduceEntryForm />
        </TabsContent>
        <TabsContent value="orders" className="mt-4">
          <SaleOrderDashboard />
        </TabsContent>
        <TabsContent value="invoices" className="mt-4">
          <InvoiceViewer />
        </TabsContent>
        <TabsContent value="payments" className="mt-4">
          <PaymentCollection />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
