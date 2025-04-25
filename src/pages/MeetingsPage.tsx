
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeetingScheduler } from "@/components/meetings/MeetingScheduler";
import { AttendanceTracker } from "@/components/meetings/AttendanceTracker";
import { DocumentArchive } from "@/components/meetings/DocumentArchive";
import { ComplianceReminders } from "@/components/meetings/ComplianceReminders";

export default function MeetingsPage() {
  return (
    <AppLayout title="Meetings & Compliance">
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList>
          <TabsTrigger value="schedule">Meeting Schedule</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule" className="mt-4">
          <MeetingScheduler />
        </TabsContent>
        <TabsContent value="attendance" className="mt-4">
          <AttendanceTracker />
        </TabsContent>
        <TabsContent value="documents" className="mt-4">
          <DocumentArchive />
        </TabsContent>
        <TabsContent value="compliance" className="mt-4">
          <ComplianceReminders />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
