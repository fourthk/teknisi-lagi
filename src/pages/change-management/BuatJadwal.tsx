import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const BuatJadwal = () => {
  const [selectedRequest, setSelectedRequest] = useState<string>("");

  // Mock data for change requests
  const changeRequests = [
    {
      id: "CR-001",
      bmdId: "BMD-2024-001",
      assetName: "Main Database Server",
      changeCategory: "Hardware Update",
      totalScore: 85,
      estimatedCost: "Rp 15,000,000",
      estimatedTime: "4 hours",
    },
    {
      id: "CR-002",
      bmdId: "BMD-2024-002",
      assetName: "Network Router Floor 2",
      changeCategory: "Network Configuration",
      totalScore: 72,
      estimatedCost: "Rp 5,000,000",
      estimatedTime: "2 hours",
    },
    {
      id: "CR-003",
      bmdId: "BMD-2024-003",
      assetName: "Monitoring Application",
      changeCategory: "Software Update",
      totalScore: 68,
      estimatedCost: "Rp 10,000,000",
      estimatedTime: "3 hours",
    },
  ];

  const selectedRequestData = changeRequests.find(
    (req) => req.id === selectedRequest
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Create Schedule</h1>

      <div className="bg-card rounded-lg border border-border p-6 max-w-3xl">
        <form className="space-y-6">
          {/* Request ID Selection */}
          <div className="space-y-2">
            <Label htmlFor="requestId">
              Select Request ID <span className="text-destructive">*</span>
            </Label>
            <Select value={selectedRequest} onValueChange={setSelectedRequest}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an approved request" />
              </SelectTrigger>
              <SelectContent>
                {changeRequests.map((request) => (
                  <SelectItem key={request.id} value={request.id}>
                    {request.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Summary Card */}
          {selectedRequestData && (
            <Card className="p-4 bg-background border-border">
              <h3 className="font-semibold text-foreground mb-3">
                Change Summary
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">BMD ID</p>
                  <p className="font-medium text-foreground">
                    {selectedRequestData.bmdId}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Asset Name</p>
                  <p className="font-medium text-foreground">
                    {selectedRequestData.assetName}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Change Category</p>
                  <p className="font-medium text-foreground">
                    {selectedRequestData.changeCategory}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Score</p>
                  <p className="font-medium text-foreground">
                    {selectedRequestData.totalScore}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimated Cost</p>
                  <p className="font-medium text-foreground">
                    {selectedRequestData.estimatedCost}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimated Time</p>
                  <p className="font-medium text-foreground">
                    {selectedRequestData.estimatedTime}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Date Field */}
          <div className="space-y-2">
            <Label htmlFor="scheduledDate">
              Select Date <span className="text-destructive">*</span>
            </Label>
            <Input id="scheduledDate" type="date" className="border-input" />
          </div>

          {/* Time Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">
                Start Time <span className="text-destructive">*</span>
              </Label>
              <Input id="startTime" type="time" className="border-input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">
                End Time <span className="text-destructive">*</span>
              </Label>
              <Input id="endTime" type="time" className="border-input" />
            </div>
          </div>

          {/* Notes Field */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes (optional)"
              className="border-input min-h-32"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="ghost" className="text-foreground">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save Schedule
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuatJadwal;