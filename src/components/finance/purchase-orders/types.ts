
export interface PurchaseOrder {
  id: string;
  vendor_name: string;
  product_name: string;
  quantity: number;
  rate: number;
  total_amount: number;
  status: "Pending" | "Approved" | "Rejected" | "Completed";
  created_at: string;
  document_url?: string;
}
