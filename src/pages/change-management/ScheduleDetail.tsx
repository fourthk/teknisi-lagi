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
    assetName: "Server Database Utama",
    location: "Data Center Lt. 2, Rack A-05",
    changeCategory: "Update Hardware",
    totalScore: 85,
    estimatedCost: "Rp 15.000.000",
    estimatedTime: "4 jam",
    scheduledDate: "20 Januari 2024",
    startTime: "14:00",
    endTime: "18:00",
    notes: "Pastikan backup data sudah dilakukan sebelum implementasi. Koordinasi dengan tim network untuk downtime sementara.",
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
            <label className="text-sm text-muted-foreground">Nama Aset</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.assetName}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Lokasi</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.location}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Katalog Perubahan</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.changeCategory}</p>
          </div>
        </div>

        {/* Score & Estimation */}
        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
          <div>
            <label className="text-sm text-muted-foreground">Skor Total</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.totalScore}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Estimasi Biaya</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.estimatedCost}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Estimasi Waktu</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.estimatedTime}</p>
          </div>
        </div>

        {/* Schedule Time */}
        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
          <div>
            <label className="text-sm text-muted-foreground">Tanggal</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.scheduledDate}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Waktu Mulai</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.startTime}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Waktu Selesai</label>
            <p className="text-base font-medium text-foreground mt-1">{scheduleData.endTime}</p>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm text-muted-foreground">Catatan</label>
          <p className="text-base text-foreground mt-1">{scheduleData.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;
