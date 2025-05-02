
import { Link } from 'react-router-dom';
import { Home, Users, Package, FileText, BarChart, Calendar, Truck, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SidebarProps {
  className?: string;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, to, active, onClick }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-primary-100 hover:text-primary-700",
        active ? "bg-primary-100 text-primary-700 font-medium" : "text-gray-700"
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

export function Sidebar({ className }: SidebarProps) {
  const [activePath, setActivePath] = useState(window.location.pathname);
  
  const handleNavigation = (path: string) => {
    setActivePath(path);
  };

  return (
    <aside className={cn("flex flex-col w-64 border-r border-gray-200 bg-white p-4 h-screen", className)}>
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="h-8 w-8 rounded bg-primary-500 flex items-center justify-center">
          <span className="text-white font-semibold text-lg">A</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800">AgriTrade FPO</h1>
      </div>
      
      <nav className="space-y-1 flex-1">
        <SidebarItem 
          icon={Home} 
          label="Main-Dashboard" 
          to="/" 
          active={activePath === '/'} 
          onClick={() => handleNavigation('/')} 
        />
        <SidebarItem 
          icon={Users} 
          label="Farmers" 
          to="/farmers" 
          active={activePath === '/farmers'} 
          onClick={() => handleNavigation('/farmers')} 
        />
        <SidebarItem 
          icon={Package} 
          label="Inventory" 
          to="/inventory" 
          active={activePath === '/inventory'} 
          onClick={() => handleNavigation('/inventory')} 
        />
        <SidebarItem 
          icon={ShoppingCart} 
          label="Sales" 
          to="/sales" 
          active={activePath === '/sales'} 
          onClick={() => handleNavigation('/sales')} 
        />
        <SidebarItem 
          icon={FileText} 
          label="Finance" 
          to="/finance" 
          active={activePath === '/finance'} 
          onClick={() => handleNavigation('/finance')} 
        />
        <SidebarItem 
          icon={BarChart} 
          label="Reports" 
          to="/reports" 
          active={activePath === '/reports'} 
          onClick={() => handleNavigation('/reports')} 
        />
        <SidebarItem 
          icon={Calendar} 
          label="Meetings" 
          to="/meetings" 
          active={activePath === '/meetings'} 
          onClick={() => handleNavigation('/meetings')} 
        />
        <SidebarItem 
          icon={Truck} 
          label="Logistics" 
          to="/logistics" 
          active={activePath === '/logistics'} 
          onClick={() => handleNavigation('/logistics')} 
        />
      </nav>
      
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
          <div>
            <p className="text-sm font-medium text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">admin@agritrade.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
