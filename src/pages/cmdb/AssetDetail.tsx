import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import AddSpecificationDialog from "@/components/AddSpecificationDialog";
import AddRelationDialog from "@/components/AddRelationDialog";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// ==========================================================
// Types
// ==========================================================
interface AssetFromAPI {
  id: string;
  kode_bmd: string;
  nama_aset: string;
  nomor_seri: string;
  kategori: string;
  sub_kategori: string;
  kondisi: string;
  nilai_perolehan: number | null;
  tanggal_perolehan: string | null;
  lokasi: string | null;
  ruangan: string | null;
  penanggung_jawab: string | null;
}

interface AssetSpecAPI {
  id: string;
  asset_id: string;
  [key: string]: any;
}

interface AssetRelation {
  relation_id: string;
  bmd_id: string;
  nama: string;
  kategori: string;
  sub_kategori: string;
  relasi: string;
}

// ==========================================================
// Component
// ==========================================================
const AssetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState<AssetFromAPI | null>(null);
  const [spec, setSpec] = useState<AssetSpecAPI | null>(null);
  const [relations, setRelations] = useState<AssetRelation[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [specDialogOpen, setSpecDialogOpen] = useState(false);
  const [relationDialogOpen, setRelationDialogOpen] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Editable fields
  const [lokasi, setLokasi] = useState("");
  const [ruangan, setRuangan] = useState("");
  const [pic, setPic] = useState("");

  // ========================================================
  // Fetch Detail
  // ========================================================
  const fetchDetail = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/cmdb/assets/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const json = await res.json();
      const a = json.data.asset;
      const s = json.data.spec;

      setAsset(a);
      setSpec(s);

      setLokasi(a.lokasi || "");
      setRuangan(a.ruangan || "");
      setPic(a.penanggung_jawab || "");
    } catch (err) {
      console.error("Error:", err);
    }
  }, [id]);

  // ========================================================
  // Fetch Relations
  // ========================================================
  const fetchRelations = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/cmdb/assets/${id}/relations`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const json = await res.json();
      const raw = json.data ?? [];

      const mapped = raw.map((r: any) => ({
        relation_id: r.id ?? r.relation_id,
        bmd_id: r.kode_bmd ?? r.bmd_id,
        nama: r.nama_aset ?? r.nama,
        kategori: r.kategori,
        sub_kategori: r.sub_kategori,
        relasi: r.relasi ?? r.relation_type,
      }));

      setRelations(mapped);
    } catch (err) {
      setRelations([]);
    }
  }, [id]);

  // ========================================================
  // Load All
  // ========================================================
  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([fetchDetail(), fetchRelations()]);
      setLoading(false);
    })();
  }, []);

  // ========================================================
  // SAVE (Update asset)
  // ========================================================
  const handleSave = async () => {
    try {
      setSaving(true);

      await fetch(`${API_BASE}/cmdb/assets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          lokasi,
          ruangan,
          penanggung_jawab: pic,
        }),
      });

      await fetchDetail();
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  // ========================================================
  // Add Specification
  // ========================================================
  const handleAddSpec = async (key: string, value: string) => {
    await fetch(`${API_BASE}/cmdb/assets/${id}/spec`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ key, value }),
    });

    await fetchDetail();
  };

  // ========================================================
  // Add Relation
  // ========================================================
  const handleAddRelation = async (bmdId: string, relasi: string) => {
    await fetch(`${API_BASE}/cmdb/assets/${id}/relations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        related_bmd_id: bmdId,
        relation_type: relasi,
      }),
    });

    await fetchRelations();
  };

  // ========================================================
  // DELETE Relation
  // ========================================================
  const handleDeleteRelation = async () => {
    if (!deleteId) return;

    await fetch(`${API_BASE}/cmdb/assets/${id}/relations/${deleteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setDeleteId(null);
    await fetchRelations();
  };

  // ========================================================
  // RENDER
  // ========================================================
  if (loading || !asset) {
    return (
      <div className="min-h-[300px] flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Detail Aset</h1>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Kembali
          </Button>

          <Button
            className="bg-[#384E66] text-white"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Simpan"}
          </Button>
        </div>
      </div>

      {/* LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* DETAIL */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <Label>ID BMD</Label>
                <div className="bg-muted p-2 rounded">{asset.kode_bmd}</div>
              </div>

              <div>
                <Label>Nama Aset</Label>
                <div className="bg-muted p-2 rounded">{asset.nama_aset}</div>
              </div>

              <div>
                <Label>Serial Number</Label>
                <div className="bg-muted p-2 rounded">{asset.nomor_seri || "-"}</div>
              </div>

              <div>
                <Label>Kategori</Label>
                <div className="bg-muted p-2 rounded">{asset.kategori}</div>
              </div>

              <div>
                <Label>Sub Kategori</Label>
                <div className="bg-muted p-2 rounded">{asset.sub_kategori}</div>
              </div>

              {/* Editable */}
              <div>
                <Label>Lokasi</Label>
                <Input value={lokasi} onChange={(e) => setLokasi(e.target.value)} />
              </div>

              <div>
                <Label>PIC</Label>
                <Input value={pic} onChange={(e) => setPic(e.target.value)} />
              </div>

              <div>
                <Label>Ruangan</Label>
                <Input value={ruangan} onChange={(e) => setRuangan(e.target.value)} />
              </div>

              <div>
                <Label>Nilai Perolehan</Label>
                <div className="bg-muted p-2 rounded">
                  {asset.nilai_perolehan
                    ? `Rp ${asset.nilai_perolehan.toLocaleString("id-ID")}`
                    : "-"}
                </div>
              </div>

              <div>
                <Label>Kondisi</Label>
                <div className="bg-muted p-2 rounded">{asset.kondisi}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SPEC */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Spesifikasi</h3>

            <Button variant="outline" size="sm" onClick={() => setSpecDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah
            </Button>
          </div>

          <div className="rounded border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#384E66] text-white">
                  <th className="px-3 py-3 text-left text-xs">Key</th>
                  <th className="px-3 py-3 text-left text-xs">Value</th>
                </tr>
              </thead>

              <tbody>
                {!spec ? (
                  <tr>
                    <td colSpan={2} className="text-center py-4">
                      Tidak ada spesifikasi
                    </td>
                  </tr>
                ) : (
                  Object.entries(spec)
                    .filter(([k, v]) => k !== "id" && k !== "asset_id" && v)
                    .map(([k, v]) => (
                      <tr key={k} className="border-b">
                        <td className="px-3 py-3 text-xs">{k}</td>
                        <td className="px-3 py-3 text-xs">{String(v)}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RELATION TABLE */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Relasi Aset</h2>

        <Button className="bg-[#384E66] text-white" onClick={() => setRelationDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Relasi
        </Button>
      </div>

      <div className="rounded border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#384E66] text-white">
              <th className="px-4 py-3 text-left">BMD ID</th>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Kategori</th>
              <th className="px-4 py-3 text-left">Sub Kategori</th>
              <th className="px-4 py-3 text-left">Relasi</th>
              <th className="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {relations.map((r) => (
              <tr key={r.relation_id} className="border-b hover:bg-muted/20">
                <td className="px-4 py-3">{r.bmd_id}</td>
                <td className="px-4 py-3">{r.nama}</td>
                <td className="px-4 py-3">{r.kategori}</td>
                <td className="px-4 py-3">{r.sub_kategori}</td>
                <td className="px-4 py-3">{r.relasi}</td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeleteId(r.relation_id)}
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

      {/* DIALOGS */}
      <AddSpecificationDialog
        open={specDialogOpen}
        onOpenChange={setSpecDialogOpen}
        onAdd={handleAddSpec}
      />

      <AddRelationDialog
        open={relationDialogOpen}
        onOpenChange={setRelationDialogOpen}
        onAdd={handleAddRelation}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Relasi</AlertDialogTitle>
            <p>Apakah Anda yakin ingin menghapus relasi ini?</p>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive" onClick={handleDeleteRelation}>
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AssetDetail;
