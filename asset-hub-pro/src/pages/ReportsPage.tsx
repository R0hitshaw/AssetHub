import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Monitor, DollarSign, AlertTriangle, TrendingUp, Calendar, BarChart3 } from "lucide-react";

const assetsByDept = [
  { dept: "Engineering", count: 485, value: 892000 },
  { dept: "Marketing", count: 120, value: 186000 },
  { dept: "Design", count: 95, value: 178000 },
  { dept: "Sales", count: 210, value: 315000 },
  { dept: "HR", count: 65, value: 72000 },
  { dept: "Finance", count: 80, value: 96000 },
];

const warrantyData = [
  { month: "Jan", expiring: 8 },
  { month: "Feb", expiring: 12 },
  { month: "Mar", expiring: 5 },
  { month: "Apr", expiring: 15 },
  { month: "May", expiring: 22 },
  { month: "Jun", expiring: 18 },
  { month: "Jul", expiring: 10 },
  { month: "Aug", expiring: 7 },
  { month: "Sep", expiring: 14 },
  { month: "Oct", expiring: 9 },
  { month: "Nov", expiring: 11 },
  { month: "Dec", expiring: 6 },
];

const utilizationData = [
  { month: "Jan", rate: 82 },
  { month: "Feb", rate: 85 },
  { month: "Mar", rate: 79 },
  { month: "Apr", rate: 88 },
  { month: "May", rate: 91 },
  { month: "Jun", rate: 87 },
];

const statusDistribution = [
  { name: "Assigned", value: 1923, color: "hsl(215 70% 45%)" },
  { name: "Available", value: 389, color: "hsl(152 60% 40%)" },
  { name: "In Maintenance", value: 147, color: "hsl(38 92% 50%)" },
  { name: "Retired", value: 388, color: "hsl(220 10% 46%)" },
];

const ageDistribution = [
  { age: "< 1 yr", count: 420 },
  { age: "1-2 yrs", count: 680 },
  { age: "2-3 yrs", count: 520 },
  { age: "3-5 yrs", count: 380 },
  { age: "5+ yrs", count: 250 },
];

const warrantyAlerts = [
  { asset: "MacBook Pro 14\" (AST-022)", expires: "2025-03-15", days: 26 },
  { asset: "Dell Latitude 5520 (AST-089)", expires: "2025-03-20", days: 31 },
  { asset: "HP ProLiant (AST-004)", expires: "2025-04-10", days: 52 },
  { asset: "Cisco Switch (AST-112)", expires: "2025-04-25", days: 67 },
  { asset: "Surface Pro 9 (AST-145)", expires: "2025-05-01", days: 73 },
];

const ReportsPage = () => {
  const [period, setPeriod] = useState("year");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="page-header mb-0">
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Asset insights, trends, and performance metrics</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Row */}
      <div className="grid gap-4 sm:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
          <div className="flex items-center gap-2 mb-2"><Monitor className="h-4 w-4 text-primary" /><span className="text-xs text-muted-foreground">Total Asset Value</span></div>
          <p className="text-2xl font-bold text-foreground">$1.74M</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="stat-card">
          <div className="flex items-center gap-2 mb-2"><TrendingUp className="h-4 w-4 text-success" /><span className="text-xs text-muted-foreground">Utilization Rate</span></div>
          <p className="text-2xl font-bold text-foreground">87.3%</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card">
          <div className="flex items-center gap-2 mb-2"><AlertTriangle className="h-4 w-4 text-warning" /><span className="text-xs text-muted-foreground">Warranty Alerts</span></div>
          <p className="text-2xl font-bold text-foreground">47</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="stat-card">
          <div className="flex items-center gap-2 mb-2"><DollarSign className="h-4 w-4 text-accent" /><span className="text-xs text-muted-foreground">Avg. Asset Cost</span></div>
          <p className="text-2xl font-bold text-foreground">$612</p>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="table-container p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Assets by Department</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={assetsByDept} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <YAxis dataKey="dept" type="category" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" width={80} />
              <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px", border: "1px solid hsl(220 13% 90%)" }} />
              <Bar dataKey="count" fill="hsl(215 70% 45%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="table-container p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Asset Status Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {statusDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {statusDistribution.map(item => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="ml-auto font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="table-container p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Warranty Expiry Forecast</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={warrantyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
              <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="expiring" stroke="hsl(38 92% 50%)" fill="hsl(38 92% 50% / 0.15)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="table-container p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Utilization Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
              <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
              <Line type="monotone" dataKey="rate" stroke="hsl(172 66% 40%)" strokeWidth={2} dot={{ fill: "hsl(172 66% 40%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="table-container p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Asset Age Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
              <XAxis dataKey="age" tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
              <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="count" fill="hsl(280 60% 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Warranty Alerts Table */}
      <div className="table-container p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          Upcoming Warranty Expirations
        </h3>
        <div className="space-y-2">
          {warrantyAlerts.map((item, i) => (
            <div key={i} className="flex items-center justify-between rounded-md border px-4 py-3">
              <div className="flex items-center gap-3">
                <Monitor className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{item.asset}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />{item.expires}</span>
                <span className={`text-xs font-medium ${item.days <= 30 ? "text-destructive" : item.days <= 60 ? "text-warning" : "text-muted-foreground"}`}>
                  {item.days} days
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
