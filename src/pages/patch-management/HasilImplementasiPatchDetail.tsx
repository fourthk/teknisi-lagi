import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ChevronRight, ArrowLeft } from "lucide-react";

const HasilImplementasiPatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const patchInfo = {
    id: id,
    title: "Security Patch Update",
    tanggalImplementasi: "20 Januari 2025",
    pic: "IT Admin",
    jumlahAset: 15,
  };

  const assets = [
    { bmdId: "BMD-001", nama: "Server Dell PowerEdge R740" },
    { bmdId: "BMD-002", nama: "Laptop HP EliteBook 840 G8" },
    { bmdId: "BMD-003", nama: "Desktop Lenovo ThinkCentre M70q" },
    { bmdId: "BMD-004", nama: "Switch Cisco Catalyst 2960X" },
    { bmdId: "BMD-005", nama: "Router MikroTik RB4011" },
    { bmdId: "BMD-006", nama: "Printer Canon imageRUNNER" },
    { bmdId: "BMD-007", nama: "NAS Synology DS920+" },
    { bmdId: "BMD-008", nama: "UPS APC Smart-UPS 3000VA" },
    { bmdId: "BMD-009", nama: "Monitor Dell UltraSharp U2720Q" },
    { bmdId: "BMD-010", nama: "Laptop Dell Latitude 5420" },
    { bmdId: "BMD-011", nama: "Server HP ProLiant DL380 Gen10" },
    { bmdId: "BMD-012", nama: "Firewall FortiGate 60F" },
    { bmdId: "BMD-013", nama: "Access Point Ubiquiti UniFi AP" },
    { bmdId: "BMD-014", nama: "Keyboard Logitech MX Keys" },
    { bmdId: "BMD-015", nama: "Webcam Logitech Brio 4K" },
  ];

  return (
    <div>
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate("/patch-management/hasil-implementasi")}
              className="cursor-pointer"
            >
              Patch Management
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate("/patch-management/hasil-implementasi")}
              className="cursor-pointer"
            >
              Hasil Implementasi
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Detail</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft 
          className="h-6 w-6 text-foreground cursor-pointer hover:text-muted-foreground transition-colors" 
          onClick={() => navigate(-1)}
        />
        <h1 className="text-3xl font-bold text-foreground">Hasil Implementasi Patch</h1>
      </div>

      {/* Patch Information Card */}
      <Card className="mb-6 bg-card border-border">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nama Patch</label>
              <p className="text-base text-foreground mt-1">{patchInfo.title}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tanggal Implementasi</label>
              <p className="text-base text-foreground mt-1">{patchInfo.tanggalImplementasi}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">PIC</label>
              <p className="text-base text-foreground mt-1">{patchInfo.pic}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Jumlah Aset</label>
              <p className="text-base text-foreground mt-1">{patchInfo.jumlahAset}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assets Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-4 py-4 text-left font-semibold text-sm">BMD ID</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Aset</th>
                <th className="px-4 py-4 text-center font-semibold text-sm">Success</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Note</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={asset.bmdId} className="border-b border-border">
                  <td className="px-4 py-4 text-foreground font-medium text-sm">{asset.bmdId}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{asset.nama}</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center">
                      <Checkbox id={`success-${index}`} />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Input
                      type="text"
                      placeholder="Tambahkan catatan..."
                      className="w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Batal
        </Button>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Simpan Hasil
        </Button>
      </div>
    </div>
  );
};

export default HasilImplementasiPatchDetail;
