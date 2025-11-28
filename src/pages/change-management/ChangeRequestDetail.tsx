import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Info } from "lucide-react";
import { useState } from "react";

const ChangeRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAffectedOpen, setIsAffectedOpen] = useState(false);

  const changeRequest = {
    crId: id,
    katalog: "Infrastructure",
    subKatalog: "Server",
    bmdId: "BMD-001",
    nama: "Update Server Configuration",
    asetTerdampak: [
      { bmdId: "BMD-001", nama: "Server Dell PowerEdge R740" },
      { bmdId: "BMD-045", nama: "Network Switch Cisco Catalyst" },
      { bmdId: "BMD-089", nama: "Storage Array NetApp" },
    ],
    catatan: "Perubahan konfigurasi untuk meningkatkan performa dan keamanan server production.",
    idInspeksi: "INS-2024-001",
    tanggalInspeksi: "2024-01-16",
    hasilInspeksiText: "Perlu dilakukan update sistem operasi dan patch keamanan",
    skorDampak: 7,
    skorKemungkinan: 6,
    skorExposure: 8,
    skorRisiko: 42,
    estimasiBiaya: "Rp 5.000.000",
    estimasiWaktu: "4 jam",
    hasilInspeksi: null,
    currentStatus: "Approved",
    approvalStatus: "Approved", // Approved, Rejected, Pending, Revision
    jadwalImplementasi: {
      tanggal: "20 Januari 2025",
      waktu: "14:00 - 18:00"
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Detail Change Request</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Kembali
        </Button>
      </div>

      <div className="space-y-6">
        {/* Section 1: Informasi Dasar */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Informasi Dasar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">CR ID</label>
              <p className="text-base text-foreground mt-1">{changeRequest.crId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Katalog</label>
              <p className="text-base text-foreground mt-1">{changeRequest.katalog}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Sub Katalog</label>
              <p className="text-base text-foreground mt-1">{changeRequest.subKatalog}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">BMD ID</label>
              <p className="text-base text-foreground mt-1">{changeRequest.bmdId}</p>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">Nama</label>
              <p className="text-base text-foreground mt-1">{changeRequest.nama}</p>
            </div>
          </div>

          {/* Aset Terdampak - Collapsible Table */}
          <div className="mt-4">
            <Collapsible open={isAffectedOpen} onOpenChange={setIsAffectedOpen}>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary">
                Aset Terdampak ({changeRequest.asetTerdampak.length})
                <ChevronDown className={`h-4 w-4 transition-transform ${isAffectedOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">BMD ID</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Nama Aset</th>
                      </tr>
                    </thead>
                    <tbody>
                      {changeRequest.asetTerdampak.map((asset, index) => (
                        <tr key={index} className="border-t border-border">
                          <td className="px-4 py-2 text-sm text-foreground">{asset.bmdId}</td>
                          <td className="px-4 py-2 text-sm text-foreground">{asset.nama}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-muted-foreground">Catatan</label>
            <p className="text-base text-foreground mt-1">{changeRequest.catatan}</p>
          </div>
        </Card>

        {/* Section 2: Hasil Inspeksi */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Hasil Inspeksi</h2>
          
          {/* ID dan Tanggal Inspeksi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">ID Inspeksi</label>
              <p className="text-base text-foreground mt-1">{changeRequest.idInspeksi}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tanggal Inspeksi</label>
              <p className="text-base text-foreground mt-1">{changeRequest.tanggalInspeksi}</p>
            </div>
          </div>

          {/* Hasil Inspeksi Text */}
          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground">Hasil Inspeksi</label>
            <p className="text-base text-foreground mt-1">{changeRequest.hasilInspeksiText}</p>
          </div>

          {/* Skor Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="border border-border rounded-lg p-4">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Skor Dampak</label>
              <p className="text-2xl font-bold text-foreground">{changeRequest.skorDampak}</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Skor Kemungkinan</label>
              <p className="text-2xl font-bold text-foreground">{changeRequest.skorKemungkinan}</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Skor Exposure</label>
              <p className="text-2xl font-bold text-foreground">{changeRequest.skorExposure}</p>
            </div>
            {/* Highlighted Skor Resiko */}
            <div className="border-2 border-red-200 bg-red-50 rounded-lg p-4">
              <label className="text-xs font-medium text-red-600 block mb-1">Skor Resiko (Exposure)</label>
              <p className="text-2xl font-bold text-red-600">{changeRequest.skorRisiko}</p>
            </div>
          </div>

          {/* Estimasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Estimasi Biaya</label>
              <p className="text-base text-foreground mt-1">{changeRequest.estimasiBiaya}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Estimasi Pengerjaan</label>
              <p className="text-base text-foreground mt-1">{changeRequest.estimasiWaktu}</p>
            </div>
          </div>

          {changeRequest.hasilInspeksi && (
            <div className="mt-4">
              <label className="text-sm font-medium text-muted-foreground">Hasil Inspeksi (Foto)</label>
              <div className="mt-2">
                <img src={changeRequest.hasilInspeksi} alt="Hasil Inspeksi" className="max-w-md rounded-lg border border-border" />
              </div>
            </div>
          )}
        </Card>

        {/* Section 3: Persetujuan - Formal Style */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Status Persetujuan</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Status Approval:</span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getApprovalStatusColor(changeRequest.approvalStatus)}`}>
                {changeRequest.approvalStatus}
              </span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Semua perubahan pada desain ini memerlukan persetujuan terpisah.
              </p>
            </div>
          </div>
        </Card>

        {/* Section 4: Jadwal Implementasi */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Jadwal Implementasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tanggal</label>
              <p className="text-base text-foreground mt-1">{changeRequest.jadwalImplementasi.tanggal}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Waktu</label>
              <p className="text-base text-foreground mt-1">{changeRequest.jadwalImplementasi.waktu}</p>
            </div>
          </div>
        </Card>

        {/* Section 5: Status Tracking - Vertical Timeline */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">Tracking Status</h2>
          <div className="relative">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isLast = index === statusSteps.length - 1;
              
              return (
                <div key={step.key} className="flex items-start">
                  {/* Timeline column */}
                  <div className="flex flex-col items-center mr-4">
                    {/* Circle */}
                    <div 
                      className={`
                        w-4 h-4 rounded-full flex-shrink-0 z-10
                        ${isCompleted 
                          ? 'bg-lime-500' 
                          : 'bg-muted border-2 border-border'
                        }
                      `}
                    />
                    {/* Vertical line */}
                    {!isLast && (
                      <div 
                        className={`
                          w-0.5 h-12 
                          ${isCompleted && index < currentStepIndex ? 'bg-lime-500' : 'bg-border'}
                        `}
                      />
                    )}
                  </div>
                  
                  {/* Content column */}
                  <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
                    <p 
                      className={`
                        text-sm font-medium
                        ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}
                      `}
                    >
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Status saat ini
                      </p>
                    )}
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
