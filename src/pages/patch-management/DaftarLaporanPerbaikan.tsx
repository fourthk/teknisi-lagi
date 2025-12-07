import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const DaftarLaporanPerbaikan = () => {
  const navigate = useNavigate();

  const inProgressPatches = [
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
  ];

  const completedPatches = [
    {
      id: "PCH-010",
      scope: "DINKES - Windows Fleet (Batch Upgrade)",
      assetId: "AST-9101",
      version: "v3.0.0",
      dinas: "DINKES",
      implementationDate: "2025-01-15",
      status: "Partially Failed",
    },
    {
      id: "PCH-011",
      scope: "DISPENDUK - Database Update",
      assetId: "AST-7890",
      version: "v2.0.1",
      dinas: "DISPENDUK",
      implementationDate: "2025-01-10",
      status: "Succeeded",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      Created: "bg-blue-100 text-blue-800",
      Assigned: "bg-yellow-100 text-yellow-800",
      Staged: "bg-purple-100 text-purple-800",
      Deploying: "bg-orange-100 text-orange-800",
      Succeeded: "bg-green-100 text-green-800",
      "Partially Failed": "bg-red-100 text-red-800",
      Failed: "bg-red-200 text-red-900",
    };
    return statusStyles[status] || "bg-muted text-muted-foreground";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Patch Log</h1>

      {/* In Progress Section */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">In Progress</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-3 text-left font-semibold text-sm">Job ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Reference Asset</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Version</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Dinas</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Implementation Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {inProgressPatches.map((patch) => (
                  <tr key={patch.id} className="border-b border-border">
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
                      <Button
                        size="sm"
                        onClick={() => navigate(`/patch-management/repair/${patch.id}`)}
                      >
                        Plan (Endpoint + Jadwal)
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Completed Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Completed</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-3 text-left font-semibold text-sm">Job ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Reference Asset</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Version</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Dinas</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Implementation Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {completedPatches.map((patch) => (
                  <tr key={patch.id} className="border-b border-border">
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
                        onClick={() => navigate(`/patch-management/hasil-implementasi/${patch.id}`)}
                      >
                        Done
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DaftarLaporanPerbaikan;
