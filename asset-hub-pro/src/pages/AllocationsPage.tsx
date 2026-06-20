import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowLeftRight,
  Plus,
  Undo2,
  Search,
  CheckCircle2,
  Clock,
  Package,
  User,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Allocation {
  id: string;
  assetName: string;
  assetId: string;
  employeeName: string;
  employeeId: string;
  type: "Assign" | "Return";
  date: string;
  status: "Active" | "Returned" | "Pending";
  notes?: string;
}

const allocations: Allocation[] = [
  { id: "ALC-001", assetName: 'MacBook Pro 16" M3', assetId: "AST-001", employeeName: "Sarah Chen", employeeId: "EMP-001", type: "Assign", date: "2024-01-15", status: "Active" },
  { id: "ALC-002", assetName: "Dell UltraSharp 27\"", assetId: "AST-002", employeeName: "Mike Ross", employeeId: "EMP-002", type: "Return", date: "2024-06-10", status: "Returned", notes: "Employee resigned" },
  { id: "ALC-003", assetName: "iPhone 15 Pro", assetId: "AST-003", employeeName: "Mike Ross", employeeId: "EMP-002", type: "Assign", date: "2024-03-01", status: "Active" },
  { id: "ALC-004", assetName: "ThinkPad X1 Carbon", assetId: "AST-006", employeeName: "Lisa Park", employeeId: "EMP-003", type: "Assign", date: "2023-11-05", status: "Active" },
  { id: "ALC-005", assetName: "HP ProLiant DL380", assetId: "AST-004", employeeName: "Tom Hardy", employeeId: "EMP-004", type: "Return", date: "2024-05-20", status: "Returned", notes: "Server decommissioned" },
  { id: "ALC-006", assetName: "Logitech MX Keys", assetId: "AST-010", employeeName: "Tom Hardy", employeeId: "EMP-004", type: "Assign", date: "2024-07-01", status: "Pending" },
  { id: "ALC-007", assetName: "Samsung Galaxy Tab S9", assetId: "AST-007", employeeName: "Emily Davis", employeeId: "EMP-007", type: "Assign", date: "2024-02-14", status: "Active" },
  { id: "ALC-008", assetName: "iPad Pro 12.9\"", assetId: "AST-052", employeeName: "Nina Patel", employeeId: "EMP-005", type: "Return", date: "2024-08-01", status: "Returned", notes: "Upgraded to newer model" },
];

const statusColors: Record<string, string> = {
  Active: "bg-success/10 text-success border-success/20",
  Returned: "bg-muted text-muted-foreground border-border",
  Pending: "bg-warning/10 text-warning border-warning/20",
};

const typeColors: Record<string, string> = {
  Assign: "bg-primary/10 text-primary border-primary/20",
  Return: "bg-accent/10 text-accent border-accent/20",
};

const AllocationsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const { toast } = useToast();

  const filtered = allocations.filter((a) => {
    const matchesSearch = a.assetName.toLowerCase().includes(search.toLowerCase()) || a.employeeName.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAssign = () => {
    setShowAssignDialog(false);
    toast({ title: "Asset Assigned", description: "The asset has been successfully assigned to the employee." });
  };

  const handleReturn = () => {
    setShowReturnDialog(false);
    toast({ title: "Asset Returned", description: "The asset has been marked as returned." });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="page-header mb-0">
          <h1 className="page-title">Allocations</h1>
          <p className="page-subtitle">Manage asset assignments and returns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowReturnDialog(true)}>
            <Undo2 className="mr-2 h-4 w-4" />
            Return Asset
          </Button>
          <Button onClick={() => setShowAssignDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Assign Asset
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="stat-card">
          <p className="text-2xl font-bold text-foreground">{allocations.length}</p>
          <p className="text-xs text-muted-foreground">Total Allocations</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-success">{allocations.filter(a => a.status === "Active").length}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-warning">{allocations.filter(a => a.status === "Pending").length}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-muted-foreground">{allocations.filter(a => a.status === "Returned").length}</p>
          <p className="text-xs text-muted-foreground">Returned</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search allocations..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Returned">Returned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {filtered.map((allocation, i) => (
          <motion.div
            key={allocation.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex gap-4 rounded-lg border bg-card p-4 shadow-card hover:shadow-elevated transition-all"
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${allocation.type === "Assign" ? "bg-primary/10" : "bg-accent/10"}`}>
              {allocation.type === "Assign" ? <ArrowRight className="h-5 w-5 text-primary" /> : <Undo2 className="h-5 w-5 text-accent" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className={typeColors[allocation.type]}>{allocation.type}</Badge>
                <Badge variant="outline" className={statusColors[allocation.status]}>{allocation.status}</Badge>
                <span className="text-xs text-muted-foreground ml-auto">{allocation.id}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-medium text-foreground">{allocation.assetName}</span>
                <span className="text-muted-foreground">({allocation.assetId})</span>
                <ArrowLeftRight className="h-3 w-3 text-muted-foreground mx-1" />
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-foreground">{allocation.employeeName}</span>
              </div>
              <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{allocation.date}</span>
                {allocation.notes && <span>Note: {allocation.notes}</span>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Assign Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Assign Asset</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Asset</Label>
              <Select><SelectTrigger><SelectValue placeholder="Choose an asset..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="AST-002">Dell UltraSharp 27" (Available)</SelectItem>
                  <SelectItem value="AST-005">Logitech MX Master 3S (Available)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Select Employee</Label>
              <Select><SelectTrigger><SelectValue placeholder="Choose an employee..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="EMP-001">Sarah Chen</SelectItem>
                  <SelectItem value="EMP-002">Mike Ross</SelectItem>
                  <SelectItem value="EMP-003">Lisa Park</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Notes (optional)</Label>
              <Input placeholder="Add allocation notes..." />
            </div>
          </div>
          <DialogFooter><Button onClick={handleAssign}>Assign Asset</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Return Dialog */}
      <Dialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Return Asset</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Active Allocation</Label>
              <Select><SelectTrigger><SelectValue placeholder="Choose allocation..." /></SelectTrigger>
                <SelectContent>
                  {allocations.filter(a => a.status === "Active").map(a => (
                    <SelectItem key={a.id} value={a.id}>{a.assetName} → {a.employeeName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Return Reason</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select reason..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="upgrade">Equipment Upgrade</SelectItem>
                  <SelectItem value="resigned">Employee Resigned</SelectItem>
                  <SelectItem value="maintenance">Maintenance Required</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Condition</Label>
              <Select><SelectTrigger><SelectValue placeholder="Asset condition..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="damaged">Damaged</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter><Button onClick={handleReturn}>Confirm Return</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllocationsPage;
