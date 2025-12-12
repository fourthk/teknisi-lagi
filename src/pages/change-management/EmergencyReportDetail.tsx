import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const EmergencyReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        const res = await fetch(`${API_BASE}/emergency/${id}`);
        if (!res.ok) throw new Error("Failed to fetch detail");

        const json = await res.json();
        setData(json?.data || json); // backend sometimes wraps inside data
      } catch (err: any) {
        setError(err?.message || "Error loading emergency detail");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, API_BASE]);

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      Critical: "bg-red-100 text-red-800",
      High: "bg-orange-100 text-orange-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    };
    return colors[severity] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "In Progress": "bg-orange-100 text-orange-800",
      Resolved: "bg-green-100 text-green-800",
      Pending: "bg-blue-100 text-blue-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // Loading State
  if (loading) {
    return <p className="p-4">Loading emergency detail...</p>;
  }

  // Error State
  if (error || !data) {
    return (
      <p className="p-4 text-red-600">
        {error || "Failed to load emergency detail"}
      </p>
    );
  }

  // Map fields based on your backend structure
  const emergency = {
    emergencyId: data.emergency_code,
    title: data.title,
    date: data.created_at?.slice(0, 10),
    reporter: data.reporter_id || "Unknown",
    severity: data.severity || "N/A",
    status: data.status,
    description: data.description || "-",
    affectedSystem: data.impacted_asset_id || "N/A",
    location: data.location || "Unknown Location",

    // If backend returns inspection data, map here. If not, fallback
    inspectionId: data.inspection?.inspection_id || "N/A",
    inspectionDate: data.inspection?.date || "N/A",
    inspectionResult: data.inspection?.result || "No inspection data",
    impactScore: data.inspection?.impact_score || 0,
    likelihoodScore: data.inspection?.likelihood_score || 0,
    exposureScore: data.inspection?.exposure_score || 0,
    riskScore: data.inspection?.risk_score || 0,
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft
          className="h-6 w-6 text-foreground cursor-pointer hover:text-muted-foreground transition-colors"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-3xl font-bold text-foreground">Emergency Report Detail</h1>
      </div>

      <div className="space-y-6">
        {/* Section 1: Emergency Information */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Emergency Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Emergency ID" value={emergency.emergencyId} />
            <DetailItem label="Title" value={emergency.title} />
            <DetailItem label="Date" value={emergency.date} />
            <DetailItem label="Reporter" value={emergency.reporter} />

            <div>
              <label className="text-sm font-medium text-muted-foreground">Severity</label>
              <p className="text-base mt-1">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                    emergency.severity
                  )}`}
                >
                  {emergency.severity}
                </span>
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <p className="text-base mt-1">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    emergency.status
                  )}`}
                >
                  {emergency.status}
                </span>
              </p>
            </div>

            <DetailItem label="Affected System" value={emergency.affectedSystem} />
            <DetailItem label="Location" value={emergency.location} />

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="text-base text-foreground mt-1">{emergency.description}</p>
            </div>
          </div>
        </Card>

        {/* Section 2: Inspection Results */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Inspection Results</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <DetailItem label="Inspection ID" value={emergency.inspectionId} />
            <DetailItem label="Inspection Date" value={emergency.inspectionDate} />
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground">Inspection Result</label>
            <p className="text-base text-foreground mt-1">{emergency.inspectionResult}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ScoreBox label="Impact Score" value={emergency.impactScore} />
            <ScoreBox label="Likelihood Score" value={emergency.likelihoodScore} />
            <ScoreBox label="Exposure Score" value={emergency.exposureScore} />
            <ScoreBox label="Risk Score (Exposure)" value={emergency.riskScore} highlight />
          </div>
        </Card>
      </div>
    </div>
  );
};

// Reusable Components
const DetailItem = ({ label, value }: any) => (
  <div>
    <label className="text-sm font-medium text-muted-foreground">{label}</label>
    <p className="text-base text-foreground mt-1">{value}</p>
  </div>
);

const ScoreBox = ({ label, value, highlight = false }: any) => (
  <div
    className={`rounded-lg p-4 border ${
      highlight ? "border-red-200 bg-red-50" : "border-border"
    }`}
  >
    <label
      className={`text-xs font-medium block mb-1 ${
        highlight ? "text-red-600" : "text-muted-foreground"
      }`}
    >
      {label}
    </label>
    <p
      className={`text-2xl font-bold ${
        highlight ? "text-red-600" : "text-foreground"
      }`}
    >
      {value}
    </p>
  </div>
);

export default EmergencyReportDetail;
