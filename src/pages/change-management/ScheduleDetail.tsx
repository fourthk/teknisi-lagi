import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ScheduleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for schedule detail
  const scheduleData = {
    scheduleId: id,
    requestId: "CR-001",
    bmdId: "BMD-2024-001",
    assetName: "Main Database Server",
    location: "Data Center Floor 2, Rack A-05",
    changeCategory: "Hardware Update",
    totalScore: 85,
    estimatedCost: "Rp 15,000,000",
    estimatedTime: "4 hours",
    scheduledDate: "January 20, 2024",
    startTime: "14:00",
    endTime: "18:00",
    notes: "Ensure data backup is completed before implementation. Coordinate with network team for temporary downtime.",
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft 
          className="h-6 w-6 text-foreground cursor-pointer hover:text-muted-foreground transition-colors" 
          onClick={() => navigate(-1)}
        />
        <h1 className="text-3xl font-bold text-foreground">Schedule Detail</h1>
      </div>

      <div className="bg-card rounded-lg border border-border p-6 max-w-3xl">
        {/* ID Section */}
        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
          <div>
            <label className="text-sm text-muted-foreground">Schedule ID</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.scheduleId}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Request ID</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.requestId}</p>
          </div>
        </div>

        {/* Asset Information */}
        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
          <div>
            <label className="text-sm text-muted-foreground">BMD ID</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.bmdId}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Asset Name</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.assetName}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Location</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.location}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Change Category</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.changeCategory}</p>
          </div>
        </div>

        {/* Score & Estimation */}
        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
          <div>
            <label className="text-sm text-muted-foreground">Total Score</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.totalScore}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Estimated Cost</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.estimatedCost}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Estimated Time</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.estimatedTime}</p>
          </div>
        </div>

        {/* Schedule Time */}
        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
          <div>
            <label className="text-sm text-muted-foreground">Date</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.scheduledDate}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Start Time</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.startTime}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">End Time</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.endTime}</p>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm text-muted-foreground">Notes</label>
          <p className="text-base text-foreground mt-1">{scheduleData.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;
