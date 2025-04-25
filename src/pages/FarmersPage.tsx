
import { AppLayout } from "@/components/layout/AppLayout";
import { FarmersList } from "@/components/farmers/FarmersList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FarmersPage() {
  return (
    <AppLayout title="Farmers Management">
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Farmers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <FarmersList />
        </TabsContent>
        <TabsContent value="active" className="mt-4">
          <FarmersList />
        </TabsContent>
        <TabsContent value="inactive" className="mt-4">
          <FarmersList />
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <FarmersList />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
