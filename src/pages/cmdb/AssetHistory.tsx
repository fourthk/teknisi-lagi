import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowLeft } from "lucide-react";

const AssetHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filterPerubahan, setFilterPerubahan] = useState("all");
  const [filterDiubahOleh, setFilterDiubahOleh] = useState("all");
  const [filterTanggal, setFilterTanggal] = useState("");

  const assetInfo = {
    bmdId: id || "BMD-001",
    nama: "Server Dell PowerEdge R740",
    kategori: "Server",
    subKategori: "Physical Server"
  };

  const historyData = [
    {
      tanggal: "2024-01-15 10:30",
      tipePerubahan: "Lokasi",
      sebelum: "Ruang Server A",
      sesudah: "Ruang Server B",
      diubahOleh: "Admin IT"
    },
    {
      tanggal: "2024-01-10 14:20",
      tipePerubahan: "Kondisi",
      sebelum: "Baik",
      sesudah: "Rusak Ringan",
      diubahOleh: "Teknisi"
    },
    {
      tanggal: "2024-01-05 09:15",
      tipePerubahan: "PIC",
      sebelum: "John Doe",
      sesudah: "Jane Smith",
      diubahOleh: "Manager IT"
    }
  ];

  // Generate dynamic filter options based on data
  const perubahanOptions = useMemo(() => {
    const uniqueTypes = [...new Set(historyData.map(item => item.tipePerubahan))];
    return uniqueTypes.map(type => ({ value: type.toLowerCase(), label: type }));
  }, []);

  const diubahOlehOptions = useMemo(() => {
    const uniqueUsers = [...new Set(historyData.map(item => item.diubahOleh))];
    return uniqueUsers.map(user => ({ value: user.toLowerCase().replace(/\s+/g, '-'), label: user }));
  }, []);

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    return historyData.filter(item => {
      const matchPerubahan = filterPerubahan === "all" || item.tipePerubahan.toLowerCase() === filterPerubahan;
      const matchDiubahOleh = filterDiubahOleh === "all" || item.diubahOleh.toLowerCase().replace(/\s+/g, '-') === filterDiubahOleh;
      const matchTanggal = !filterTanggal || item.tanggal.startsWith(filterTanggal);
      return matchPerubahan && matchDiubahOleh && matchTanggal;
    });
  }, [filterPerubahan, filterDiubahOleh, filterTanggal]);

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <ArrowLeft 
            className="h-6 w-6 text-foreground cursor-pointer hover:text-muted-foreground transition-colors" 
            onClick={() => navigate(-1)}
          />
          <h1 className="text-3xl font-bold text-foreground">Riwayat Aset</h1>
        </div>
        <p className="text-muted-foreground ml-9">
          {assetInfo.bmdId} - {assetInfo.nama} ({assetInfo.kategori} / {assetInfo.subKategori})
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Input
              type="date"
              placeholder="Filter Tanggal"
              value={filterTanggal}
              onChange={(e) => setFilterTanggal(e.target.value)}
              className="h-12 pl-10"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
          <Select value={filterPerubahan} onValueChange={setFilterPerubahan}>
            <SelectTrigger className="w-[200px] h-12 rounded-lg border-2 border-border bg-primary text-primary-foreground hover:bg-primary/90">
              <SelectValue placeholder="Perubahan" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">Semua Perubahan</SelectItem>
              {perubahanOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterDiubahOleh} onValueChange={setFilterDiubahOleh}>
            <SelectTrigger className="w-[200px] h-12 rounded-lg border-2 border-border bg-primary text-primary-foreground hover:bg-primary/90">
              <SelectValue placeholder="Diubah Oleh" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">Semua User</SelectItem>
              {diubahOlehOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#384E66] text-white">
                  <th className="px-4 py-4 text-left font-semibold text-sm">Tanggal & Waktu</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Tipe Perubahan</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Sebelum</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Sesudah</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Diubah Oleh</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="px-4 py-4 text-foreground text-sm">{item.tanggal}</td>
                      <td className="px-4 py-4 text-foreground text-sm font-medium">{item.tipePerubahan}</td>
                      <td className="px-4 py-4 text-muted-foreground text-sm">{item.sebelum}</td>
                      <td className="px-4 py-4 text-foreground text-sm">{item.sesudah}</td>
                      <td className="px-4 py-4 text-foreground text-sm">{item.diubahOleh}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      Tidak ada data yang sesuai dengan filter
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetHistory;
