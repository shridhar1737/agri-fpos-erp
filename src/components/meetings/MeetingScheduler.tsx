
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const meetings = [
  {
    id: 1,
    title: "Annual General Meeting",
    date: "2024-05-15",
    time: "10:00 AM",
    venue: "Community Hall",
    attendees: 45,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Board Meeting",
    date: "2024-04-28",
    time: "02:00 PM",
    venue: "Conference Room",
    attendees: 12,
    status: "scheduled"
  },
  {
    id: 3,
    title: "Training Workshop",
    date: "2024-04-20",
    time: "11:00 AM",
    venue: "Training Center",
    attendees: 30,
    status: "completed"
  }
];

export function MeetingScheduler() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meeting Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Attendees</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meetings.map((meeting) => (
              <TableRow key={meeting.id}>
                <TableCell className="font-medium">{meeting.title}</TableCell>
                <TableCell>{new Date(meeting.date).toLocaleDateString()}</TableCell>
                <TableCell>{meeting.time}</TableCell>
                <TableCell>{meeting.venue}</TableCell>
                <TableCell>{meeting.attendees}</TableCell>
                <TableCell>
                  <Badge variant={
                    meeting.status === "completed" ? "success" :
                    meeting.status === "upcoming" ? "warning" : "secondary"
                  }>
                    {meeting.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
