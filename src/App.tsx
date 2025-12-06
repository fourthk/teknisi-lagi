import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import CMDB from "./pages/CMDB";
import CategoryDetail from "./pages/cmdb/CategoryDetail";
import CategoryEdit from "./pages/cmdb/CategoryEdit";
import CategoryHistory from "./pages/cmdb/CategoryHistory";
import ChangeRequest from "./pages/change-management/ChangeRequest";
import ChangeRequestDetail from "./pages/change-management/ChangeRequestDetail";
import ChangeSchedule from "./pages/change-management/ChangeSchedule";
import ChangeScheduleDetail from "./pages/change-management/ChangeScheduleDetail";
import ChangeResults from "./pages/change-management/ChangeResults";
import ChangeResultsDetail from "./pages/change-management/ChangeResultsDetail";
import EmergencyRequest from "./pages/change-management/EmergencyRequest";
import EmergencyRequestDetail from "./pages/change-management/EmergencyRequestDetail";
import PatchJob from "./pages/patch-management/PatchJob";
import PatchJobDetail from "./pages/patch-management/PatchJobDetail";
import PatchSchedule from "./pages/patch-management/PatchSchedule";
import PatchScheduleDetail from "./pages/patch-management/PatchScheduleDetail";
import PatchResults from "./pages/patch-management/PatchResults";
import PatchResultsDetail from "./pages/patch-management/PatchResultsDetail";
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
            {/* Change Management */}
            <Route path="/change-management/change-request" element={<ChangeRequest />} />
            <Route path="/change-management/change-request/:id" element={<ChangeRequestDetail />} />
            <Route path="/change-management/change-schedule" element={<ChangeSchedule />} />
            <Route path="/change-management/change-schedule/:id" element={<ChangeScheduleDetail />} />
            <Route path="/change-management/change-results" element={<ChangeResults />} />
            <Route path="/change-management/change-results/:id" element={<ChangeResultsDetail />} />
            <Route path="/change-management/emergency-request" element={<EmergencyRequest />} />
            <Route path="/change-management/emergency-request/:id" element={<EmergencyRequestDetail />} />
            {/* Patch Management */}
            <Route path="/patch-management/patch-job" element={<PatchJob />} />
            <Route path="/patch-management/patch-job/:id" element={<PatchJobDetail />} />
            <Route path="/patch-management/patch-schedule" element={<PatchSchedule />} />
            <Route path="/patch-management/patch-schedule/:id" element={<PatchScheduleDetail />} />
            <Route path="/patch-management/patch-results" element={<PatchResults />} />
            <Route path="/patch-management/patch-results/:id" element={<PatchResultsDetail />} />
            {/* CMDB */}
            <Route path="/cmdb" element={<CMDB />} />
            <Route path="/cmdb/category/:category" element={<CategoryDetail />} />
            <Route path="/cmdb/category-edit/:id" element={<CategoryEdit />} />
            <Route path="/cmdb/category-history/:id" element={<CategoryHistory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
