
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InvoiceViewer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Viewer</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This component will display invoice details and allow for printing.</p>
      </CardContent>
    </Card>
  );
}
