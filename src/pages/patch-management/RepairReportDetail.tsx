import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const RepairReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data - in real app this would come from API based on status
  const patchJob = {
    patchId: id,
    scope: "DISKOMINFO - DBMS Minor Update",
    assetId: "AST-5555",
    category: "Perangkat Lunak",
    subCategory: "Database Management System",
    dinas: "DISKOMINFO",
    version: { before: "v2.0.0", after: "v2.1.0" },
    estimatedTime: "2 hours",
    lastUpdate: "2025-01-18",
    status: "Created", // Could be: Created, Scheduled, In Progress
  };

  const isReadOnly = patchJob.status === "Scheduled" || patchJob.status === "In Progress";

  const [subCategory, setSubCategory] = useState(patchJob.category);
  const [category, setCategory] = useState(patchJob.subCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [implementationDate, setImplementationDate] = useState<Date>();
  const [notes, setNotes] = useState("");

  const availableAssets = [
    { id: "AST-037", name: "Sistem Informasi Internal - E-Office Pemda v3", category: "Perangkat Lunak", subCategory: "Database Management System" },
    { id: "AST-038", name: "MySQL - MySQL Server 8.0", category: "Perangkat Lunak", subCategory: "Database Management System" },
    { id: "AST-039", name: "PostgreSQL - PostgreSQL 15", category: "Perangkat Lunak", subCategory: "Database Management System" },
    { id: "AST-040", name: "Oracle Database - Oracle Database 19c", category: "Perangkat Lunak", subCategory: "Database Management System" },
    { id: "AST-041", name: "Microsoft SQL Server 2022", category: "Perangkat Lunak", subCategory: "Database Management System" },
  ];

  const filteredAssets = availableAssets.filter((asset) => {
    const matchesSearch =
      asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleSelectAll = () => {
    setSelectedAssets(filteredAssets.map((asset) => asset.id));
  };

  const handleClearChecks = () => {
    setSelectedAssets([]);
  };

  const handleAssetToggle = (assetId: string) => {
    setSelectedAssets((prev) =>
      prev.includes(assetId)
        ? prev.filter((id) => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleSave = () => {
    console.log("Saving patch job:", {
      selectedAssets,
      implementationDate,
      notes,
    });
    navigate(-1);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <ArrowLeft
          className="h-6 w-6 text-foreground cursor-pointer hover:text-muted-foreground transition-colors"
          onClick={() => navigate(-1)}
        />
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {patchJob.scope} <span className="text-primary">({patchJob.assetId})</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            {patchJob.category} • {patchJob.subCategory}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Column 1: Patch Job Summary */}
        <Card className="p-5 bg-card border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Patch Job Summary</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Patch ID</label>
              <p className="text-sm text-foreground mt-0.5">{patchJob.patchId}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Dinas</label>
              <p className="text-sm text-foreground mt-0.5">{patchJob.dinas}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Estimated Time</label>
              <p className="text-sm text-foreground mt-0.5">{patchJob.estimatedTime}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Version (Before → After)</label>
              <p className="text-sm text-foreground mt-0.5">
                {patchJob.version.before} → {patchJob.version.after}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Last Update</label>
              <p className="text-sm text-foreground mt-0.5">{patchJob.lastUpdate}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Scope Asset</label>
              <p className="text-sm text-foreground mt-0.5">{patchJob.scope}</p>
            </div>
          </div>
        </Card>

        {/* Column 2: Choose Endpoints */}
        <Card className="p-5 bg-card border-border lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Plan: Endpoint + Jadwal</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Choose Endpoints (by category)</h3>
              <Button variant="outline" size="sm" disabled={isReadOnly}>
                Reset to scope
              </Button>
            </div>

            {/* Category Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Sub Kategori</label>
                <Select value={subCategory} onValueChange={setSubCategory} disabled={isReadOnly}>
                  <SelectTrigger className="w-full bg-background border-border">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border z-50">
                    <SelectItem value="Perangkat Lunak">Perangkat Lunak</SelectItem>
                    <SelectItem value="Perangkat Keras">Perangkat Keras</SelectItem>
                    <SelectItem value="Jaringan">Jaringan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Jenis Kategori</label>
                <Select value={category} onValueChange={setCategory} disabled={isReadOnly}>
                  <SelectTrigger className="w-full bg-background border-border">
                    <SelectValue placeholder="Select sub-category" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border z-50">
                    <SelectItem value="Database Management System">Database Management System</SelectItem>
                    <SelectItem value="Operating System">Operating System</SelectItem>
                    <SelectItem value="Application Server">Application Server</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Search (optional)</label>
                <div className="relative">
                  <Input
                    placeholder="Cari nama / ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-background border-border"
                    disabled={isReadOnly}
                  />
                </div>
              </div>
            </div>

            {/* Asset Selection Header */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredAssets.length}</span> assets • checked{" "}
                <span className="font-medium text-foreground">{selectedAssets.length}</span>
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSelectAll} disabled={isReadOnly}>
                  Select all visible
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearChecks} disabled={isReadOnly}>
                  Clear checks
                </Button>
                <Button size="sm" disabled={selectedAssets.length === 0 || isReadOnly}>
                  Add selected endpoints
                </Button>
              </div>
            </div>

            {/* Asset List */}
            <div className="border border-border rounded-lg divide-y divide-border max-h-[300px] overflow-y-auto">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="flex items-center gap-3 p-3 hover:bg-muted/50"
                >
                  <Checkbox
                    checked={selectedAssets.includes(asset.id)}
                    onCheckedChange={() => handleAssetToggle(asset.id)}
                    disabled={isReadOnly}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {asset.name} <span className="text-primary">({asset.id})</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {asset.category} • {asset.subCategory}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule Section */}
            <div className="border-t border-border pt-4 mt-4">
              <h3 className="font-medium text-foreground mb-4">Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                    Implementation Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !implementationDate && "text-muted-foreground"
                        )}
                        disabled={isReadOnly}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {implementationDate ? format(implementationDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-background border-border z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={implementationDate}
                        onSelect={setImplementationDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">Notes</label>
                  <Textarea
                    placeholder="Add notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="bg-background border-border resize-none"
                    rows={3}
                    disabled={isReadOnly}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={selectedAssets.length === 0 || !implementationDate || isReadOnly}
              >
                Save Plan (Staged)
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RepairReportDetail;
