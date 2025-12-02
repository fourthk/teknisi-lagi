import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import CMDB from "./pages/CMDB";
import CategoryDetail from "./pages/cmdb/CategoryDetail";
import AssetDetail from "./pages/cmdb/AssetDetail";
import AssetHistory from "./pages/cmdb/AssetHistory";
import DaftarLaporanPerubahan from "./pages/change-management/DaftarLaporanPerubahan";
import ChangeRequestDetail from "./pages/change-management/ChangeRequestDetail";
import BuatJadwal from "./pages/change-management/BuatJadwal";
import JadwalImplementasi from "./pages/change-management/JadwalImplementasi";
import HasilImplementasi from "./pages/change-management/HasilImplementasi";
import DaftarLaporanDarurat from "./pages/change-management/DaftarLaporanDarurat";
import DaftarLaporanPerbaikan from "./pages/patch-management/DaftarLaporanPerbaikan";
import JadwalImplementasiPatch from "./pages/patch-management/JadwalImplementasiPatch";
import HasilImplementasiPatch from "./pages/patch-management/HasilImplementasiPatch";
import HasilImplementasiPatchDetail from "./pages/patch-management/HasilImplementasiPatchDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/change-management/daftar-laporan" element={<DaftarLaporanPerubahan />} />
            <Route path="/change-management/detail/:id" element={<ChangeRequestDetail />} />
            <Route path="/change-management/buat-jadwal" element={<BuatJadwal />} />
            <Route path="/change-management/jadwal-implementasi" element={<JadwalImplementasi />} />
            <Route path="/change-management/hasil-implementasi" element={<HasilImplementasi />} />
            <Route path="/change-management/laporan-darurat" element={<DaftarLaporanDarurat />} />
            <Route path="/patch-management/daftar-laporan" element={<DaftarLaporanPerbaikan />} />
            <Route path="/patch-management/jadwal-implementasi" element={<JadwalImplementasiPatch />} />
            <Route path="/patch-management/hasil-implementasi" element={<HasilImplementasiPatch />} />
            <Route path="/patch-management/detail/:id" element={<HasilImplementasiPatchDetail />} />
            <Route path="/cmdb" element={<CMDB />} />
            <Route path="/cmdb/category/:category" element={<CategoryDetail />} />
            <Route path="/cmdb/detail/:id" element={<AssetDetail />} />
            <Route path="/cmdb/history/:id" element={<AssetHistory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
