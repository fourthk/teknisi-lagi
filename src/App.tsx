import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
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
        <Routes>
          {/* Login route outside of Layout */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes with Layout */}
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/change-management/daftar-laporan" element={<Layout><DaftarLaporanPerubahan /></Layout>} />
          <Route path="/change-management/detail/:id" element={<Layout><ChangeRequestDetail /></Layout>} />
          <Route path="/change-management/buat-jadwal" element={<Layout><BuatJadwal /></Layout>} />
          <Route path="/change-management/jadwal-implementasi" element={<Layout><JadwalImplementasi /></Layout>} />
          <Route path="/change-management/hasil-implementasi" element={<Layout><HasilImplementasi /></Layout>} />
          <Route path="/change-management/laporan-darurat" element={<Layout><DaftarLaporanDarurat /></Layout>} />
          <Route path="/patch-management/daftar-laporan" element={<Layout><DaftarLaporanPerbaikan /></Layout>} />
          <Route path="/patch-management/jadwal-implementasi" element={<Layout><JadwalImplementasiPatch /></Layout>} />
          <Route path="/patch-management/hasil-implementasi" element={<Layout><HasilImplementasiPatch /></Layout>} />
          <Route path="/patch-management/detail/:id" element={<Layout><HasilImplementasiPatchDetail /></Layout>} />
          <Route path="/cmdb" element={<Layout><CMDB /></Layout>} />
          <Route path="/cmdb/category/:category" element={<Layout><CategoryDetail /></Layout>} />
          <Route path="/cmdb/detail/:id" element={<Layout><AssetDetail /></Layout>} />
          <Route path="/cmdb/history/:id" element={<Layout><AssetHistory /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
