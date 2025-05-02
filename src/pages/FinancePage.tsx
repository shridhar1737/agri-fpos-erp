
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseTracker } from "@/components/finance/ExpenseTracker";
import { SummaryCards } from "@/components/finance/SummaryCards";
import { ProfitLossReport } from "@/components/finance/ProfitLossReport";
import { FarmerLedger } from "@/components/finance/FarmerLedger";
import { PurchaseOrderList } from "@/components/finance/PurchaseOrderList";

export default function FinancePage() {
  return (
    <AppLayout title="Financial Management">
      <Tabs defaultValue="expenses" className="w-full">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="profit">Profit & Loss</TabsTrigger>
          <TabsTrigger value="ledger">Farmer Ledger</TabsTrigger>
        </TabsList>
        <TabsContent value="expenses" className="mt-4">
          <ExpenseTracker />
        </TabsContent>
        <TabsContent value="purchase-orders" className="mt-4">
          <PurchaseOrderList />
        </TabsContent>
        <TabsContent value="summary" className="mt-4">
          <SummaryCards />
        </TabsContent>
        <TabsContent value="profit" className="mt-4">
          <ProfitLossReport />
        </TabsContent>
        <TabsContent value="ledger" className="mt-4">
          <FarmerLedger />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
