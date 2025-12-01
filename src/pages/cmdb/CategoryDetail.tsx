import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RefreshCw, Search, ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusChangeDialog from "@/components/StatusChangeDialog";
import { toast } from "sonner";

const CategoryDetail = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  const sampleAssets = [
    {
      bmdId: "BMD-001",
      nama: "Server Dell PowerEdge R740",
      kondisi: "Baik",
      kategori: "Server",
      subKategori: "Physical Server",
      serialNumber: "SN123456789",
      status: "Aktif",
      dinas: "Dinas TI",
      lokasi: "Ruang Server Lt. 3",
      pic: "John Doe",
      vendor: "Dell Technologies",
      tanggalDiperoleh: "2023-01-15",
      nilaiAset: 150000000,
      urlTerkait: "https://server-monitoring.example.com",
      fileTerkait: "manual-server.pdf",
      catatan: "Server utama untuk aplikasi internal",
    },
    {
      bmdId: "BMD-002",
      nama: "Laptop HP EliteBook 840",
      kondisi: "Baik",
      kategori: "Laptop",
      subKategori: "Business Laptop",
      serialNumber: "SN987654321",
      status: "Aktif",
      dinas: "Dinas Keuangan",
      lokasi: "Ruang Staff Lt. 2",
      pic: "Jane Smith",
      vendor: "HP Inc.",
      tanggalDiperoleh: "2023-03-20",
      nilaiAset: 25000000,
      urlTerkait: "",
      fileTerkait: "",
      catatan: "Laptop untuk kepala bagian keuangan",
    },
  ];

  const handleStatusClick = (asset: any) => {
    setSelectedAsset(asset);
    setStatusDialogOpen(true);
  };

  const handleStatusSave = (newStatus: string) => {
    toast.success(`Status aset ${selectedAsset?.nama} berhasil diubah menjadi ${newStatus}`);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft 
          className="h-6 w-6 text-foreground cursor-pointer hover:text-muted-foreground transition-colors" 
          onClick={() => navigate("/cmdb")}
        />
        <h1 className="text-3xl font-bold text-foreground">{category}</h1>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Cari aset..."
              className="w-full h-12 pl-12 pr-4 rounded-lg border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px] h-12 rounded-lg border-2 bg-[#384E66] text-white hover:bg-[#2F4256]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="inactive">Nonaktif</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#384E66] hover:bg-[#2F4256] text-white gap-2 h-12 px-6 rounded-lg">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#384E66] text-white">
                <th className="px-4 py-4 text-left font-semibold text-sm">BMD ID</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Nama</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Kondisi</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Kategori</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Serial Number</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Status</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Dinas</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sampleAssets.map((asset) => (
                <tr key={asset.bmdId} className="border-b border-border hover:bg-muted/50">
                  <td className="px-4 py-4 text-foreground font-medium text-sm">{asset.bmdId}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{asset.nama}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {asset.kondisi}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-foreground text-sm">{asset.kategori}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{asset.serialNumber}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-foreground text-sm">{asset.dinas}</td>
                  <td className="px-4 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem
                          onClick={() => navigate(`/cmdb/detail/${asset.bmdId}`)}
                          className="cursor-pointer hover:bg-muted"
                        >
                          Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusClick(asset)}
                          className="cursor-pointer hover:bg-muted"
                        >
                          Ubah Status
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate(`/cmdb/history/${asset.bmdId}`)}
                          className="cursor-pointer hover:bg-muted"
                        >
                          Riwayat
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>

      {selectedAsset && (
        <StatusChangeDialog
          open={statusDialogOpen}
          onOpenChange={setStatusDialogOpen}
          currentStatus={selectedAsset.status}
          assetName={selectedAsset.nama}
          onSave={handleStatusSave}
        />
      )}
    </div>
  );
};

export default CategoryDetail;
