import { FileText, Clock, CheckCircle, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { api } from "@/lib/http";

type SummaryResponse = {
  success: boolean;
  message: string;
  data: {
    total_today: number;
    pending_inspection: number;
    approved_waiting_schedule: number;
    today_schedules: number;
  };
};

type WeeklyTrendItem = {
  date: string;
  day: string;
  submitted: number;
  inspected: number;
  implemented: number;
};

type WeeklyTrendResponse = {
  success: boolean;
  message: string;
  data: WeeklyTrendItem[];
};

const Dashboard = () => {
  const [summary, setSummary] = useState({
    total_today: 0,
    pending_inspection: 0,
    approved_waiting_schedule: 0,
    today_schedules: 0,
  });

  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    try {
      const res = await api<SummaryResponse>("/dashboard/summary");
      if (res.success) {
        setSummary(res.data);
      }
    } catch (err) {
      console.error("Summary API error:", err);
    }
  };

  const fetchWeeklyTrend = async () => {
    try {
      const res = await api<WeeklyTrendResponse>("/dashboard/weekly-trend");

      if (res.success) {
        const formatted = res.data.map((item) => ({
          name: item.day,
          Submitted: item.submitted,
          Inspected: item.inspected,
          Implemented: item.implemented,
        }));

        setChartData(formatted);
      }
    } catch (err) {
      console.error("Weekly trend API error:", err);
    }
  };

  useEffect(() => {
    Promise.all([fetchSummary(), fetchWeeklyTrend()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const statsData = [
    {
      label: "Change Reports Today",
      value: summary.total_today,
      icon: FileText,
      bgColor: "#E4E5E7",
      iconColor: "#263141",
    },
    {
      label: "Pending Inspection",
      value: summary.pending_inspection,
      icon: Clock,
      bgColor: "#E4E5E7",
      iconColor: "#263141",
    },
    {
      label: "Approved Waiting Schedule",
      value: summary.approved_waiting_schedule,
      icon: CheckCircle,
      bgColor: "#E4E5E7",
      iconColor: "#263141",
    },
    {
      label: "Today Schedules",
      value: summary.today_schedules,
      icon: Calendar,
      bgColor: "#E4E5E7",
      iconColor: "#263141",
    },
  ];

  if (loading) {
    return <div className="text-[#263141]">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-[#2F4256] p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#858585] mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-[#263141]">
                  {stat.value}
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: stat.bgColor }}
              >
                <stat.icon size={32} style={{ color: stat.iconColor }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Trend */}
      <div className="bg-white rounded-lg border border-[#2F4256] p-6">
        <h2 className="text-xl font-semibold text-[#263141] mb-2">
          Weekly Trend
        </h2>
        <p className="text-sm text-[#858585] mb-6">
          Reports Submitted / Inspected / Implemented
        </p>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E5E7" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#263141" }}
              axisLine={{ stroke: "#E4E5E7" }}
            />
            <YAxis
              tick={{ fill: "#263141" }}
              axisLine={{ stroke: "#E4E5E7" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #2F4256",
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
            <Bar dataKey="Submitted" fill="#384e66" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Inspected" fill="#5a7a9f" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Implemented" fill="#8fa5c1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
