import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, MoreVertical, ArrowLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AddSpecificationDialog from "@/components/AddSpecificationDialog";
import AddRelationDialog from "@/components/AddRelationDialog";

const AssetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [lokasi, setLokasi] = useState("Ruang Server Lt. 3");
  const [pic, setPic] = useState("John Doe");
  const [dinas, setDinas] = useState("Dinas TI");
  
  const [specifications, setSpecifications] = useState<Array<{ specification: string; value: string }>>([]);
  const [specDialogOpen, setSpecDialogOpen] = useState(false);
  
  const [relatedAssets, setRelatedAssets] = useState([
    {
      bmdId: "BMD-002",
      nama: "Switch Cisco Catalyst",
      relasi: "CONNECTED_TO",
      kategori: "Network",
      subKategori: "Switch"
    },
    {
      bmdId: "BMD-003",
      nama: "Storage NetApp FAS",
      relasi: "DEPENDS_ON",
      kategori: "Storage",
      subKategori: "SAN"
    }
  ]);
  const [relationDialogOpen, setRelationDialogOpen] = useState(false);
  const [deleteRelationId, setDeleteRelationId] = useState<string | null>(null);

  const assetData = {
    bmdId: id || "BMD-001",
    nama: "Server Dell PowerEdge R740",
    serialNumber: "SN123456789",
    kategori: "Server",
    subKategori: "Physical Server",
    vendor: "Dell Technologies",
    tanggalDiperoleh: "2023-01-15",
    nilaiAset: 75000000,
    kondisi: "Baik",
    urlTerkait: "https://dell.com/server-docs",
    fileTerkait: "/placeholder.svg",
    catatan: "Server utama untuk aplikasi internal",
  };

  const handleAddSpecification = (specification: string, value: string) => {
    setSpecifications([...specifications, { specification, value }]);
  };

  const handleAddRelation = (relation: any) => {
    setRelatedAssets([...relatedAssets, relation]);
  };

  const handleDeleteRelation = (bmdId: string) => {
    setRelatedAssets(relatedAssets.filter(asset => asset.bmdId !== bmdId));
    setDeleteRelationId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <ArrowLeft 
            className="h-6 w-6 text-foreground cursor-pointer hover:text-muted-foreground transition-colors" 
            onClick={() => navigate(-1)}
          />
          <h1 className="text-3xl font-bold text-foreground">Detail CMDB</h1>
        </div>
        <Button 
          className="bg-[#384E66] hover:bg-[#2F4256] text-white"
          onClick={() => {/* Save changes */}}
        >
          Simpan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column - Asset Details */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">ID BMD</Label>
                  <Input value={assetData.bmdId} readOnly className="bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Nama Aset</Label>
                  <Input value={assetData.nama} readOnly className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Serial Number</Label>
                  <Input value={assetData.serialNumber} readOnly className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Kategori</Label>
                  <Input value={assetData.kategori} readOnly className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Sub Kategori</Label>
                  <Input value={assetData.subKategori} readOnly className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Lokasi</Label>
                  <Input value={lokasi} onChange={(e) => setLokasi(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">PIC</Label>
                  <Input value={pic} onChange={(e) => setPic(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Vendor</Label>
                  <Input value={assetData.vendor} readOnly className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Dinas</Label>
                  <Input value={dinas} onChange={(e) => setDinas(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Tanggal Diperoleh</Label>
                  <Input value={assetData.tanggalDiperoleh} readOnly className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Nilai Aset</Label>
                  <Input 
                    value={`Rp ${assetData.nilaiAset.toLocaleString('id-ID')}`} 
                    readOnly 
                    className="bg-muted" 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Kondisi</Label>
                  <Input value={assetData.kondisi} readOnly className="bg-muted" />
                </div>

                {assetData.urlTerkait && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">URL Terkait</Label>
                    <Input value={assetData.urlTerkait} readOnly className="bg-muted" />
                  </div>
                )}

                {assetData.fileTerkait && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">File Terkait</Label>
                    <a 
                      href={assetData.fileTerkait} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline block"
                    >
                      Lihat disini
                    </a>
                  </div>
                )}

                <div className="md:col-span-2 space-y-2">
                  <Label className="text-sm text-muted-foreground">Catatan</Label>
                  <Input value={assetData.catatan} readOnly className="bg-muted" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Specifications */}
        <div>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-foreground">Spesifikasi</h3>
              </div>
              
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#384E66] text-white">
                      <th className="px-3 py-3 text-left font-semibold text-xs">Specification</th>
                      <th className="px-3 py-3 text-left font-semibold text-xs">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specifications.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="px-3 py-6 text-center text-sm text-muted-foreground">
                          Belum ada spesifikasi
                        </td>
                      </tr>
                    ) : (
                      specifications.map((spec, index) => (
                        <tr key={index} className="border-b border-border hover:bg-muted/50">
                          <td className="px-3 py-3 text-foreground text-xs">{spec.specification}</td>
                          <td className="px-3 py-3 text-foreground text-xs">{spec.value}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setSpecDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Spesifikasi
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Relasi Aset Table */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-foreground">Relasi Aset</h2>
          <Button 
            className="bg-[#384E66] hover:bg-[#2F4256] text-white"
            onClick={() => setRelationDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Relasi
          </Button>
        </div>
        
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#384E66] text-white">
                  <th className="px-4 py-4 text-left font-semibold text-sm">BMD ID</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Nama Aset</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Kategori</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Sub Kategori</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Tipe Relasi</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {relatedAssets.map((asset) => (
                  <tr key={asset.bmdId} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-4 text-foreground font-medium text-sm">{asset.bmdId}</td>
                    <td className="px-4 py-4 text-foreground text-sm">{asset.nama}</td>
                    <td className="px-4 py-4 text-foreground text-sm">{asset.kategori}</td>
                    <td className="px-4 py-4 text-foreground text-sm">{asset.subKategori}</td>
                    <td className="px-4 py-4 text-sm">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {asset.relasi}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          <DropdownMenuItem
                            onClick={() => setDeleteRelationId(asset.bmdId)}
                            className="cursor-pointer hover:bg-muted text-destructive"
                          >
                            Hapus
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

      <AddSpecificationDialog
        open={specDialogOpen}
        onOpenChange={setSpecDialogOpen}
        onAdd={handleAddSpecification}
      />

      <AddRelationDialog
        open={relationDialogOpen}
        onOpenChange={setRelationDialogOpen}
        onAdd={handleAddRelation}
      />

      <AlertDialog open={!!deleteRelationId} onOpenChange={() => setDeleteRelationId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Relasi</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus relasi aset ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteRelationId && handleDeleteRelation(deleteRelationId)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AssetDetail;
