import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Settings as SettingsIcon,
  Users,
  Bell,
  Shield,
  Database,
  Globe,
  Plus,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const users = [
  { id: "USR-001", name: "Alex Morgan", email: "admin@company.com", role: "ADMIN", status: "Active", lastLogin: "2024-08-15" },
  { id: "USR-002", name: "Jordan Lee", email: "staff@company.com", role: "IT_STAFF", status: "Active", lastLogin: "2024-08-14" },
  { id: "USR-003", name: "Sam Wilson", email: "employee@company.com", role: "EMPLOYEE", status: "Active", lastLogin: "2024-08-10" },
  { id: "USR-004", name: "Chris Taylor", email: "chris@company.com", role: "IT_STAFF", status: "Inactive", lastLogin: "2024-06-20" },
];

const roleColors: Record<string, string> = {
  ADMIN: "bg-destructive/10 text-destructive border-destructive/20",
  IT_STAFF: "bg-primary/10 text-primary border-primary/20",
  EMPLOYEE: "bg-muted text-muted-foreground border-border",
};

const SettingsPage = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: "Settings Saved", description: "Your settings have been updated successfully." });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">System configuration and user management</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="gap-2"><SettingsIcon className="h-3.5 w-3.5" />General</TabsTrigger>
          <TabsTrigger value="users" className="gap-2"><Users className="h-3.5 w-3.5" />Users</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-3.5 w-3.5" />Notifications</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Shield className="h-3.5 w-3.5" />Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="table-container p-6 space-y-6">
            <h3 className="text-sm font-semibold text-foreground">Organization</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Organization Name</Label>
                <Input defaultValue="Acme Corporation" />
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
                <Select defaultValue="tech">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Default Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select defaultValue="pst">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pst">Pacific (PST)</SelectItem>
                    <SelectItem value="est">Eastern (EST)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Separator />
            <h3 className="text-sm font-semibold text-foreground">Asset Configuration</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-foreground">Auto-generate Asset IDs</p><p className="text-xs text-muted-foreground">Automatically assign sequential IDs to new assets</p></div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-foreground">Warranty Expiry Alerts</p><p className="text-xs text-muted-foreground">Send alerts 30 days before warranty expiration</p></div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-foreground">Require Approval for Allocations</p><p className="text-xs text-muted-foreground">Admin approval needed before asset assignment</p></div>
                <Switch />
              </div>
            </div>
            <div className="flex justify-end"><Button onClick={handleSave}>Save Changes</Button></div>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowAddUser(true)}><Plus className="mr-2 h-4 w-4" />Add User</Button>
          </div>
          <div className="table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className={roleColors[user.role]}>{user.role}</Badge></TableCell>
                    <TableCell>
                      <Badge variant="outline" className={user.status === "Active" ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground border-border"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="table-container p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Email Notifications</h3>
            {[
              { label: "Asset Assignment Notifications", desc: "Email employees when assets are assigned" },
              { label: "Warranty Expiry Reminders", desc: "Daily digest of upcoming warranty expirations" },
              { label: "Asset Return Confirmations", desc: "Confirm successful asset returns via email" },
              { label: "Monthly Asset Report", desc: "Send monthly summary report to admins" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div><p className="text-sm font-medium text-foreground">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                <Switch defaultChecked={i < 3} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="table-container p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Authentication</h3>
            {[
              { label: "Two-Factor Authentication", desc: "Require 2FA for all users" },
              { label: "Session Timeout", desc: "Auto-logout after 30 minutes of inactivity" },
              { label: "IP Whitelisting", desc: "Restrict access to specific IP ranges" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div><p className="text-sm font-medium text-foreground">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                <Switch defaultChecked={i === 1} />
              </div>
            ))}
            <Separator />
            <h3 className="text-sm font-semibold text-foreground">API Configuration</h3>
            <div className="space-y-2">
              <Label>API Base URL</Label>
              <Input defaultValue="https://api.company.com/v1" readOnly className="font-mono text-xs" />
            </div>
            <div className="space-y-2">
              <Label>JWT Token Expiry</Label>
              <Select defaultValue="24h">
                <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="8h">8 Hours</SelectItem>
                  <SelectItem value="24h">24 Hours</SelectItem>
                  <SelectItem value="7d">7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Add New User</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>First Name</Label><Input placeholder="John" /></div>
              <div className="space-y-2"><Label>Last Name</Label><Input placeholder="Doe" /></div>
            </div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="john@company.com" /></div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select role..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="IT_STAFF">IT Staff</SelectItem>
                  <SelectItem value="EMPLOYEE">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter><Button onClick={() => { setShowAddUser(false); toast({ title: "User Created", description: "New user account has been created." }); }}>Create User</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPage;
