import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { Clock, User } from "lucide-react";

const JadwalImplementasiPatch = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch(`${API_BASE}/patch-schedules`);

        if (!res.ok) throw new Error("Failed to fetch patch schedules");

        const data = await res.json();

        // backend returns array directly
        setSchedules(data || []);
      } catch (err: any) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [API_BASE]);

  const handleScheduleClick = (id: string) => {
    navigate(`/patch-management/schedule/${id}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Schedule</h1>

      {loading && <p>Loading schedules...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="flex gap-6">
          {/* Calendar */}
          <div className="shrink-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border border-border bg-card pointer-events-auto"
            />
          </div>

          {/* Schedule List */}
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-medium text-muted-foreground mb-3">
              Schedule List
            </h2>

            <div className="space-y-2">
              {schedules.length === 0 && (
                <p className="text-muted-foreground text-sm">
                  No schedules found.
                </p>
              )}

              {schedules.map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleScheduleClick(s.id)}
                  className="flex items-center justify-between py-3 px-4 bg-card rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs text-muted-foreground">
                        {s.patch_schedule_code ?? s.id}
                      </span>
                    </div>

                    <h3 className="text-sm font-medium text-foreground truncate">
                      {s.title ?? s.task_name ?? "No Title"}
                    </h3>

                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {(s.date ?? s.schedule_date) ?? "-"} •{" "}
                        {(s.time ?? s.schedule_time) ?? "-"}
                      </span>

                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {s.pic_name ?? s.pic ?? "Unknown"}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground mt-1">
                      System: {s.system ?? s.system_name ?? "Unknown"}
                    </p>
                  </div>

                  <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium ml-3">
                    {s.status ?? "Scheduled"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JadwalImplementasiPatch;
