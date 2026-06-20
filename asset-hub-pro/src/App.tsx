import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/AppLayout";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";
import AssetsPage from "@/pages/AssetsPage";
import AssetDetailPage from "@/pages/AssetDetailPage";
import EmployeesPage from "@/pages/EmployeesPage";
import AllocationsPage from "@/pages/AllocationsPage";
import DocumentsPage from "@/pages/DocumentsPage";
import ReportsPage from "@/pages/ReportsPage";
import AIAssistantPage from "@/pages/AIAssistantPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
            <Route path="/assets" element={<ProtectedRoute allowedRoles={["ADMIN", "IT_STAFF"]}><AppLayout><AssetsPage /></AppLayout></ProtectedRoute>} />
            <Route path="/assets/:id" element={<ProtectedRoute allowedRoles={["ADMIN", "IT_STAFF"]}><AppLayout><AssetDetailPage /></AppLayout></ProtectedRoute>} />
            <Route path="/employees" element={<ProtectedRoute allowedRoles={["ADMIN", "IT_STAFF"]}><AppLayout><EmployeesPage /></AppLayout></ProtectedRoute>} />
            <Route path="/allocations" element={<ProtectedRoute><AppLayout><AllocationsPage /></AppLayout></ProtectedRoute>} />
            <Route path="/documents" element={<ProtectedRoute allowedRoles={["ADMIN", "IT_STAFF"]}><AppLayout><DocumentsPage /></AppLayout></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AppLayout><ReportsPage /></AppLayout></ProtectedRoute>} />
            <Route path="/ai-assistant" element={<ProtectedRoute allowedRoles={["ADMIN", "IT_STAFF"]}><AppLayout><AIAssistantPage /></AppLayout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AppLayout><SettingsPage /></AppLayout></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
