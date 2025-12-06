import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowLeft } from "lucide-react";

const CategoryHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filterChange, setFilterChange] = useState("all");
  const [filterChangedBy, setFilterChangedBy] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  const assetInfo = {
    bmdId: id || "BMD-001",
    nama: "Server Dell PowerEdge R740",
    kategori: "Server",
    subKategori: "Physical Server"
  };

  const historyData = [
    {
      date: "2024-01-15 10:30",
      changeType: "Location",
      before: "Server Room A",
      after: "Server Room B",
      changedBy: "IT Admin"
    },
    {
      date: "2024-01-10 14:20",
      changeType: "Condition",
      before: "Good",
      after: "Minor Damage",
      changedBy: "Technician"
    },
    {
      date: "2024-01-05 09:15",
      changeType: "PIC",
      before: "John Doe",
      after: "Jane Smith",
      changedBy: "IT Manager"
    }
  ];

  const changeOptions = useMemo(() => {
    const uniqueTypes = [...new Set(historyData.map(item => item.changeType))];
    return uniqueTypes.map(type => ({ value: type.toLowerCase(), label: type }));
  }, []);

  const changedByOptions = useMemo(() => {
    const uniqueUsers = [...new Set(historyData.map(item => item.changedBy))];
    return uniqueUsers.map(user => ({ value: user.toLowerCase().replace(/\s+/g, '-'), label: user }));
  }, []);

  const filteredData = useMemo(() => {
    return historyData.filter(item => {
      const matchChange = filterChange === "all" || item.changeType.toLowerCase() === filterChange;
      const matchChangedBy = filterChangedBy === "all" || item.changedBy.toLowerCase().replace(/\s+/g, '-') === filterChangedBy;
      const matchDate = !filterDate || item.date.startsWith(filterDate);
      return matchChange && matchChangedBy && matchDate;
    });
  }, [filterChange, filterChangedBy, filterDate]);

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <ArrowLeft 
            className="h-6 w-6 text-foreground cursor-pointer hover:text-muted-foreground transition-colors" 
            onClick={() => navigate(-1)}
          />
          <h1 className="text-3xl font-bold text-foreground">Asset History</h1>
        </div>
        <p className="text-muted-foreground ml-9">
          {assetInfo.bmdId} - {assetInfo.nama} ({assetInfo.kategori} / {assetInfo.subKategori})
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Input
              type="date"
              placeholder="Filter Date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="h-12 pl-10"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
          <Select value={filterChange} onValueChange={setFilterChange}>
            <SelectTrigger className="w-[200px] h-12 rounded-lg border-2 border-border bg-primary text-primary-foreground hover:bg-primary/90">
              <SelectValue placeholder="Change Type" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Changes</SelectItem>
              {changeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterChangedBy} onValueChange={setFilterChangedBy}>
            <SelectTrigger className="w-[200px] h-12 rounded-lg border-2 border-border bg-primary text-primary-foreground hover:bg-primary/90">
              <SelectValue placeholder="Changed By" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Users</SelectItem>
              {changedByOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#384E66] text-white">
                  <th className="px-4 py-4 text-left font-semibold text-sm">Date & Time</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Change Type</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Before</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">After</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Changed By</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="px-4 py-4 text-foreground text-sm">{item.date}</td>
                      <td className="px-4 py-4 text-foreground text-sm font-medium">{item.changeType}</td>
                      <td className="px-4 py-4 text-muted-foreground text-sm">{item.before}</td>
                      <td className="px-4 py-4 text-foreground text-sm">{item.after}</td>
                      <td className="px-4 py-4 text-foreground text-sm">{item.changedBy}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      No data matching the filter
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHistory;
