import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const RepairReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState("");

  const repairReport = {
    patchId: id,
    title: "Security Patch Update",
    implementationDate: "2025-01-25",
  };

  const availableAssets = [
    { id: "BMD-001", name: "Server Dell PowerEdge R740" },
    { id: "BMD-002", name: "Workstation HP Z4 G4" },
    { id: "BMD-003", name: "Network Switch Cisco Catalyst 9300" },
    { id: "BMD-004", name: "Storage Array NetApp AFF A250" },
    { id: "BMD-005", name: "Firewall Palo Alto PA-3220" },
  ];

  const handleSave = () => {
    // Handle save logic
    console.log("Saving with asset:", selectedAsset);
    navigate(-1);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft 
          className="h-6 w-6 text-foreground cursor-pointer hover:text-muted-foreground transition-colors" 
          onClick={() => navigate(-1)}
        />
        <h1 className="text-3xl font-bold text-foreground">Repair Report Detail</h1>
      </div>

      <Card className="p-6 bg-card border-border max-w-2xl">
        <h2 className="text-xl font-semibold text-foreground mb-6">Patch Information</h2>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Patch ID</label>
            <p className="text-base text-foreground mt-1">{repairReport.patchId}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Title</label>
            <p className="text-base text-foreground mt-1">{repairReport.title}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-2">Select Asset to Update</label>
            <Select value={selectedAsset} onValueChange={setSelectedAsset}>
              <SelectTrigger className="w-full bg-background border-border">
                <SelectValue placeholder="Select an asset" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {availableAssets.map((asset) => (
                  <SelectItem key={asset.id} value={asset.id}>
                    {asset.id} - {asset.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Implementation Date</label>
            <p className="text-base text-foreground mt-1">{repairReport.implementationDate}</p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!selectedAsset}
            >
              Save
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RepairReportDetail;