import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Plus, Clock, User } from "lucide-react";

const JadwalImplementasi = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  const schedules = [
    {
      id: "CR-001",
      title: "Update Server Configuration",
      date: "20/1/2024",
      time: "14:00 - 16:00",
      pic: "John Doe",
      status: "Scheduled",
    },
    {
      id: "CR-002",
      title: "Deploy New Application",
      date: "22/1/2024",
      time: "10:00 - 12:00",
      pic: "Jane Smith",
      status: "Scheduled",
    },
    {
      id: "CR-003",
      title: "Database Migration",
      date: "25/1/2024",
      time: "20:00 - 23:00",
      pic: "Mike Johnson",
      status: "Scheduled",
    },
  ];

  const handleScheduleClick = (id: string) => {
    navigate(`/change-management/detail/${id}`);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Schedule</h1>
        <Button className="bg-primary hover:bg-secondary text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Add Schedule
        </Button>
      </div>

      {/* Calendar Section */}
      <div className="mb-8">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border border-border bg-card p-4 w-full pointer-events-auto"
        />
      </div>

      {/* Schedule List Section */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Schedule List</h2>
        <div className="space-y-3">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              onClick={() => handleScheduleClick(schedule.id)}
              className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-muted-foreground">{schedule.id}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    {schedule.status}
                  </span>
                </div>
                <h3 className="font-medium text-foreground truncate">{schedule.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {schedule.date} • {schedule.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {schedule.pic}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JadwalImplementasi;
