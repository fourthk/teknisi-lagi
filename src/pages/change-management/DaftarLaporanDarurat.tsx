import TableWithSearch from "@/components/TableWithSearch";
import ActionMenu from "@/components/ActionMenu";

const DaftarLaporanDarurat = () => {
  const emergencies = [
    {
      id: "EMG-001",
      title: "Critical Server Failure",
      reporter: "John Doe",
      date: "2025-01-18",
      severity: "Critical",
      status: "In Progress",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Emergency Requests</h1>

      <TableWithSearch searchPlaceholder="Search emergency reports...">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-4 py-4 text-left font-semibold text-sm">Emergency ID</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Title</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Date</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Reporter</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Severity</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Status</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {emergencies.map((emergency) => (
                <tr key={emergency.id} className="border-b border-border">
                  <td className="px-4 py-4 text-foreground font-medium text-sm">{emergency.id}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{emergency.title}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{emergency.date}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{emergency.reporter}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {emergency.severity}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {emergency.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <ActionMenu
                      itemId={emergency.id}
                      detailPath={`/change-management/emergency/detail/${emergency.id}`}
                      historyPath={`/change-management/emergency/history/${emergency.id}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableWithSearch>
    </div>
  );
};

export default DaftarLaporanDarurat;