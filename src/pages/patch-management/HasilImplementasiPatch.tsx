import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

const HasilImplementasiPatch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const results = [
    {
      id: "PCH-010",
      scope: "DINKES - Windows Fleet (Batch Upgrade)",
      assetId: "AST-9101",
      implementationDate: "2025-01-15",
      status: "Partially Failed",
    },
    {
      id: "PCH-011",
      scope: "DISPENDUK - Database Update",
      assetId: "AST-7890",
      implementationDate: "2025-01-10",
      status: "Succeeded",
    },
    {
      id: "PCH-012",
      scope: "DISKOMINFO - Security Patch",
      assetId: "AST-4521",
      implementationDate: "2025-01-08",
      status: "Failed",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      Succeeded: "bg-green-100 text-green-800",
      "Partially Failed": "bg-red-100 text-red-800",
      Failed: "bg-red-200 text-red-900",
    };
    return statusStyles[status] || "bg-muted text-muted-foreground";
  };

  const filteredResults = results.filter((result) => {
    const matchesSearch =
      result.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.scope.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || result.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Implementation Results</h1>

      <Card>
        <CardContent className="p-0">
          {/* Search and Filter Row */}
          <div className="flex items-center gap-4 p-4 border-b border-border">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID or Scope..."
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
                <SelectItem value="Succeeded">Succeeded</SelectItem>
                <SelectItem value="Partially Failed">Partially Failed</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-3 text-left font-semibold text-sm">Patch ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Scope</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Implementation Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result) => (
                  <tr key={result.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-4 text-foreground font-medium text-sm">{result.id}</td>
                    <td className="px-4 py-4 text-sm">
                      <div className="text-foreground">{result.scope}</div>
                      <div className="text-muted-foreground text-xs">{result.assetId}</div>
                    </td>
                    <td className="px-4 py-4 text-foreground text-sm">{result.implementationDate}</td>
                    <td className="px-4 py-4 text-sm">
                      <Badge className={getStatusBadge(result.status)}>{result.status}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="text-primary cursor-pointer hover:underline text-sm"
                        onClick={() => navigate(`/patch-management/hasil-implementasi/${result.id}`)}
                      >
                        Detail
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredResults.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      No results found
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

export default HasilImplementasiPatch;
