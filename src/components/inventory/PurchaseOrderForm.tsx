
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

// Sample data
const vendors = [
  { id: 1, name: "AgriChem Suppliers Ltd." },
  { id: 2, name: "Green Farm Inputs Pvt." },
  { id: 3, name: "Organic Solutions Inc." },
  { id: 4, name: "Krishak Inputs Co." },
];

const products = [
  { id: "SKU001", name: "NPK Fertilizer 15-15-15", unit: "bag", price: 1200 },
  { id: "SKU002", name: "Pesticide Spray - Premium", unit: "liter", price: 450 },
  { id: "SKU003", name: "Wheat Seeds - Grade A", unit: "kg", price: 80 },
  { id: "SKU004", name: "Micronutrients Mix", unit: "packet", price: 150 },
];

// Form schema
const purchaseOrderSchema = z.object({
  vendorName: z.string().min(1, "Vendor is required"),
  productId: z.string().min(1, "Product is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  rate: z.coerce.number().min(0.01, "Rate must be greater than 0"),
});

type PurchaseOrderFormValues = z.infer<typeof purchaseOrderSchema>;

export function PurchaseOrderForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<PurchaseOrderFormValues>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      vendorName: "",
      productId: "",
      quantity: 0,
      rate: 0,
    },
  });

  const onSubmit = async (values: PurchaseOrderFormValues) => {
    setLoading(true);
    
    try {
      // Find the selected product
      const selectedProduct = products.find(product => product.id === values.productId);
      
      if (!selectedProduct) {
        throw new Error("Selected product not found");
      }
      
      // Calculate total amount
      const totalAmount = values.quantity * values.rate;
      
      // Save to database
      const { error } = await supabase.from("purchase_orders").insert({
        vendor_name: values.vendorName,
        product_id: values.productId,
        product_name: selectedProduct.name,
        quantity: values.quantity,
        rate: values.rate,
        total_amount: totalAmount,
      });
      
      if (error) {
        throw error;
      }
      
      // Success notification
      toast({
        title: "Purchase Order Created",
        description: "The purchase order has been generated successfully."
      });
      
      // Reset form
      form.reset();
      
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred while creating the purchase order.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Purchase Order</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="vendorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Vendor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vendors.map(vendor => (
                          <SelectItem key={vendor.id} value={vendor.name}>
                            {vendor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} (₹{product.price}/{product.unit})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Rate per unit</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => form.reset()}>Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating Order..." : "Create Order"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
