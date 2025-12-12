import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RefreshCw, Search, ArrowLeft, MoreVertical } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusChangeDialog from "@/components/StatusChangeDialog";
import { toast } from "sonner";
import { api } from "@/lib/http";

type Asset = {
  id: string;
  kode_bmd: string;
  nama_aset: string;
  kondisi: string;
  kategori: string;
  sub_kategori: string;
  nomor_seri: string;
  status: string;
  penanggung_jawab: string;
};

const CategoryDetail = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterJenisKategori, setFilterJenisKategori] = useState("all");
  const [filterSubKategori, setFilterSubKategori] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Load assets (ONLY kategori TI)
  const loadAssets = async () => {
    try {
      setLoading(true);
      const res: any = await api<any>("/cmdb/assets");

      const safeData = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
        ? res.data
        : [];

      // 🔥 FILTER HERE — ONLY kategori "TI"
      const onlyTI = safeData.filter(
        (a) => a.kategori?.toLowerCase() === "ti"
      );

      setAssets(onlyTI);
    } catch (err: any) {
      toast.error(err.message || "Gagal memuat data aset");
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const handleStatusClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setStatusDialogOpen(true);
  };

  const handleStatusSave = (newStatus: string) => {
    toast.success(`Status aset berhasil diubah menjadi ${newStatus}`);
  };

  // Filtered assets
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchStatus = filterStatus === "all" || asset.status === filterStatus;
      const matchJenis =
        filterJenisKategori === "all" || asset.kategori === filterJenisKategori;
      const matchSub = !filterSubKategori || asset.sub_kategori === filterSubKategori;
      const matchSearch = asset.nama_aset
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchStatus && matchJenis && matchSub && matchSearch;
    });
  }, [assets, filterStatus, filterJenisKategori, filterSubKategori, searchQuery]);

  // Options
  const jenisKategoriOptions = useMemo(() => {
    const unique = Array.from(new Set(assets.map((a) => a.kategori).filter(Boolean)));
    return ["all", ...unique];
  }, [assets]);

  const subKategoriOptions = useMemo(() => {
    const unique = Array.from(new Set(assets.map((a) => a.sub_kategori).filter(Boolean)));
    return unique;
  }, [assets]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft
          className="h-6 w-6 text-foreground cursor-pointer hover:text-muted-foreground"
          onClick={() => navigate("/cmdb")}
        />
        <h1 className="text-3xl font-bold text-foreground">{category}</h1>
      </div>

      <div className="space-y-4">
        {/* Filter Bar */}
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <div className="flex-1 min-w-[300px] relative">
            <input
              type="text"
              placeholder="Cari aset..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-lg border-2 border-border bg-card"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
          </div>

          {/* Sub Kategori */}
          <Select value={filterSubKategori} onValueChange={setFilterSubKategori}>
            <SelectTrigger className="w-[180px] h-12 rounded-lg border-2 bg-[#384E66] text-white">
              <SelectValue placeholder="Sub Kategori" />
            </SelectTrigger>
            <SelectContent>
              {subKategoriOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tipe Kategori */}
          <Select value={filterJenisKategori} onValueChange={setFilterJenisKategori}>
            <SelectTrigger className="w-[180px] h-12 rounded-lg border-2 bg-[#384E66] text-white">
              <SelectValue placeholder="Tipe Kategori" />
            </SelectTrigger>
            <SelectContent>
              {jenisKategoriOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option === "all" ? "Semua Tipe Kategori" : option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px] h-12 rounded-lg border-2 bg-[#384E66] text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="Aktif">Aktif</SelectItem>
              <SelectItem value="Nonaktif">Nonaktif</SelectItem>
            </SelectContent>
          </Select>

          {/* Refresh */}
          <Button
            className="bg-[#2F4256] hover:bg-[#253040] text-white gap-2 h-12 px-4 rounded-lg"
            onClick={loadAssets}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#384E66] text-white">
                  <th className="px-4 py-4 text-left text-sm">BMD ID</th>
                  <th className="px-4 py-4 text-left text-sm">Nama</th>
                  <th className="px-4 py-4 text-left text-sm">Kondisi</th>
                  <th className="px-4 py-4 text-left text-sm">Kategori</th>
                  <th className="px-4 py-4 text-left text-sm">Sub Kategori</th>
                  <th className="px-4 py-4 text-left text-sm">Serial Number</th>
                  <th className="px-4 py-4 text-left text-sm">Status</th>
                  <th className="px-4 py-4 text-left text-sm">Dinas</th>
                  <th className="px-4 py-4 text-left text-sm">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredAssets) &&
                  filteredAssets.map((asset) => (
                    <tr key={asset.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-4 py-4 text-sm font-medium">{asset.kode_bmd}</td>
                      <td className="px-4 py-4 text-sm">{asset.nama_aset}</td>
                      <td className="px-4 py-4 text-sm">
                        <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {asset.kondisi}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm">{asset.kategori || "-"}</td>
                      <td className="px-4 py-4 text-sm">{asset.sub_kategori || "-"}</td>
                      <td className="px-4 py-4 text-sm">{asset.nomor_seri || "-"}</td>
                      <td className="px-4 py-4 text-sm">
                        <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          {asset.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm">
                        {asset.penanggung_jawab || "-"}
                      </td>
                      <td className="px-4 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card">
                            <DropdownMenuItem onClick={() => navigate(`/cmdb/detail/${asset.id}`)}>
                              Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/cmdb/history/${asset.id}`)}>
                              Riwayat
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}

                {!loading && filteredAssets.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-muted-foreground">
                      Tidak ada data aset
                    </td>
                  </tr>
                )}

                {loading && (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-muted-foreground">
                      Memuat data...
                    </td>
                  </tr>
                )}
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
          assetName={selectedAsset.nama_aset}
          onSave={handleStatusSave}
        />
      )}
    </div>
  );
};

export default CategoryDetail;
