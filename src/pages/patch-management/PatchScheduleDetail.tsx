import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const PatchScheduleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const scheduleData = {
    scheduleId: id,
    patchId: "PATCH-001",
    title: "Security Patch Update",
    system: "Windows Server 2022",
    description: "Critical security patch to address vulnerabilities in the operating system.",
    affectedAssets: [
      { bmdId: "BMD-001", name: "Server Dell PowerEdge R740" },
      { bmdId: "BMD-002", name: "Server HP ProLiant DL380" },
    ],
    scheduledDate: "January 25, 2025",
    startTime: "02:00",
    endTime: "04:00",
    pic: "IT Admin",
    status: "Scheduled",
    priority: "High",
    estimatedDowntime: "30 minutes",
    backupRequired: "Yes",
    notes: "Ensure all critical services are backed up before implementation. Notify all users about scheduled downtime.",
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      Scheduled: "bg-blue-100 text-blue-800",
      "In Progress": "bg-orange-100 text-orange-800",
      Completed: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    };
    return colors[priority] || "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft 
          className="h-6 w-6 text-foreground cursor-pointer hover:text-muted-foreground transition-colors" 
          onClick={() => navigate(-1)}
        />
        <h1 className="text-3xl font-bold text-foreground">Patch Schedule Detail</h1>
      </div>

      <div className="space-y-6">
        {/* Section 1: Basic Information */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Schedule ID</label>
              <p className="text-base text-foreground mt-1">{scheduleData.scheduleId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Patch ID</label>
              <p className="text-base text-foreground mt-1">{scheduleData.patchId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Title</label>
              <p className="text-base text-foreground mt-1">{scheduleData.title}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">System</label>
              <p className="text-base text-foreground mt-1">{scheduleData.system}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <p className="text-base mt-1">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(scheduleData.status)}`}>
                  {scheduleData.status}
                </span>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Priority</label>
              <p className="text-base mt-1">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(scheduleData.priority)}`}>
                  {scheduleData.priority}
                </span>
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="text-base text-foreground mt-1">{scheduleData.description}</p>
            </div>
          </div>
        </Card>

        {/* Section 2: Schedule Details */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Schedule Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Date</label>
              <p className="text-base text-foreground mt-1">{scheduleData.scheduledDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Start Time</label>
              <p className="text-base text-foreground mt-1">{scheduleData.startTime}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">End Time</label>
              <p className="text-base text-foreground mt-1">{scheduleData.endTime}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">PIC</label>
              <p className="text-base text-foreground mt-1">{scheduleData.pic}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Estimated Downtime</label>
              <p className="text-base text-foreground mt-1">{scheduleData.estimatedDowntime}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Backup Required</label>
              <p className="text-base text-foreground mt-1">{scheduleData.backupRequired}</p>
            </div>
          </div>
        </Card>

        {/* Section 3: Affected Assets */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Affected Assets</h2>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-2 text-left text-sm font-medium text-foreground">BMD ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Asset Name</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.affectedAssets.map((asset, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="px-4 py-2 text-sm text-foreground">{asset.bmdId}</td>
                    <td className="px-4 py-2 text-sm text-foreground">{asset.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Section 4: Notes */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Notes</h2>
          <p className="text-base text-foreground">{scheduleData.notes}</p>
        </Card>
      </div>
    </div>
  );
};

export default PatchScheduleDetail;