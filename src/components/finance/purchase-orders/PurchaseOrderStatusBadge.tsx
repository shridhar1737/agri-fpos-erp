
import { Badge } from "@/components/ui/badge";

type StatusType = "Pending" | "Approved" | "Rejected" | "Completed";

interface PurchaseOrderStatusBadgeProps {
  status: StatusType;
}

export function PurchaseOrderStatusBadge({ status }: PurchaseOrderStatusBadgeProps) {
  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case "Pending": return "bg-yellow-500";
      case "Approved": return "bg-green-500";
      case "Rejected": return "bg-red-500";
      case "Completed": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Badge className={getStatusColor(status)}>
      {status}
    </Badge>
  );
}
