
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FarmersPage from "./pages/FarmersPage";
import InventoryPage from "./pages/InventoryPage";
import SalesPage from "./pages/SalesPage";
import FinancePage from "./pages/FinancePage";
import ProjectsPage from "./pages/ProjectsPage";
import ReportsPage from "./pages/ReportsPage";
import MeetingsPage from "./pages/MeetingsPage";
import OrdersPage from "./pages/OrdersPage";
import LogisticsPage from "./pages/LogisticsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/farmers" element={<FarmersPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/meetings" element={<MeetingsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/logistics" element={<LogisticsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
