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
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Monitor,
  Smartphone,
  Server,
  Keyboard,
  Tv,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const assets = [
  { id: "AST-001", name: "MacBook Pro 16\" M3", type: "Laptop", status: "Assigned", assignee: "Sarah Chen", purchaseDate: "2024-01-15", warranty: "2027-01-15", value: "$3,499" },
  { id: "AST-002", name: "Dell UltraSharp 27\"", type: "Monitor", status: "Available", assignee: "—", purchaseDate: "2023-06-20", warranty: "2026-06-20", value: "$599" },
  { id: "AST-003", name: "iPhone 15 Pro", type: "Phone", status: "Assigned", assignee: "Mike Ross", purchaseDate: "2024-03-01", warranty: "2026-03-01", value: "$1,199" },
  { id: "AST-004", name: "HP ProLiant DL380", type: "Server", status: "In Maintenance", assignee: "—", purchaseDate: "2022-08-10", warranty: "2025-08-10", value: "$8,299" },
  { id: "AST-005", name: "Logitech MX Master 3S", type: "Peripheral", status: "Available", assignee: "—", purchaseDate: "2024-02-28", warranty: "2026-02-28", value: "$99" },
  { id: "AST-006", name: "ThinkPad X1 Carbon", type: "Laptop", status: "Assigned", assignee: "Lisa Park", purchaseDate: "2023-11-05", warranty: "2026-11-05", value: "$2,149" },
  { id: "AST-007", name: "Samsung Galaxy Tab S9", type: "Phone", status: "Retired", assignee: "—", purchaseDate: "2021-09-15", warranty: "2023-09-15", value: "$849" },
  { id: "AST-008", name: "Cisco Catalyst 9200", type: "Server", status: "Assigned", assignee: "Network Team", purchaseDate: "2023-04-22", warranty: "2028-04-22", value: "$4,500" },
];

const statusColors: Record<string, string> = {
  Assigned: "bg-primary/10 text-primary border-primary/20",
  Available: "bg-success/10 text-success border-success/20",
  "In Maintenance": "bg-warning/10 text-warning border-warning/20",
  Retired: "bg-muted text-muted-foreground border-border",
};

const typeIcons: Record<string, any> = {
  Laptop: Monitor,
  Monitor: Tv,
  Phone: Smartphone,
  Server: Server,
  Peripheral: Keyboard,
};

const AssetsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = assets.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    const matchesType = typeFilter === "all" || a.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="page-header mb-0">
          <h1 className="page-title">Assets</h1>
          <p className="page-subtitle">Manage your organization's IT assets</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Asset
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
        <div className="relative flex-1 sm:min-w-[240px] sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Assigned">Assigned</SelectItem>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="In Maintenance">In Maintenance</SelectItem>
            <SelectItem value="Retired">Retired</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Laptop">Laptop</SelectItem>
            <SelectItem value="Monitor">Monitor</SelectItem>
            <SelectItem value="Phone">Phone</SelectItem>
            <SelectItem value="Server">Server</SelectItem>
            <SelectItem value="Peripheral">Peripheral</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] hidden md:table-cell">ID</TableHead>
              <TableHead>Asset Name</TableHead>
              <TableHead className="hidden lg:table-cell">Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Assigned To</TableHead>
              <TableHead className="hidden xl:table-cell">Warranty Until</TableHead>
              <TableHead className="hidden sm:table-cell">Value</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((asset, i) => {
              const TypeIcon = typeIcons[asset.type] || Monitor;
              return (
                <motion.tr
                  key={asset.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <TableCell className="font-mono text-xs text-muted-foreground hidden md:table-cell">{asset.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                        <TypeIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium text-foreground block truncate">{asset.name}</span>
                        <span className="text-xs text-muted-foreground md:hidden">{asset.id} · {asset.type}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden lg:table-cell">{asset.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[asset.status]}>
                      {asset.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">{asset.assignee}</TableCell>
                  <TableCell className="text-muted-foreground text-sm hidden xl:table-cell">{asset.warranty}</TableCell>
                  <TableCell className="font-medium text-foreground hidden sm:table-cell">{asset.value}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Asset</DropdownMenuItem>
                        <DropdownMenuItem>Assign</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Retire Asset</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Monitor className="h-10 w-10 mb-3 opacity-40" />
            <p className="text-sm font-medium">No assets found</p>
            <p className="text-xs">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetsPage;
