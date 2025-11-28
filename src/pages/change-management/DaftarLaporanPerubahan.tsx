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

const DaftarLaporanPerubahan = () => {
  const navigate = useNavigate();

  const statusFilterOptions = [
    { value: "all", label: "Semua Status" },
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
      katalog: "Infrastructure",
      subKatalog: "Server",
      nama: "Update Server Configuration",
      status: "Approved",
      skor: 87,
      tanggalDiterima: "2025-01-15",
    },
    {
      id: "CR-002",
      katalog: "Network",
      subKatalog: "Switch",
      nama: "Network Switch Upgrade",
      status: "Scheduled",
      skor: 75,
      tanggalDiterima: "2025-01-18",
    },
    {
      id: "CR-003",
      katalog: "Application",
      subKatalog: "Web Service",
      nama: "Deploy New Application",
      status: "Implementing",
      skor: 92,
      tanggalDiterima: "2025-01-20",
    },
    {
      id: "CR-004",
      katalog: "Database",
      subKatalog: "PostgreSQL",
      nama: "Database Migration & Optimization",
      status: "Submitted",
      skor: 65,
      tanggalDiterima: "2025-01-22",
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

  const getScoreColor = (skor: number) => {
    if (skor >= 80) return "text-red-600 font-bold";
    if (skor >= 60) return "text-orange-600 font-bold";
    if (skor >= 40) return "text-yellow-600 font-bold";
    return "text-green-600 font-bold";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Daftar Laporan Perubahan</h1>

      <TableWithSearch searchPlaceholder="Cari laporan..." filterOptions={statusFilterOptions}>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="w-[100px] px-4 py-4 text-left font-semibold text-sm">CR ID</th>
                <th className="w-[120px] px-4 py-4 text-left font-semibold text-sm">Katalog</th>
                <th className="w-[120px] px-4 py-4 text-left font-semibold text-sm">Sub Katalog</th>
                <th className="w-auto px-4 py-4 text-left font-semibold text-sm">Nama Aset</th>
                <th className="w-[120px] px-4 py-4 text-left font-semibold text-sm">Status</th>
                <th className="w-[80px] px-4 py-4 text-center font-semibold text-sm">Skor</th>
                <th className="w-[140px] px-4 py-4 text-left font-semibold text-sm">Tanggal Diterima</th>
                <th className="w-[60px] px-4 py-4 text-center font-semibold text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {changes.map((change) => (
                <tr key={change.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-4 py-4 text-foreground font-medium text-sm">{change.id}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{change.katalog}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{change.subKatalog}</td>
                  <td className="px-4 py-4 text-foreground text-sm truncate">{change.nama}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(change.status)}`}>
                      {change.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-base ${getScoreColor(change.skor)}`}>
                      {change.skor}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-foreground text-sm">{change.tanggalDiterima}</td>
                  <td className="px-4 py-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem
                          onClick={() => navigate(`/change-management/detail/${change.id}`)}
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

export default DaftarLaporanPerubahan;
