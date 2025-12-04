import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { useState } from "react";

const ChangeRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAffectedOpen, setIsAffectedOpen] = useState(false);

  const changeRequest = {
    crId: id,
    catalog: "Infrastructure",
    subCatalog: "Server",
    bmdId: "BMD-001",
    name: "Update Server Configuration",
    affectedAssets: [
      { bmdId: "BMD-001", name: "Server Dell PowerEdge R740" },
      { bmdId: "BMD-045", name: "Network Switch Cisco Catalyst" },
      { bmdId: "BMD-089", name: "Storage Array NetApp" },
    ],
    notes: "Configuration changes to improve production server performance and security.",
    inspectionId: "INS-2024-001",
    inspectionDate: "2024-01-16",
    inspectionResult: "OS update and security patches required",
    impactScore: 7,
    likelihoodScore: 6,
    exposureScore: 8,
    riskScore: 42,
    estimatedCost: "Rp 5,000,000",
    estimatedTime: "4 hours",
    inspectionImage: null,
    currentStatus: "Approved",
    approvalStatus: "Approved", // Approved, Rejected, Pending, Revision
    implementationSchedule: {
      date: "January 20, 2025",
      time: "14:00 - 18:00"
    }
  };

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

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.key === changeRequest.currentStatus);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft 
          className="h-6 w-6 text-foreground cursor-pointer hover:text-muted-foreground transition-colors" 
          onClick={() => navigate(-1)}
        />
        <h1 className="text-3xl font-bold text-foreground">Change Request Detail</h1>
      </div>

      <div className="space-y-6">
        {/* Section 1: Basic Information */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">CR ID</label>
              <p className="text-base text-foreground mt-1">{changeRequest.crId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Catalog</label>
              <p className="text-base text-foreground mt-1">{changeRequest.catalog}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Sub Catalog</label>
              <p className="text-base text-foreground mt-1">{changeRequest.subCatalog}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">BMD ID</label>
              <p className="text-base text-foreground mt-1">{changeRequest.bmdId}</p>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="text-base text-foreground mt-1">{changeRequest.name}</p>
            </div>
          </div>

          {/* Affected Assets - Collapsible Table */}
          <div className="mt-4">
            <Collapsible open={isAffectedOpen} onOpenChange={setIsAffectedOpen}>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary">
                Affected Assets ({changeRequest.affectedAssets.length})
                <ChevronDown className={`h-4 w-4 transition-transform ${isAffectedOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">BMD ID</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Asset Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {changeRequest.affectedAssets.map((asset, index) => (
                        <tr key={index} className="border-t border-border">
                          <td className="px-4 py-2 text-sm text-foreground">{asset.bmdId}</td>
                          <td className="px-4 py-2 text-sm text-foreground">{asset.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-muted-foreground">Notes</label>
            <p className="text-base text-foreground mt-1">{changeRequest.notes}</p>
          </div>
        </Card>

        {/* Section 2: Inspection Results */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Inspection Results</h2>
          
          {/* Inspection ID and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Inspection ID</label>
              <p className="text-base text-foreground mt-1">{changeRequest.inspectionId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Inspection Date</label>
              <p className="text-base text-foreground mt-1">{changeRequest.inspectionDate}</p>
            </div>
          </div>

          {/* Inspection Result Text */}
          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground">Inspection Result</label>
            <p className="text-base text-foreground mt-1">{changeRequest.inspectionResult}</p>
          </div>

          {/* Estimates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Estimated Cost</label>
              <p className="text-base text-foreground mt-1">{changeRequest.estimatedCost}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Estimated Duration</label>
              <p className="text-base text-foreground mt-1">{changeRequest.estimatedTime}</p>
            </div>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-border rounded-lg p-4">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Impact Score</label>
              <p className="text-2xl font-bold text-foreground">{changeRequest.impactScore}</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Likelihood Score</label>
              <p className="text-2xl font-bold text-foreground">{changeRequest.likelihoodScore}</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Exposure Score</label>
              <p className="text-2xl font-bold text-foreground">{changeRequest.exposureScore}</p>
            </div>
            {/* Highlighted Risk Score */}
            <div className="border-2 border-red-200 bg-red-50 rounded-lg p-4">
              <label className="text-xs font-medium text-red-600 block mb-1">Risk Score (Exposure)</label>
              <p className="text-2xl font-bold text-red-600">{changeRequest.riskScore}</p>
            </div>
          </div>

          {changeRequest.inspectionImage && (
            <div className="mt-4">
              <label className="text-sm font-medium text-muted-foreground">Inspection Photo</label>
              <div className="mt-2">
                <img src={changeRequest.inspectionImage} alt="Inspection Result" className="max-w-md rounded-lg border border-border" />
              </div>
            </div>
          )}
        </Card>

        {/* Section 3: Approval */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Approval Status</h2>
          <div className="space-y-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getApprovalStatusColor(changeRequest.approvalStatus)}`}>
              {changeRequest.approvalStatus}
            </span>
            <p className="text-sm text-foreground">
              Request approved by Section Head/Division Head/IT Department
            </p>
          </div>
        </Card>

        {/* Section 4: Implementation Schedule */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Implementation Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Date</label>
              <p className="text-base text-foreground mt-1">{changeRequest.implementationSchedule.date}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Time</label>
              <p className="text-base text-foreground mt-1">{changeRequest.implementationSchedule.time}</p>
            </div>
          </div>
        </Card>

        {/* Section 5: Status Tracking - Simple Line */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">Status Tracking</h2>
          <div className="relative">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isLast = index === statusSteps.length - 1;
              
              return (
                <div key={step.key} className="flex items-start">
                  {/* Timeline column */}
                  <div className="flex flex-col items-center mr-4">
                    {/* Simple dot */}
                    <div 
                      className={`
                        w-3 h-3 rounded-full flex-shrink-0
                        ${isCompleted 
                          ? 'bg-primary' 
                          : 'bg-muted'
                        }
                      `}
                    />
                    {/* Vertical line */}
                    {!isLast && (
                      <div 
                        className={`
                          w-0.5 h-10 
                          ${isCompleted && index < currentStepIndex ? 'bg-primary' : 'bg-muted'}
                        `}
                      />
                    )}
                  </div>
                  
                  {/* Content column */}
                  <div className={`pb-4 ${isLast ? 'pb-0' : ''}`}>
                    <p 
                      className={`
                        text-sm font-medium
                        ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}
                      `}
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