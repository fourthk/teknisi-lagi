import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const EmergencyReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const emergencyReport = {
    emergencyId: id,
    title: "Critical Server Failure",
    date: "2025-01-18",
    reporter: "John Doe",
    severity: "Critical",
    status: "In Progress",
    description: "The main production server experienced a critical failure affecting all connected services.",
    affectedSystem: "Production Server Cluster",
    location: "Data Center Floor 2, Rack A-05",
    // Inspection Results
    inspectionId: "INS-EMG-2024-001",
    inspectionDate: "2025-01-18",
    inspectionResult: "Hardware failure detected in primary storage controller. Immediate replacement required.",
    impactScore: 9,
    likelihoodScore: 8,
    exposureScore: 10,
    riskScore: 72,
  };

  const getSeverityColor = (severity: string) => {
    const colors: { [key: string]: string } = {
      Critical: "bg-red-100 text-red-800",
      High: "bg-orange-100 text-orange-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    };
    return colors[severity] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      "In Progress": "bg-orange-100 text-orange-800",
      "Resolved": "bg-green-100 text-green-800",
      "Pending": "bg-blue-100 text-blue-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
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
            <div>
              <label className="text-sm font-medium text-muted-foreground">Emergency ID</label>
              <p className="text-base text-foreground mt-1">{emergencyReport.emergencyId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Title</label>
              <p className="text-base text-foreground mt-1">{emergencyReport.title}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Date</label>
              <p className="text-base text-foreground mt-1">{emergencyReport.date}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Reporter</label>
              <p className="text-base text-foreground mt-1">{emergencyReport.reporter}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Severity</label>
              <p className="text-base mt-1">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(emergencyReport.severity)}`}>
                  {emergencyReport.severity}
                </span>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <p className="text-base mt-1">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(emergencyReport.status)}`}>
                  {emergencyReport.status}
                </span>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Affected System</label>
              <p className="text-base text-foreground mt-1">{emergencyReport.affectedSystem}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Location</label>
              <p className="text-base text-foreground mt-1">{emergencyReport.location}</p>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="text-base text-foreground mt-1">{emergencyReport.description}</p>
            </div>
          </div>
        </Card>

        {/* Section 2: Inspection Results */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Inspection Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Inspection ID</label>
              <p className="text-base text-foreground mt-1">{emergencyReport.inspectionId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Inspection Date</label>
              <p className="text-base text-foreground mt-1">{emergencyReport.inspectionDate}</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground">Inspection Result</label>
            <p className="text-base text-foreground mt-1">{emergencyReport.inspectionResult}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-border rounded-lg p-4">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Impact Score</label>
              <p className="text-2xl font-bold text-foreground">{emergencyReport.impactScore}</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Likelihood Score</label>
              <p className="text-2xl font-bold text-foreground">{emergencyReport.likelihoodScore}</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Exposure Score</label>
              <p className="text-2xl font-bold text-foreground">{emergencyReport.exposureScore}</p>
            </div>
            <div className="border-2 border-red-200 bg-red-50 rounded-lg p-4">
              <label className="text-xs font-medium text-red-600 block mb-1">Risk Score (Exposure)</label>
              <p className="text-2xl font-bold text-red-600">{emergencyReport.riskScore}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyReportDetail;