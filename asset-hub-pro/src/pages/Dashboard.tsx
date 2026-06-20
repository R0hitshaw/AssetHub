import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import {
  Monitor,
  Users,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  TrendingUp,
  Package,
  Wrench,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const barData = [
  { month: "Jan", assigned: 45, available: 12, maintenance: 5 },
  { month: "Feb", assigned: 50, available: 10, maintenance: 8 },
  { month: "Mar", assigned: 48, available: 15, maintenance: 3 },
  { month: "Apr", assigned: 55, available: 8, maintenance: 6 },
  { month: "May", assigned: 52, available: 11, maintenance: 4 },
  { month: "Jun", assigned: 60, available: 9, maintenance: 7 },
];

const pieData = [
  { name: "Laptops", value: 420, color: "hsl(215 70% 45%)" },
  { name: "Monitors", value: 280, color: "hsl(172 66% 40%)" },
  { name: "Phones", value: 180, color: "hsl(38 92% 50%)" },
  { name: "Peripherals", value: 320, color: "hsl(280 60% 50%)" },
  { name: "Servers", value: 85, color: "hsl(0 72% 51%)" },
];

const recentAlerts = [
  { id: 1, type: "warning", message: "15 laptop warranties expiring in 30 days", time: "2h ago" },
  { id: 2, type: "info", message: "New asset batch #2847 registered", time: "4h ago" },
  { id: 3, type: "error", message: "3 assets reported as damaged", time: "6h ago" },
  { id: 4, type: "success", message: "Monthly audit completed successfully", time: "1d ago" },
];

const recentAllocations = [
  { id: 1, asset: "MacBook Pro 16\"", employee: "Sarah Chen", action: "Assigned", date: "Today" },
  { id: 2, asset: "Dell Monitor 27\"", employee: "Mike Ross", action: "Returned", date: "Today" },
  { id: 3, asset: "iPhone 15 Pro", employee: "Lisa Park", action: "Assigned", date: "Yesterday" },
  { id: 4, asset: "Logitech MX Keys", employee: "Tom Hardy", action: "Assigned", date: "Yesterday" },
];

const StatCard = ({ icon: Icon, label, value, change, changeType }: {
  icon: any; label: string; value: string; change: string; changeType: "up" | "down";
}) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
    <div className="flex items-center justify-between mb-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <span className={`flex items-center gap-1 text-xs font-medium ${changeType === "up" ? "text-success" : "text-destructive"}`}>
        {changeType === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        {change}
      </span>
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{label}</p>
  </motion.div>
);

const alertStyles = {
  warning: "border-l-warning bg-warning/5",
  info: "border-l-info bg-info/5",
  error: "border-l-destructive bg-destructive/5",
  success: "border-l-success bg-success/5",
};

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back, {user?.name}. Here's your asset overview.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Monitor} label="Total Assets" value="2,847" change="12%" changeType="up" />
        <StatCard icon={Users} label="Active Allocations" value="1,923" change="8%" changeType="up" />
        <StatCard icon={AlertTriangle} label="Warranty Expiring" value="47" change="3%" changeType="down" />
        <StatCard icon={CheckCircle2} label="Available Assets" value="389" change="5%" changeType="up" />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 table-container p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Asset Allocation Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 100%)",
                  border: "1px solid hsl(220 13% 90%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="assigned" fill="hsl(215 70% 45%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="available" fill="hsl(172 66% 40%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="maintenance" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="table-container p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Assets by Category</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-medium text-foreground ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Alerts */}
        <div className="table-container p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Alerts</h3>
          <div className="space-y-2">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-center justify-between rounded-md border-l-[3px] px-3 py-2.5 text-sm ${alertStyles[alert.type as keyof typeof alertStyles]}`}
              >
                <span className="text-foreground">{alert.message}</span>
                <span className="text-xs text-muted-foreground shrink-0 ml-4">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent allocations */}
        <div className="table-container p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Allocations</h3>
          <div className="space-y-3">
            {recentAllocations.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-md ${item.action === "Assigned" ? "bg-primary/10" : "bg-warning/10"}`}>
                  {item.action === "Assigned" ? <Package className="h-4 w-4 text-primary" /> : <Wrench className="h-4 w-4 text-warning" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.asset}</p>
                  <p className="text-xs text-muted-foreground">{item.employee} · {item.action}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
