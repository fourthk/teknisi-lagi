import TableWithSearch from "@/components/TableWithSearch";
import ActionMenu from "@/components/ActionMenu";

const PatchResults = () => {
  const results = [
    {
      id: "PATCH-001",
      title: "Security Patch Update",
      date: "2025-01-20",
      pic: "IT Admin",
      system: "Windows Server 2022",
      status: "Success",
      notes: "Patch applied successfully, system rebooted",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Implementation Results</h1>

      <TableWithSearch searchPlaceholder="Search patch results...">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-4 py-4 text-left font-semibold text-sm">Patch ID</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Patch Name</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Implementation Date</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">PIC</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Status</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Notes</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id} className="border-b border-border">
                  <td className="px-4 py-4 text-foreground font-medium text-sm">{result.id}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{result.title}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{result.date}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{result.pic}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {result.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-foreground text-sm">{result.notes}</td>
                  <td className="px-4 py-4">
                    <ActionMenu
                      itemId={result.id}
                      detailPath={`/patch-management/patch-results/${result.id}`}
                      historyPath={`/patch-management/history/${result.id}`}
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

export default PatchResults;
