import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Monitor,
  Calendar,
  DollarSign,
  Shield,
  User,
  FileText,
  Clock,
  MapPin,
  Tag,
  Pencil,
  ArrowLeftRight,
} from "lucide-react";

const assetData: Record<string, any> = {
  "AST-001": {
    id: "AST-001", name: 'MacBook Pro 16" M3', type: "Laptop", brand: "Apple", model: "MacBook Pro 16-inch",
    serial: "C02ZX1ABCDEF", status: "Assigned", assignee: "Sarah Chen", assigneeId: "EMP-001",
    purchaseDate: "2024-01-15", warranty: "2027-01-15", value: "$3,499", location: "San Francisco HQ",
    condition: "Excellent", notes: "Top-spec configuration with 36GB RAM, 1TB SSD",
    specs: { processor: "Apple M3 Max", ram: "36 GB", storage: "1 TB SSD", display: "16.2\" Liquid Retina XDR" },
    timeline: [
      { date: "2024-01-15", event: "Purchased", detail: "Procured from Apple Business Store" },
      { date: "2024-01-18", event: "Registered", detail: "Added to asset inventory" },
      { date: "2024-01-20", event: "Configured", detail: "IT setup and software installation" },
      { date: "2024-01-22", event: "Assigned", detail: "Assigned to Sarah Chen (Engineering)" },
    ],
    documents: [
      { name: "MacBook_Pro_Invoice.pdf", type: "Invoice", date: "2024-01-15" },
      { name: "Apple_Warranty_Certificate.pdf", type: "Warranty", date: "2024-01-15" },
    ],
  },
};

const statusColors: Record<string, string> = {
  Assigned: "bg-primary/10 text-primary border-primary/20",
  Available: "bg-success/10 text-success border-success/20",
  "In Maintenance": "bg-warning/10 text-warning border-warning/20",
  Retired: "bg-muted text-muted-foreground border-border",
};

const AssetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const asset = assetData[id || "AST-001"] || assetData["AST-001"];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/assets")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="page-title">{asset.name}</h1>
            <Badge variant="outline" className={statusColors[asset.status]}>{asset.status}</Badge>
          </div>
          <p className="page-subtitle">{asset.id} · {asset.brand} · {asset.serial}</p>
        </div>
        <Button variant="outline"><Pencil className="mr-2 h-4 w-4" />Edit</Button>
      </div>

      {/* Quick Info Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="stat-card flex items-center gap-3">
          <DollarSign className="h-5 w-5 text-primary" />
          <div><p className="text-xs text-muted-foreground">Value</p><p className="text-lg font-bold text-foreground">{asset.value}</p></div>
        </div>
        <div className="stat-card flex items-center gap-3">
          <Calendar className="h-5 w-5 text-accent" />
          <div><p className="text-xs text-muted-foreground">Purchase Date</p><p className="text-lg font-bold text-foreground">{asset.purchaseDate}</p></div>
        </div>
        <div className="stat-card flex items-center gap-3">
          <Shield className="h-5 w-5 text-warning" />
          <div><p className="text-xs text-muted-foreground">Warranty Until</p><p className="text-lg font-bold text-foreground">{asset.warranty}</p></div>
        </div>
        <div className="stat-card flex items-center gap-3">
          <User className="h-5 w-5 text-success" />
          <div><p className="text-xs text-muted-foreground">Assigned To</p><p className="text-lg font-bold text-foreground">{asset.assignee || "—"}</p></div>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="timeline">Lifecycle</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="table-container p-5 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">General Information</h3>
              {[
                { icon: Tag, label: "Type", value: asset.type },
                { icon: Monitor, label: "Brand / Model", value: `${asset.brand} ${asset.model}` },
                { icon: MapPin, label: "Location", value: asset.location },
                { icon: Shield, label: "Condition", value: asset.condition },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground w-28">{item.label}</span>
                  <span className="font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="table-container p-5 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Specifications</h3>
              {Object.entries(asset.specs).map(([key, val]) => (
                <div key={key} className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground w-28 capitalize">{key}</span>
                  <span className="font-medium text-foreground">{val as string}</span>
                </div>
              ))}
            </div>
          </div>
          {asset.notes && (
            <div className="table-container p-5">
              <h3 className="text-sm font-semibold text-foreground mb-2">Notes</h3>
              <p className="text-sm text-muted-foreground">{asset.notes}</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="timeline" className="space-y-0">
          <div className="table-container p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Asset Lifecycle</h3>
            <div className="relative pl-6">
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
              {asset.timeline.map((event: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pb-6 last:pb-0"
                >
                  <div className="absolute -left-[13px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                  <div className="ml-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{event.event}</span>
                      <span className="text-xs text-muted-foreground">{event.date}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{event.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-3">
          {asset.documents.map((doc: any, i: number) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-card">
              <FileText className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.type} · {doc.date}</p>
              </div>
              <Button variant="outline" size="sm">Download</Button>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssetDetailPage;
