import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

const PatchResultsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const patchInfo = {
    id: id,
    title: "Security Patch Update",
    implementationDate: "January 20, 2025",
    pic: "IT Admin",
    assetCount: 15,
  };

  const assets = [
    { bmdId: "BMD-001", name: "Server Dell PowerEdge R740" },
    { bmdId: "BMD-002", name: "Laptop HP EliteBook 840 G8" },
    { bmdId: "BMD-003", name: "Desktop Lenovo ThinkCentre M70q" },
    { bmdId: "BMD-004", name: "Switch Cisco Catalyst 2960X" },
    { bmdId: "BMD-005", name: "Router MikroTik RB4011" },
    { bmdId: "BMD-006", name: "Printer Canon imageRUNNER" },
    { bmdId: "BMD-007", name: "NAS Synology DS920+" },
    { bmdId: "BMD-008", name: "UPS APC Smart-UPS 3000VA" },
    { bmdId: "BMD-009", name: "Monitor Dell UltraSharp U2720Q" },
    { bmdId: "BMD-010", name: "Laptop Dell Latitude 5420" },
    { bmdId: "BMD-011", name: "Server HP ProLiant DL380 Gen10" },
    { bmdId: "BMD-012", name: "Firewall FortiGate 60F" },
    { bmdId: "BMD-013", name: "Access Point Ubiquiti UniFi AP" },
    { bmdId: "BMD-014", name: "Keyboard Logitech MX Keys" },
    { bmdId: "BMD-015", name: "Webcam Logitech Brio 4K" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft 
          className="h-6 w-6 text-foreground cursor-pointer hover:text-muted-foreground transition-colors" 
          onClick={() => navigate(-1)}
        />
        <h1 className="text-3xl font-bold text-foreground">Patch Results Detail</h1>
      </div>

      {/* Patch Information Card */}
      <Card className="mb-6 bg-card border-border">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Patch Name</label>
              <p className="text-base text-foreground mt-1">{patchInfo.title}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Implementation Date</label>
              <p className="text-base text-foreground mt-1">{patchInfo.implementationDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">PIC</label>
              <p className="text-base text-foreground mt-1">{patchInfo.pic}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Asset Count</label>
              <p className="text-base text-foreground mt-1">{patchInfo.assetCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assets Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-4 py-4 text-left font-semibold text-sm">BMD ID</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Asset</th>
                <th className="px-4 py-4 text-center font-semibold text-sm">Success</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Note</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={asset.bmdId} className="border-b border-border">
                  <td className="px-4 py-4 text-foreground font-medium text-sm">{asset.bmdId}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{asset.name}</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center">
                      <Checkbox id={`success-${index}`} />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Input
                      type="text"
                      placeholder="Add notes..."
                      className="w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Save Results
        </Button>
      </div>
    </div>
  );
};

export default PatchResultsDetail;
