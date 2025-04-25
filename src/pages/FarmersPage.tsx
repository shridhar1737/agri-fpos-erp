
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FarmerTable } from "@/components/farmers/FarmerTable";
import { FarmerRegistrationForm } from "@/components/farmers/FarmerRegistrationForm";
import { DuesDashboard } from "@/components/farmers/DuesDashboard";
import { BulkImportExport } from "@/components/farmers/BulkImportExport";

export default function FarmersPage() {
  return (
    <AppLayout title="Farmers Management">
      <Tabs defaultValue="directory" className="w-full">
        <TabsList>
          <TabsTrigger value="directory">Farmers Directory</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="dues">Dues Dashboard</TabsTrigger>
          <TabsTrigger value="import">Bulk Import/Export</TabsTrigger>
        </TabsList>
        <TabsContent value="directory" className="mt-4">
          <FarmerTable />
        </TabsContent>
        <TabsContent value="registration" className="mt-4">
          <FarmerRegistrationForm />
        </TabsContent>
        <TabsContent value="dues" className="mt-4">
          <DuesDashboard />
        </TabsContent>
        <TabsContent value="import" className="mt-4">
          <BulkImportExport />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
