
import { TableRow, TableCell } from "@/components/ui/table";
import { PurchaseOrderStatusBadge } from "./PurchaseOrderStatusBadge";
import { PurchaseOrderDocument } from "./PurchaseOrderDocument";
import { PurchaseOrder } from "./types";

interface PurchaseOrderRowProps {
  order: PurchaseOrder;
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
}

export function PurchaseOrderRow({ 
  order, 
  formatDate, 
  formatCurrency 
}: PurchaseOrderRowProps) {
  return (
    <TableRow>
      <TableCell>{formatDate(order.created_at)}</TableCell>
      <TableCell>{order.vendor_name}</TableCell>
      <TableCell>{order.product_name}</TableCell>
      <TableCell>{order.quantity}</TableCell>
      <TableCell>{formatCurrency(order.rate)}</TableCell>
      <TableCell>{formatCurrency(order.total_amount)}</TableCell>
      <TableCell>
        <PurchaseOrderStatusBadge status={order.status} />
      </TableCell>
      <TableCell>
        <PurchaseOrderDocument documentUrl={order.document_url || ''} />
      </TableCell>
    </TableRow>
  );
}
