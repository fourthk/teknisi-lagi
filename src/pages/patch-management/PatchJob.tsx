import TableWithSearch from "@/components/TableWithSearch";
import ActionMenu from "@/components/ActionMenu";

const PatchJob = () => {
  const patches = [
    {
      id: "PATCH-001",
      title: "Security Patch Update",
      system: "Windows Server 2022",
      severity: "High",
      status: "Pending",
      date: "2025-01-18",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Patch Job</h1>

      <TableWithSearch searchPlaceholder="Search patches...">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-4 py-4 text-left font-semibold text-sm">Patch ID</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Patch Name</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Date</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">System</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Severity</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Status</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {patches.map((patch) => (
                <tr key={patch.id} className="border-b border-border">
                  <td className="px-4 py-4 text-foreground font-medium text-sm">{patch.id}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{patch.title}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{patch.date}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{patch.system}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {patch.severity}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {patch.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <ActionMenu
                      itemId={patch.id}
                      detailPath={`/patch-management/patch-job/${patch.id}`}
                      historyPath={`/patch-management/history/${patch.id}`}
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

export default PatchJob;
