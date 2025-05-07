
import { Bell, Search, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobalSearch } from "./GlobalSearch";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex justify-between items-center py-4 mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      
      <div className="flex items-center gap-4">
        <GlobalSearch />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <DropdownMenuItem className="py-3 cursor-pointer">
                <div>
                  <p className="font-medium text-sm">Low Inventory Alert</p>
                  <p className="text-xs text-gray-500">Urea stock below threshold</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 cursor-pointer">
                <div>
                  <p className="font-medium text-sm">Payment Received</p>
                  <p className="text-xs text-gray-500">₹25,000 from Bansal FPO</p>
                  <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 cursor-pointer">
                <div>
                  <p className="font-medium text-sm">Compliance Due</p>
                  <p className="text-xs text-gray-500">Annual GST filing deadline in 3 days</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              <Button variant="ghost" className="w-full text-primary-500">
                View all notifications
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button className="bg-primary-500 hover:bg-primary-600">
          <Plus className="h-4 w-4 mr-2" /> Quick Add
        </Button>
      </div>
    </header>
  );
}
