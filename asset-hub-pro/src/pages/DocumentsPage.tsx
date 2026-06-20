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
  Search,
  Upload,
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  Download,
  Eye,
  Trash2,
  MoreHorizontal,
  CloudUpload,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  assetId?: string;
  category: string;
}

const documents: Document[] = [
  { id: "DOC-001", name: "MacBook_Pro_Invoice.pdf", type: "PDF", size: "2.4 MB", uploadedBy: "Alex Morgan", uploadDate: "2024-01-15", assetId: "AST-001", category: "Invoice" },
  { id: "DOC-002", name: "Warranty_Certificate_Dell.pdf", type: "PDF", size: "1.1 MB", uploadedBy: "Jordan Lee", uploadDate: "2024-02-20", assetId: "AST-002", category: "Warranty" },
  { id: "DOC-003", name: "Asset_Inventory_Q1_2024.xlsx", type: "Excel", size: "856 KB", uploadedBy: "Alex Morgan", uploadDate: "2024-04-01", category: "Report" },
  { id: "DOC-004", name: "Server_Setup_Guide.pdf", type: "PDF", size: "5.2 MB", uploadedBy: "Jordan Lee", uploadDate: "2024-03-10", assetId: "AST-004", category: "Manual" },
  { id: "DOC-005", name: "Network_Diagram.png", type: "Image", size: "3.8 MB", uploadedBy: "Alex Morgan", uploadDate: "2024-05-15", category: "Diagram" },
  { id: "DOC-006", name: "Insurance_Policy_2024.pdf", type: "PDF", size: "4.1 MB", uploadedBy: "Alex Morgan", uploadDate: "2024-01-05", category: "Insurance" },
  { id: "DOC-007", name: "Disposal_Certificate_AST007.pdf", type: "PDF", size: "890 KB", uploadedBy: "Jordan Lee", uploadDate: "2024-06-20", assetId: "AST-007", category: "Disposal" },
  { id: "DOC-008", name: "License_Agreement_Software.pdf", type: "PDF", size: "1.5 MB", uploadedBy: "Alex Morgan", uploadDate: "2024-07-01", category: "License" },
];

const fileIcons: Record<string, any> = {
  PDF: FileText,
  Excel: FileSpreadsheet,
  Image: FileImage,
};

const categoryColors: Record<string, string> = {
  Invoice: "bg-primary/10 text-primary border-primary/20",
  Warranty: "bg-warning/10 text-warning border-warning/20",
  Report: "bg-info/10 text-info border-info/20",
  Manual: "bg-accent/10 text-accent border-accent/20",
  Diagram: "bg-muted text-muted-foreground border-border",
  Insurance: "bg-success/10 text-success border-success/20",
  Disposal: "bg-destructive/10 text-destructive border-destructive/20",
  License: "bg-primary/10 text-primary border-primary/20",
};

const DocumentsPage = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showUpload, setShowUpload] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const categories = [...new Set(documents.map(d => d.category))];

  const filtered = documents.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "all" || d.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleUpload = () => {
    setShowUpload(false);
    toast({ title: "Upload Complete", description: "Document has been uploaded successfully to cloud storage." });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="page-header mb-0">
          <h1 className="page-title">Documents</h1>
          <p className="page-subtitle">Upload and manage asset-related documents</p>
        </div>
        <Button onClick={() => setShowUpload(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="stat-card">
          <p className="text-2xl font-bold text-foreground">{documents.length}</p>
          <p className="text-xs text-muted-foreground">Total Documents</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-foreground">{documents.filter(d => d.type === "PDF").length}</p>
          <p className="text-xs text-muted-foreground">PDFs</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-foreground">{documents.filter(d => d.assetId).length}</p>
          <p className="text-xs text-muted-foreground">Asset-Linked</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-foreground">24.8 MB</p>
          <p className="text-xs text-muted-foreground">Total Storage</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search documents..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Documents Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((doc, i) => {
          const FileIcon = fileIcons[doc.type] || File;
          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group rounded-lg border bg-card p-4 shadow-card hover:shadow-elevated transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={`text-[10px] ${categoryColors[doc.category]}`}>{doc.category}</Badge>
                    <span className="text-xs text-muted-foreground">{doc.size}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Eye className="mr-2 h-3.5 w-3.5" />Preview</DropdownMenuItem>
                    <DropdownMenuItem><Download className="mr-2 h-3.5 w-3.5" />Download</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-3.5 w-3.5" />Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{doc.uploadedBy}</span>
                <span>{doc.uploadDate}</span>
              </div>
              {doc.assetId && (
                <div className="mt-2 rounded bg-muted/50 px-2 py-1 text-xs text-muted-foreground">
                  Linked to {doc.assetId}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Upload Dialog */}
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Upload Document</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div
              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${dragActive ? "border-primary bg-primary/5" : "border-border"}`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
            >
              <CloudUpload className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-foreground">Drop files here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, XLSX, PNG, JPG up to 25MB</p>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select category..." /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Link to Asset (optional)</Label>
              <Input placeholder="e.g. AST-001" />
            </div>
          </div>
          <DialogFooter><Button onClick={handleUpload}>Upload</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentsPage;
