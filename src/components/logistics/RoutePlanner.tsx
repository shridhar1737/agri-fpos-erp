
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, TruckIcon, MapPinIcon, PackageIcon, ListIcon, SearchIcon, NavigationIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { RouteEntryList } from "./RouteEntryList";

const formSchema = z.object({
  consignmentId: z.string().min(1, "Consignment ID is required"),
  shipDate: z.date({ required_error: "Ship date is required" }),
  customerName: z.string().min(1, "Customer name is required"),
  distance: z.string().regex(/^\d+(\.\d+)?$/, "Distance must be a valid number"),
  commodity: z.string().min(1, "Commodity is required"),
  route: z.string().min(1, "Route is required"),
  quantity: z.string().regex(/^\d+(\.\d+)?$/, "Quantity must be a valid number"),
  carrierName: z.string().min(1, "Carrier name is required"),
  status: z.enum(["Pending", "In Transit", "Delivered", "Cancelled"]),
  deliveryDate: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function RoutePlanner() {
  const [routes, setRoutes] = useState<(FormValues & { id: string })[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consignmentId: "",
      customerName: "",
      distance: "",
      commodity: "",
      route: "",
      quantity: "",
      carrierName: "",
      status: "Pending",
    },
  });

  function onSubmit(data: FormValues) {
    const newRoute = {
      ...data,
      id: `ROUTE-${Math.floor(Math.random() * 10000)}`,
    };
    
    setRoutes((prev) => [newRoute, ...prev]);
    
    toast({
      title: "Route plan created",
      description: `Consignment ${data.consignmentId} has been added to route plans.`,
    });

    form.reset({
      consignmentId: "",
      customerName: "",
      distance: "",
      commodity: "",
      route: "",
      quantity: "",
      carrierName: "",
      status: "Pending",
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Route Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Consignment ID */}
                <FormField
                  control={form.control}
                  name="consignmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consignment ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter consignment ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Ship Date */}
                <FormField
                  control={form.control}
                  name="shipDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Ship Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full justify-start text-left font-normal ${
                                !field.value && "text-muted-foreground"
                              }`}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select ship date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Customer Name */}
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-8" placeholder="Search customer..." {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Distance */}
                <FormField
                  control={form.control}
                  name="distance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distance (km)</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter distance" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Commodity */}
                <FormField
                  control={form.control}
                  name="commodity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commodity</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter commodity" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Quantity */}
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity (kg/units)</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter quantity" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Carrier Name */}
                <FormField
                  control={form.control}
                  name="carrierName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carrier Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter carrier name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Transit">In Transit</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Route */}
                <FormField
                  control={form.control}
                  name="route"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Route</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPinIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Textarea 
                            placeholder="Enter route details (source to destination)"
                            className="pl-8 min-h-20" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Delivery Date (Optional) */}
                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Delivery Date (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full justify-start text-left font-normal ${
                                !field.value && "text-muted-foreground"
                              }`}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select delivery date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            initialFocus
                            className="p-3 pointer-events-auto"
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Expected delivery date for this shipment
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                  <NavigationIcon size={16} />
                  Create Route Plan
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {/* Route Entries List */}
      <RouteEntryList routes={routes} />
    </div>
  );
}
