import TableWithSearch from "@/components/TableWithSearch";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const ChangeRequest = () => {
  const navigate = useNavigate();

  const statusFilterOptions = [
    { value: "all", label: "All Status" },
    { value: "Submitted", label: "Submitted" },
    { value: "Reviewed", label: "Reviewed" },
    { value: "Revision", label: "Revision" },
    { value: "Approved", label: "Approved" },
    { value: "Scheduled", label: "Scheduled" },
    { value: "Implementing", label: "Implementing" },
    { value: "Completed", label: "Completed" },
    { value: "End", label: "End" },
  ];

  const changes = [
    {
      id: "CR-001",
      catalog: "Infrastructure",
      subCatalog: "Server",
      name: "Update Server Configuration",
      status: "Approved",
      score: 87,
      receivedDate: "2025-01-15",
    },
    {
      id: "CR-002",
      catalog: "Network",
      subCatalog: "Switch",
      name: "Network Switch Upgrade",
      status: "Scheduled",
      score: 75,
      receivedDate: "2025-01-18",
    },
    {
      id: "CR-003",
      catalog: "Application",
      subCatalog: "Web Service",
      name: "Deploy New Application",
      status: "Implementing",
      score: 92,
      receivedDate: "2025-01-20",
    },
    {
      id: "CR-004",
      catalog: "Database",
      subCatalog: "PostgreSQL",
      name: "Database Migration & Optimization",
      status: "Submitted",
      score: 65,
      receivedDate: "2025-01-22",
    },
  ];

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      Submitted: "bg-blue-100 text-blue-800",
      Reviewed: "bg-purple-100 text-purple-800",
      Revision: "bg-red-100 text-red-800",
      Approved: "bg-green-100 text-green-800",
      Scheduled: "bg-cyan-100 text-cyan-800",
      Implementing: "bg-orange-100 text-orange-800",
      Completed: "bg-emerald-100 text-emerald-800",
      Failed: "bg-red-200 text-red-900",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600 font-bold";
    if (score >= 60) return "text-orange-600 font-bold";
    if (score >= 40) return "text-yellow-600 font-bold";
    return "text-green-600 font-bold";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Change Requests</h1>

      <TableWithSearch searchPlaceholder="Search reports..." filterOptions={statusFilterOptions}>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="w-[100px] px-4 py-4 text-left font-semibold text-sm">CR ID</th>
                <th className="w-[120px] px-4 py-4 text-left font-semibold text-sm">Catalog</th>
                <th className="w-[120px] px-4 py-4 text-left font-semibold text-sm">Sub Catalog</th>
                <th className="w-auto px-4 py-4 text-left font-semibold text-sm">Asset Name</th>
                <th className="w-[120px] px-4 py-4 text-left font-semibold text-sm">Status</th>
                <th className="w-[80px] px-4 py-4 text-center font-semibold text-sm">Score</th>
                <th className="w-[140px] px-4 py-4 text-left font-semibold text-sm">Received Date</th>
                <th className="w-[60px] px-4 py-4 text-center font-semibold text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {changes.map((change) => (
                <tr key={change.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-4 py-4 text-foreground font-medium text-sm">{change.id}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{change.catalog}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{change.subCatalog}</td>
                  <td className="px-4 py-4 text-foreground text-sm truncate">{change.name}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(change.status)}`}>
                      {change.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-base ${getScoreColor(change.score)}`}>
                      {change.score}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-foreground text-sm">{change.receivedDate}</td>
                  <td className="px-4 py-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem
                          onClick={() => navigate(`/change-management/change-request/${change.id}`)}
                          className="cursor-pointer hover:bg-muted"
                        >
                          Detail
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableWithSearch>
    </div>
  );
};

export default ChangeRequest;
