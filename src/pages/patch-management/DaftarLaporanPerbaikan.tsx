import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { api } from "@/lib/http";

/* ======================
   Types dari BE
====================== */
type PatchJob = {
  job_id: string;
  title: string;
  scope_asset: string | null;
  patch_version: string | null;
  dinas: string | null;
  start_date: string | null;
  schedule_at: string | null;
  status: string;
  reference_asset_id: string | null;
};

const DaftarLaporanPerbaikan = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [patches, setPatches] = useState<PatchJob[]>([]);
  const [loading, setLoading] = useState(true);

  /* ======================
     Fetch Data
  ====================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api<any>("/patch-jobs");
        setPatches(res.data ?? []);
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* ======================
     Helpers
  ====================== */
  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      Created: "bg-blue-100 text-blue-800",
      Assigned: "bg-yellow-100 text-yellow-800",
      Staged: "bg-purple-100 text-purple-800",
      Deploying: "bg-orange-100 text-orange-800",
      Succeeded: "bg-green-100 text-green-800",
      Failed: "bg-red-100 text-red-800",
      "Partially Failed": "bg-pink-100 text-pink-800",
    };
    return statusStyles[status] || "bg-muted text-muted-foreground";
  };

  /* ======================
     Mapping Data BE → UI
  ====================== */
  const mappedPatches = patches.map((p) => ({
    id: p.job_id,
    scope: p.scope_asset || p.title || "-",
    assetId: p.reference_asset_id || "-",
    version: p.patch_version || "-",
    dinas: p.dinas || "-",
    implementationDate:
      p.start_date || (p.schedule_at ? p.schedule_at.slice(0, 10) : "-"),
    status: p.status,
  }));

  const filteredPatches = mappedPatches.filter((patch) => {
    const safe = (val: string | null | undefined) =>
      (val ?? "").toString().toLowerCase();

    const matchesSearch =
      safe(patch.id).includes(searchQuery.toLowerCase()) ||
      safe(patch.scope).includes(searchQuery.toLowerCase()) ||
      safe(patch.dinas).includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || patch.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Patch Job</h1>

      <Card>
        <CardContent className="p-0">
          {/* Search & Filter */}
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
              <SelectTrigger className="w-[200px] bg-background border-border">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-50">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Created">Created</SelectItem>
                <SelectItem value="Assigned">Assigned</SelectItem>
                <SelectItem value="Staged">Staged</SelectItem>
                <SelectItem value="Deploying">Deploying</SelectItem>
                <SelectItem value="Succeeded">Succeeded</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Partially Failed">
                  Partially Failed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-3 text-left font-semibold text-sm">
                    Patch ID
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">
                    Scope
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">
                    Version
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">
                    Dinas
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">
                    Implementation Date
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-muted-foreground"
                    >
                      Loading...
                    </td>
                  </tr>
                )}

                {!loading &&
                  filteredPatches.map((patch) => (
                    <tr
                      key={patch.id}
                      className="border-b border-border hover:bg-muted/50"
                    >
                      <td className="px-4 py-4 font-medium text-sm">
                        {patch.id}
                      </td>

                      <td className="px-4 py-4 text-sm">
                        <div>{patch.scope}</div>
                        <div className="text-muted-foreground text-xs">
                          {patch.assetId}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm">{patch.version}</td>
                      <td className="px-4 py-4 text-sm">{patch.dinas}</td>
                      <td className="px-4 py-4 text-sm">
                        {patch.implementationDate}
                      </td>

                      <td className="px-4 py-4 text-sm">
                        <Badge className={getStatusBadge(patch.status)}>
                          {patch.status}
                        </Badge>
                      </td>

                      <td className="px-4 py-4">
                        {patch.status === "Assigned" && (
                          <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md"
                            onClick={() =>
                              navigate(
                                `/patch-management/patch-plan/${patch.id}`
                              )
                            }
                          >
                            Plan (Endpoint + Jadwal)
                          </button>
                        )}

                        {patch.status === "Staged" && (
                          <button
                            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-md"
                            onClick={() =>
                              navigate(
                                `/patch-management/patch-execution/${patch.id}`
                              )
                            }
                          >
                            Execute (Mulai Patch)
                          </button>
                        )}

                        {patch.status === "Deploying" && (
                          <span className="text-orange-600 font-medium text-sm">
                            Deploying...
                          </span>
                        )}

                        {!["Assigned", "Staged", "Deploying"].includes(
                          patch.status
                        ) && (
                          <span className="text-muted-foreground text-sm">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}

                {!loading && filteredPatches.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-muted-foreground"
                    >
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
