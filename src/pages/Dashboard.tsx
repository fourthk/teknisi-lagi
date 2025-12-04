import { FileText, Clock, CheckCircle, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const statsData = [
  { 
    label: "Change Reports This Month", 
    value: "20", 
    icon: FileText,
    bgColor: "#E4E5E7",
    iconColor: "#263141"
  },
  { 
    label: "Inspection (In Progress)", 
    value: "8", 
    icon: Clock,
    bgColor: "#E4E5E7",
    iconColor: "#263141"
  },
  { 
    label: "Change Schedule", 
    value: "2", 
    icon: CheckCircle,
    bgColor: "#E4E5E7",
    iconColor: "#263141"
  },
  { 
    label: "Patch Schedule", 
    value: "0", 
    icon: Calendar,
    bgColor: "#E4E5E7",
    iconColor: "#263141"
  },
];

const chartData = [
  { name: "Monday", Submitted: 5, Approved: 3, Implemented: 2 },
  { name: "Tuesday", Submitted: 6, Approved: 4, Implemented: 3 },
  { name: "Wednesday", Submitted: 4, Approved: 3, Implemented: 2 },
  { name: "Thursday", Submitted: 7, Approved: 5, Implemented: 4 },
  { name: "Friday", Submitted: 8, Approved: 6, Implemented: 4 },
  { name: "Saturday", Submitted: 3, Approved: 2, Implemented: 1 },
  { name: "Sunday", Submitted: 2, Approved: 1, Implemented: 1 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-[#2F4256] p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#858585] mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-[#263141]">{stat.value}</p>
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

      {/* Chart */}
      <div className="bg-white rounded-lg border border-[#2F4256] p-6">
        <h2 className="text-xl font-semibold text-[#263141] mb-2">Weekly Trend</h2>
        <p className="text-sm text-[#858585] mb-6">Reports Submitted / Approved / Implemented</p>
        
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
                borderRadius: "8px"
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
            />
            <Bar dataKey="Submitted" fill="#384e66" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Approved" fill="#5a7a9f" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Implemented" fill="#8fa5c1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;