
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  status?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ title, value, change, status, icon, className }: StatCardProps) {
  return (
    <div className={cn("stats-card", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        {icon && <div className="p-2 bg-primary-100 rounded-lg">{icon}</div>}
      </div>
      <div className="flex items-center mt-4 justify-between">
        {change !== undefined && (
          <div className={cn(
            "flex items-center text-xs font-medium",
            change >= 0 ? "text-success" : "text-danger"
          )}>
            {change >= 0 ? (
              <>
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>+{change}%</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3 mr-1" />
                <span>{change}%</span>
              </>
            )}
          </div>
        )}
        {status && (
          <span className="text-xs text-gray-500">
            {status}
          </span>
        )}
      </div>
    </div>
  );
}
