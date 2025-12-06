import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { Clock, User } from "lucide-react";

const PatchSchedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  const schedules = [
    {
      id: "PATCH-001",
      title: "Security Patch Update",
      date: "25/1/2025",
      time: "02:00 - 04:00",
      pic: "IT Admin",
      system: "Windows Server 2022",
      status: "Scheduled",
    },
    {
      id: "PATCH-002",
      title: "Firmware Update",
      date: "28/1/2025",
      time: "10:00 - 12:00",
      pic: "Network Admin",
      system: "Cisco Router",
      status: "Scheduled",
    },
  ];

  const handleScheduleClick = (id: string) => {
    navigate(`/patch-management/patch-schedule/${id}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Schedule</h1>

      <div className="flex gap-6">
        {/* Calendar - Left Side */}
        <div className="shrink-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border border-border bg-card pointer-events-auto"
          />
        </div>

        {/* Schedule List - Right Side */}
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Schedule List</h2>
          <div className="space-y-2">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                onClick={() => handleScheduleClick(schedule.id)}
                className="flex items-center justify-between py-3 px-4 bg-card rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs text-muted-foreground">{schedule.id}</span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground truncate">{schedule.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {schedule.date} • {schedule.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {schedule.pic}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">System: {schedule.system}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium ml-3">
                  {schedule.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatchSchedule;
