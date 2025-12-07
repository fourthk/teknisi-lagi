import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const HasilImplementasiPatch = () => {
  const navigate = useNavigate();

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

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Implementation Results</h1>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Completed Patch Jobs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
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
                {results.map((result) => (
                  <tr key={result.id} className="border-b border-border">
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
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HasilImplementasiPatch;
