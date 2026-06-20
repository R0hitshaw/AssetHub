import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import SidebarNavItem from "@/components/SidebarNavItem";
import {
  LayoutDashboard,
  Monitor,
  Users,
  ArrowLeftRight,
  FileText,
  BarChart3,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const AppSidebar = ({ mobile = false, onNavigate }: AppSidebarProps) => {
  const { user, logout, hasRole } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const isCollapsed = !mobile && collapsed;

  const navigation = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", roles: ["ADMIN", "IT_STAFF", "EMPLOYEE"] as const },
    { to: "/assets", icon: Monitor, label: "Assets", roles: ["ADMIN", "IT_STAFF"] as const },
    { to: "/employees", icon: Users, label: "Employees", roles: ["ADMIN", "IT_STAFF"] as const },
    { to: "/allocations", icon: ArrowLeftRight, label: "Allocations", roles: ["ADMIN", "IT_STAFF", "EMPLOYEE"] as const },
    { to: "/documents", icon: FileText, label: "Documents", roles: ["ADMIN", "IT_STAFF"] as const },
    { to: "/reports", icon: BarChart3, label: "Reports", roles: ["ADMIN"] as const },
    { to: "/ai-assistant", icon: Bot, label: "AI Assistant", roles: ["ADMIN", "IT_STAFF"] as const },
    { to: "/settings", icon: Settings, label: "Settings", roles: ["ADMIN"] as const },
  ];

  const visibleNav = navigation.filter((item) => hasRole([...item.roles]));

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-sidebar-border transition-all duration-200 h-full",
        "bg-sidebar",
        mobile ? "w-full" : isCollapsed ? "w-16" : "w-60"
      )}
      style={{ background: "var(--gradient-sidebar)" }}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md gradient-brand">
          <Shield className="h-4 w-4 text-primary-foreground" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-bold text-sidebar-accent-foreground">AssetHub</span>
            <span className="text-[10px] text-sidebar-muted">Asset Management</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-3 overflow-y-auto">
        {visibleNav.map((item) => (
          <div key={item.to} onClick={onNavigate}>
            <SidebarNavItem {...item} collapsed={isCollapsed} />
          </div>
        ))}
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-3">
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-primary">
            {user?.name?.charAt(0)}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-sidebar-accent-foreground truncate">{user?.name}</p>
              <p className="text-[10px] text-sidebar-muted">{user?.role?.replace("_", " ")}</p>
            </div>
          )}
          {!isCollapsed && (
            <button
              onClick={logout}
              className="rounded-md p-1.5 text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Collapse toggle (desktop only) */}
      {!mobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-10 items-center justify-center border-t border-sidebar-border text-sidebar-muted hover:text-sidebar-accent-foreground transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      )}
    </aside>
  );
};

export default AppSidebar;
