
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectDashboard } from "@/components/projects/ProjectDashboard";
import { KPITracker } from "@/components/projects/KPITracker";
import { MediaUploader } from "@/components/projects/MediaUploader";
import { ReportGenerator } from "@/components/projects/ReportGenerator";

export default function ProjectsPage() {
  return (
    <AppLayout title="Project Management">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList>
          <TabsTrigger value="dashboard">Project Dashboard</TabsTrigger>
          <TabsTrigger value="kpi">KPI Tracking</TabsTrigger>
          <TabsTrigger value="media">Media Upload</TabsTrigger>
          <TabsTrigger value="reports">Report Generator</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-4">
          <ProjectDashboard />
        </TabsContent>
        <TabsContent value="kpi" className="mt-4">
          <KPITracker />
        </TabsContent>
        <TabsContent value="media" className="mt-4">
          <MediaUploader />
        </TabsContent>
        <TabsContent value="reports" className="mt-4">
          <ReportGenerator />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
