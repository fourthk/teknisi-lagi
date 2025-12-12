import { useEffect, useState } from "react";
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
import { api } from "@/lib/http";

type ChangeRequest = {
  cr_id: string;
  title: string;
  status: string;
  risk_score: number;
  created_at: string;
  dinas: string;
  type: string;
};

const DaftarLaporanPerubahan = () => {
  const navigate = useNavigate();
  const [changes, setChanges] = useState<ChangeRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const statusFilterOptions = [
    { value: "all", label: "All Status" },
    { value: "SUBMITTED", label: "Submitted" },
    { value: "APPROVED", label: "Approved" },
    { value: "SCHEDULED", label: "Scheduled" },
    { value: "IMPLEMENTED", label: "Implemented" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api<{ success: boolean; data: ChangeRequest[] }>(
          "/change-requests"
        );
        setChanges(res.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      SUBMITTED: "bg-blue-100 text-blue-800",
      APPROVED: "bg-green-100 text-green-800",
      SCHEDULED: "bg-cyan-100 text-cyan-800",
      IMPLEMENTED: "bg-emerald-100 text-emerald-800",
      "NEED APPROVAL": "bg-yellow-100 text-yellow-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600 font-bold";
    if (score >= 60) return "text-orange-600 font-bold";
    if (score >= 40) return "text-yellow-600 font-bold";
    return "text-green-600 font-bold";
  };

  const formatDate = (date: string) => {
    if (!date) return "-";
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">
        Change Requests
      </h1>

      <TableWithSearch
        searchPlaceholder="Search reports..."
        filterOptions={statusFilterOptions}
      >
        {loading ? (
          <div className="text-center py-10 text-muted-foreground">
            Loading...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="w-[100px] px-4 py-4 text-left text-sm font-semibold">
                    CR ID
                  </th>
                  <th className="w-[160px] px-4 py-4 text-left text-sm font-semibold">
                    Dinas
                  </th>
                  <th className="w-auto px-4 py-4 text-left text-sm font-semibold">
                    Asset Name
                  </th>
                  <th className="w-[120px] px-4 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="w-[80px] px-4 py-4 text-center text-sm font-semibold">
                    Score
                  </th>
                  <th className="w-[120px] px-4 py-4 text-left text-sm font-semibold">
                    Type
                  </th>
                  <th className="w-[140px] px-4 py-4 text-left text-sm font-semibold">
                    Received Date
                  </th>
                  <th className="w-[60px] px-4 py-4 text-center text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {changes.map((item) => (
                  <tr
                    key={item.cr_id}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    {/* CR ID */}
                    <td className="px-4 py-4 text-sm font-medium text-foreground">
                      {item.tiket_id || item.cr_id}
                    </td>

                    {/* Dinas */}
                    <td className="px-4 py-4 text-sm text-foreground">
                      {item.dinas || "-"}
                    </td>

                    {/* Asset Name */}
                    <td className="px-4 py-4 text-sm text-foreground truncate">
                      {item.title || "-"}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Score */}
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`text-base ${getScoreColor(
                          item.risk_score ?? 0
                        )}`}
                      >
                        {item.risk_score ?? 0}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-4 text-sm text-foreground capitalize">
                      {item.type || "-"}
                    </td>

                    {/* Received Date */}
                    <td className="px-4 py-4 text-sm text-foreground">
                      {formatDate(item.created_at)}
                    </td>

                    {/* Action */}
                    <td className="px-4 py-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-muted"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-card border-border"
                        >
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(
                                `/change-management/detail/${item.cr_id}`
                              )
                            }
                            className="cursor-pointer hover:bg-muted"
                          >
                            Detail
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}

                {changes.length === 0 && !loading && (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-10 text-muted-foreground"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </TableWithSearch>
    </div>
  );
};

export default DaftarLaporanPerubahan;
