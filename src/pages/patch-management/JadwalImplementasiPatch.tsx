import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const JadwalImplementasiPatch = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  const schedules = [
    {
      id: "PATCH-001",
      title: "Security Patch Update",
      date: "2025-01-25",
      time: "02:00",
      pic: "IT Admin",
      system: "Windows Server 2022",
      status: "Scheduled",
    },
  ];

  const handleScheduleClick = (id: string) => {
    navigate(`/patch-management/detail/${id}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Implementation Schedule</h1>

      <div className="max-w-4xl">
        <Card className="p-6 bg-card border-border mb-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border border-border mx-auto"
          />
        </Card>

        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Schedule List</h2>
          <div className="space-y-3">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                onClick={() => handleScheduleClick(schedule.id)}
                className="p-4 border border-border rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{schedule.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {schedule.date} at {schedule.time}
                    </p>
                    <p className="text-sm text-muted-foreground">System: {schedule.system}</p>
                    <p className="text-sm text-muted-foreground">PIC: {schedule.pic}</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {schedule.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JadwalImplementasiPatch;