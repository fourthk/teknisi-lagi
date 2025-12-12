import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CategoryDetail from "./pages/cmdb/CategoryDetail";
import AssetDetail from "./pages/cmdb/AssetDetail";
import AssetHistory from "./pages/cmdb/AssetHistory";
import DaftarLaporanPerubahan from "./pages/change-management/DaftarLaporanPerubahan";
import ChangeRequestDetail from "./pages/change-management/ChangeRequestDetail";
import JadwalImplementasi from "./pages/change-management/JadwalImplementasi";
import HasilImplementasi from "./pages/change-management/HasilImplementasi";
import DaftarLaporanDarurat from "./pages/change-management/DaftarLaporanDarurat";
import DaftarLaporanPerbaikan from "./pages/patch-management/DaftarLaporanPerbaikan";
import JadwalImplementasiPatch from "./pages/patch-management/JadwalImplementasiPatch";
import HasilImplementasiPatch from "./pages/patch-management/HasilImplementasiPatch";
import HasilImplementasiPatchDetail from "./pages/patch-management/HasilImplementasiPatchDetail";
import NotFound from "./pages/NotFound";




const queryClient = new QueryClient();

// simple auth stub (replace later with real API)
const isAuthenticated = () => !!localStorage.getItem("token");

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default route → selalu ke login terlebih dahulu */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* CHANGE MANAGEMENT */}
          <Route
            path="/change-management/daftar-laporan"
            element={
              <ProtectedRoute>
                <Layout>
                  <DaftarLaporanPerubahan />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-management/detail/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <ChangeRequestDetail />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-management/jadwal-implementasi"
            element={
              <ProtectedRoute>
                <Layout>
                  <JadwalImplementasi />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-management/hasil-implementasi"
            element={
              <ProtectedRoute>
                <Layout>
                  <HasilImplementasi />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-management/laporan-darurat"
            element={
              <ProtectedRoute>
                <Layout>
                  <DaftarLaporanDarurat />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* PATCH MANAGEMENT */}
          <Route
            path="/patch-management/daftar-laporan"
            element={
              <ProtectedRoute>
                <Layout>
                  <DaftarLaporanPerbaikan />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patch-management/jadwal-implementasi"
            element={
              <ProtectedRoute>
                <Layout>
                  <JadwalImplementasiPatch />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patch-management/hasil-implementasi"
            element={
              <ProtectedRoute>
                <Layout>
                  <HasilImplementasiPatch />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patch-management/detail/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <HasilImplementasiPatchDetail />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* CMDB */}
          <Route
            path="/cmdb"
            element={
              <ProtectedRoute>
                <Layout>
                  <CategoryDetail />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cmdb/category/:category"
            element={
              <ProtectedRoute>
                <Layout>
                  <CategoryDetail />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cmdb/detail/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <AssetDetail />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cmdb/history/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <AssetHistory />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;