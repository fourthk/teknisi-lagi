import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PatchJobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState("");

  const patchInfo = {
    id: id,
    title: "Security Patch Update",
    implementationDate: "January 20, 2025",
  };

  const assets = [
    { id: "BMD-001", name: "Server Dell PowerEdge R740" },
    { id: "BMD-002", name: "Laptop HP EliteBook 840 G8" },
    { id: "BMD-003", name: "Desktop Lenovo ThinkCentre M70q" },
    { id: "BMD-004", name: "Switch Cisco Catalyst 2960X" },
    { id: "BMD-005", name: "Router MikroTik RB4011" },
  ];

  const handleSave = () => {
    console.log("Selected asset:", selectedAsset);
    navigate(-1);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft 
          className="h-6 w-6 text-foreground cursor-pointer hover:text-muted-foreground transition-colors" 
          onClick={() => navigate(-1)}
        />
        <h1 className="text-3xl font-bold text-foreground">Patch Job Detail</h1>
      </div>

      <Card className="max-w-2xl bg-card border-border">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Patch ID</label>
                <p className="text-base text-foreground mt-1">{patchInfo.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Patch Name</label>
                <p className="text-base text-foreground mt-1">{patchInfo.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Implementation Date</label>
                <p className="text-base text-foreground mt-1">{patchInfo.implementationDate}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <label className="text-sm font-medium text-muted-foreground block mb-2">
                Select Asset to Update
              </label>
              <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an asset" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {assets.map((asset) => (
                    <SelectItem key={asset.id} value={asset.id}>
                      {asset.id} - {asset.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => navigate(-1)} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!selectedAsset}
              >
                Save
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatchJobDetail;
