import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

const DaftarLaporanPerbaikan = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const patches = [
    {
      id: "PCH-001",
      scope: "DISKOMINFO - DBMS Minor Update",
      assetId: "AST-5555",
      version: "v2.1.0",
      dinas: "DISKOMINFO",
      implementationDate: "2025-01-20",
      status: "Assigned",
    },
    {
      id: "PCH-002",
      scope: "DINKES - Security Patch",
      assetId: "AST-3421",
      version: "v1.5.2",
      dinas: "DINKES",
      implementationDate: "2025-01-22",
      status: "Created",
    },
    {
      id: "PCH-003",
      scope: "DISPENDUK - OS Update",
      assetId: "AST-6782",
      version: "v2.0.0",
      dinas: "DISPENDUK",
      implementationDate: "2025-01-25",
      status: "Staged",
    },
    {
      id: "PCH-004",
      scope: "DISKOMINFO - Firmware Update",
      assetId: "AST-1234",
      version: "v3.0.1",
      dinas: "DISKOMINFO",
      implementationDate: "2025-01-28",
      status: "In Progress",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      Created: "bg-blue-100 text-blue-800",
      Assigned: "bg-yellow-100 text-yellow-800",
      Staged: "bg-purple-100 text-purple-800",
      Scheduled: "bg-indigo-100 text-indigo-800",
      "In Progress": "bg-orange-100 text-orange-800",
    };
    return statusStyles[status] || "bg-muted text-muted-foreground";
  };

  const filteredPatches = patches.filter((patch) => {
    const matchesSearch =
      patch.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patch.scope.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patch.dinas.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || patch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Patch Job</h1>

      <Card>
        <CardContent className="p-0">
          {/* Search and Filter Row */}
          <div className="flex items-center gap-4 p-4 border-b border-border">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, Scope, or Dinas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background border-border"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-background border-border">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-50">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Created">Created</SelectItem>
                <SelectItem value="Assigned">Assigned</SelectItem>
                <SelectItem value="Staged">Staged</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-3 text-left font-semibold text-sm">Patch ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Scope</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Version</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Dinas</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Implementation Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatches.map((patch) => (
                  <tr key={patch.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-4 text-foreground font-medium text-sm">{patch.id}</td>
                    <td className="px-4 py-4 text-sm">
                      <div className="text-foreground">{patch.scope}</div>
                      <div className="text-muted-foreground text-xs">{patch.assetId}</div>
                    </td>
                    <td className="px-4 py-4 text-foreground text-sm">{patch.version}</td>
                    <td className="px-4 py-4 text-foreground text-sm">{patch.dinas}</td>
                    <td className="px-4 py-4 text-foreground text-sm">{patch.implementationDate}</td>
                    <td className="px-4 py-4 text-sm">
                      <Badge className={getStatusBadge(patch.status)}>{patch.status}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="text-primary cursor-pointer hover:underline text-sm"
                        onClick={() => navigate(`/patch-management/repair/${patch.id}`)}
                      >
                        Detail
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredPatches.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                      No patch jobs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DaftarLaporanPerbaikan;
