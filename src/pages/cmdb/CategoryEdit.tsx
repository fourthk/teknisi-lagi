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

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [lokasi, setLokasi] = useState("Server Room Floor 3");
  const [pic, setPic] = useState("John Doe");
  const [dinas, setDinas] = useState("IT Department");
  
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
    kondisi: "Good",
    urlTerkait: "https://dell.com/server-docs",
    fileTerkait: "/placeholder.svg",
    catatan: "Main server for internal applications",
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
          <h1 className="text-3xl font-bold text-foreground">CMDB Detail</h1>
        </div>
        <Button 
          className="bg-[#384E66] hover:bg-[#2F4256] text-white"
          onClick={() => {/* Save changes */}}
        >
          Save
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column - Asset Details */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">BMD ID</Label>
                  <Input value={assetData.bmdId} readOnly className="bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Asset Name</Label>
                  <Input value={assetData.nama} readOnly className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Serial Number</Label>
                  <Input value={assetData.serialNumber} readOnly className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Category</Label>
                  <Input value={assetData.kategori} readOnly className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Sub Category</Label>
                  <Input value={assetData.subKategori} readOnly className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Location</Label>
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
                  <Label className="text-sm text-muted-foreground">Department</Label>
                  <Input value={dinas} onChange={(e) => setDinas(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Acquisition Date</Label>
                  <Input value={assetData.tanggalDiperoleh} readOnly className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Asset Value</Label>
                  <Input 
                    value={`Rp ${assetData.nilaiAset.toLocaleString('id-ID')}`} 
                    readOnly 
                    className="bg-muted" 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Condition</Label>
                  <Input value={assetData.kondisi} readOnly className="bg-muted" />
                </div>

                {assetData.urlTerkait && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Related URL</Label>
                    <Input value={assetData.urlTerkait} readOnly className="bg-muted" />
                  </div>
                )}

                {assetData.fileTerkait && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Related File</Label>
                    <a 
                      href={assetData.fileTerkait} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline block"
                    >
                      View here
                    </a>
                  </div>
                )}

                <div className="md:col-span-2 space-y-2">
                  <Label className="text-sm text-muted-foreground">Notes</Label>
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
                <h3 className="text-lg font-semibold text-foreground">Specifications</h3>
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
                          No specifications yet
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
                Add Specification
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Asset Relations Table */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-foreground">Asset Relations</h2>
          <Button 
            className="bg-[#384E66] hover:bg-[#2F4256] text-white"
            onClick={() => setRelationDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Relation
          </Button>
        </div>
        
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#384E66] text-white">
                  <th className="px-4 py-4 text-left font-semibold text-sm">BMD ID</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Asset Name</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Category</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Sub Category</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Relation Type</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Action</th>
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
                            Delete
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
            <AlertDialogTitle>Delete Relation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this asset relation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteRelationId && handleDeleteRelation(deleteRelationId)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryEdit;
