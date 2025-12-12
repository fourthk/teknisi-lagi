import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/http";

// Type minimal BE
type CRResponse = {
  cr_id: string;
  requestor: string;
  instansi: string;
  type: string;
  alasan: string;
  tujuan: string;
  ci_id: string;
  aset_terdampak_id: any[];
  rencana_implementasi: string;
  usulan_jadwal: string;
  rencana_rollback: string;
  skor_dampak: number;
  skor_kemungkinan: number;
  skor_exposure: number;
  risk_score: number;
  approval_status: string;
  status: string;
  inspected_by: string | null;
  inspected_at: string | null;
  implement_date: string | null;
};

const ChangeRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAffectedOpen, setIsAffectedOpen] = useState(false);
  const [data, setData] = useState<CRResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch dari API
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api<any>(`/change-requests/${id}`);
        setData(res.data);
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const getApprovalStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      Approved: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
      Pending: "bg-blue-100 text-blue-800",
      Revision: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const statusSteps = [
    { key: "Submitted", label: "Submitted" },
    { key: "Reviewed", label: "Reviewed" },
    { key: "Revision", label: "Revision" },
    { key: "Approved", label: "Approved" },
    { key: "Scheduled", label: "Scheduled" },
    { key: "Implementing", label: "Implementing" },
    { key: "Completed", label: "Completed" },
    { key: "End", label: "End" },
  ];

  const currentStepIndex = statusSteps.findIndex(
    (s) => s.key === (data?.status ?? "")
  );

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (!data) {
    return <div className="text-center p-10">Data not found</div>;
  }

  // Mapping ke UI lama
  const changeRequest = {
    crId: data.cr_id,
    catalog: data.type || "-",
    subCatalog: data.instansi || "-",
    bmdId: data.ci_id || "-",
    name: data.tujuan || "-",
    affectedAssets: (data.aset_terdampak_id || []).map((id: string) => ({
      bmdId: id,
      name: id,
    })),
    notes: data.alasan || "-",
    inspectionId: data.inspected_by || "-",
    inspectionDate: data.inspected_at ? data.inspected_at.slice(0, 10) : "-",
    inspectionResult: data.rencana_implementasi || "-",
    impactScore: data.skor_dampak ?? 0,
    likelihoodScore: data.skor_kemungkinan ?? 0,
    exposureScore: data.skor_exposure ?? 0,
    riskScore: data.risk_score ?? 0,
    approvalStatus: data.approval_status ?? "-",
    currentStatus: data.status ?? "-",
    implementationSchedule: {
      date: data.implement_date || "-",
      time: data.usulan_jadwal || "-",
    },
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft
          className="h-6 w-6 text-foreground cursor-pointer hover:text-muted-foreground"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-3xl font-bold text-foreground">Change Request Detail</h1>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Info label="CR ID" value={changeRequest.crId} />
            <Info label="Catalog" value={changeRequest.catalog} />
            <Info label="Sub Catalog" value={changeRequest.subCatalog} />
            <Info label="BMD ID" value={changeRequest.bmdId} />
            <Info label="Name" value={changeRequest.name} colSpan />
          </div>

          {/* Affected Assets */}
          <div className="mt-4">
            <Collapsible open={isAffectedOpen} onOpenChange={setIsAffectedOpen}>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">
                Affected Assets ({changeRequest.affectedAssets.length})
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isAffectedOpen ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-3">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-4 py-2 text-left text-sm font-medium">BMD ID</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Asset Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {changeRequest.affectedAssets.map((asset, i) => (
                        <tr key={i} className="border-t">
                          <td className="px-4 py-2 text-sm">{asset.bmdId}</td>
                          <td className="px-4 py-2 text-sm">{asset.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="mt-4">
            <Info label="Notes" value={changeRequest.notes} />
          </div>
        </Card>

        {/* Inspection */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Inspection Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Info label="Inspection ID" value={changeRequest.inspectionId} />
            <Info label="Inspection Date" value={changeRequest.inspectionDate} />
          </div>
          <Info label="Inspection Result" value={changeRequest.inspectionResult} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Score label="Impact Score" value={changeRequest.impactScore} />
            <Score label="Likelihood Score" value={changeRequest.likelihoodScore} />
            <Score label="Exposure Score" value={changeRequest.exposureScore} />
            <Score label="Risk Score" value={changeRequest.riskScore} highlight />
          </div>
        </Card>

        {/* Approval */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Approval Status</h2>
          <span
            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getApprovalStatusColor(
              changeRequest.approvalStatus
            )}`}
          >
            {changeRequest.approvalStatus}
          </span>
        </Card>

        {/* Schedule */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Implementation Schedule</h2>
          <div className="grid grid-cols-2 gap-4">
            <Info label="Date" value={changeRequest.implementationSchedule.date} />
            <Info label="Time" value={changeRequest.implementationSchedule.time} />
          </div>
        </Card>

        {/* Status Tracking */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Status Tracking</h2>
          <div className="relative">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isLast = index === statusSteps.length - 1;

              return (
                <div key={step.key} className="flex items-start">
                  <div className="flex flex-col items-center mr-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isCompleted ? "bg-primary" : "bg-muted"
                      }`}
                    />
                    {!isLast && (
                      <div
                        className={`w-0.5 h-10 ${
                          isCompleted && index < currentStepIndex
                            ? "bg-primary"
                            : "bg-muted"
                        }`}
                      />
                    )}
                  </div>

                  <div className={`pb-4 ${isLast ? "pb-0" : ""}`}>
                    <p
                      className={`text-sm font-medium ${
                        isCompleted ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChangeRequestDetail;

// Sub components
const Info = ({ label, value, colSpan }: any) => (
  <div className={colSpan ? "md:col-span-2" : ""}>
    <label className="text-sm font-medium text-muted-foreground">{label}</label>
    <p className="text-base text-foreground mt-1">{value}</p>
  </div>
);

const Score = ({ label, value, highlight = false }: any) => (
  <div
    className={`border rounded-lg p-4 ${
      highlight ? "border-red-200 bg-red-50" : "border-border"
    }`}
  >
    <label className="text-xs font-medium text-muted-foreground block mb-1">
      {label}
    </label>
    <p className={`text-2xl font-bold ${highlight ? "text-red-600" : ""}`}>
      {value}
    </p>
  </div>
);