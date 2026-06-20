import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  MoreHorizontal,
  User,
  Mail,
  Building2,
  Monitor,
  Phone,
  MapPin,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const employees = [
  { id: "EMP-001", name: "Sarah Chen", email: "sarah.chen@company.com", department: "Engineering", role: "Senior Developer", location: "San Francisco", status: "Active", assetsCount: 4, phone: "+1 (555) 123-4567" },
  { id: "EMP-002", name: "Mike Ross", email: "mike.ross@company.com", department: "Marketing", role: "Marketing Manager", location: "New York", status: "Active", assetsCount: 2, phone: "+1 (555) 234-5678" },
  { id: "EMP-003", name: "Lisa Park", email: "lisa.park@company.com", department: "Design", role: "UX Designer", location: "Austin", status: "Active", assetsCount: 3, phone: "+1 (555) 345-6789" },
  { id: "EMP-004", name: "Tom Hardy", email: "tom.hardy@company.com", department: "Engineering", role: "DevOps Engineer", location: "Seattle", status: "Active", assetsCount: 5, phone: "+1 (555) 456-7890" },
  { id: "EMP-005", name: "Nina Patel", email: "nina.patel@company.com", department: "HR", role: "HR Manager", location: "San Francisco", status: "Active", assetsCount: 2, phone: "+1 (555) 567-8901" },
  { id: "EMP-006", name: "James Wilson", email: "james.wilson@company.com", department: "Finance", role: "Financial Analyst", location: "Chicago", status: "On Leave", assetsCount: 1, phone: "+1 (555) 678-9012" },
  { id: "EMP-007", name: "Emily Davis", email: "emily.davis@company.com", department: "Engineering", role: "Frontend Developer", location: "Remote", status: "Active", assetsCount: 3, phone: "+1 (555) 789-0123" },
  { id: "EMP-008", name: "Robert Kim", email: "robert.kim@company.com", department: "Sales", role: "Account Executive", location: "Boston", status: "Inactive", assetsCount: 0, phone: "+1 (555) 890-1234" },
];

const employeeAssets: Record<string, { name: string; type: string; id: string }[]> = {
  "EMP-001": [
    { name: 'MacBook Pro 16" M3', type: "Laptop", id: "AST-001" },
    { name: "Dell UltraSharp 27\"", type: "Monitor", id: "AST-012" },
    { name: "Logitech MX Master 3S", type: "Peripheral", id: "AST-045" },
    { name: "iPhone 15 Pro", type: "Phone", id: "AST-078" },
  ],
  "EMP-002": [
    { name: "ThinkPad X1 Carbon", type: "Laptop", id: "AST-006" },
    { name: "Samsung Galaxy S24", type: "Phone", id: "AST-090" },
  ],
  "EMP-003": [
    { name: 'MacBook Pro 14" M3', type: "Laptop", id: "AST-015" },
    { name: "iPad Pro 12.9\"", type: "Tablet", id: "AST-052" },
    { name: "Apple Pencil 2", type: "Peripheral", id: "AST-060" },
  ],
};

const statusColors: Record<string, string> = {
  Active: "bg-success/10 text-success border-success/20",
  "On Leave": "bg-warning/10 text-warning border-warning/20",
  Inactive: "bg-muted text-muted-foreground border-border",
};

const EmployeeProfile = ({ employee }: { employee: typeof employees[0] }) => {
  const assets = employeeAssets[employee.id] || [];
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
          {employee.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">{employee.name}</h3>
          <p className="text-sm text-muted-foreground">{employee.role}</p>
          <Badge variant="outline" className={`mt-2 ${statusColors[employee.status]}`}>
            {employee.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{employee.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{employee.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{employee.department}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{employee.location}</span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Assigned Assets ({assets.length})</h4>
        {assets.length > 0 ? (
          <div className="space-y-2">
            {assets.map((asset) => (
              <div key={asset.id} className="flex items-center gap-3 rounded-md border bg-muted/30 px-3 py-2.5">
                <Monitor className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{asset.name}</p>
                  <p className="text-xs text-muted-foreground">{asset.id} · {asset.type}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No assets assigned</p>
        )}
      </div>
    </div>
  );
};

const EmployeesPage = () => {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<typeof employees[0] | null>(null);

  const departments = [...new Set(employees.map((e) => e.department))];

  const filtered = employees.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === "all" || e.department === deptFilter;
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="page-header mb-0">
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage employee profiles and assigned assets</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="stat-card">
          <p className="text-2xl font-bold text-foreground">{employees.length}</p>
          <p className="text-xs text-muted-foreground">Total Employees</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-foreground">{employees.filter(e => e.status === "Active").length}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-foreground">{employees.reduce((sum, e) => sum + e.assetsCount, 0)}</p>
          <p className="text-xs text-muted-foreground">Assets Assigned</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-foreground">{departments.length}</p>
          <p className="text-xs text-muted-foreground">Departments</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search employees..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Department" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((d) => (<SelectItem key={d} value={d}>{d}</SelectItem>))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="On Leave">On Leave</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Assets</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((emp, i) => (
              <motion.tr
                key={emp.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setSelectedEmployee(emp)}
              >
                <TableCell className="font-mono text-xs text-muted-foreground">{emp.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {emp.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <span className="font-medium text-foreground">{emp.name}</span>
                      <p className="text-xs text-muted-foreground">{emp.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{emp.department}</TableCell>
                <TableCell className="text-muted-foreground">{emp.role}</TableCell>
                <TableCell className="text-muted-foreground">{emp.location}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[emp.status]}>{emp.status}</Badge>
                </TableCell>
                <TableCell className="text-center font-medium text-foreground">{emp.assetsCount}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedEmployee(emp)}>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Employee</DropdownMenuItem>
                      <DropdownMenuItem>Assign Asset</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Profile Dialog */}
      <Dialog open={!!selectedEmployee} onOpenChange={(open) => !open && setSelectedEmployee(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Employee Profile</DialogTitle>
          </DialogHeader>
          {selectedEmployee && <EmployeeProfile employee={selectedEmployee} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeesPage;
