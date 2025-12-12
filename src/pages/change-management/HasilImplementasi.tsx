import { useEffect, useState } from "react";
import TableWithSearch from "@/components/TableWithSearch";
import ActionMenu from "@/components/ActionMenu";

const HasilImplementasi = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = "https://sakti-backend-674826252080.asia-southeast2.run.app";
  const allowedStatuses = ["Completed", "Failed", "End", "Finish", "Success"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE}/change-requests`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          throw new Error("Unauthorized: Token invalid or expired.");
        }

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        // filter hanya status yang boleh
        const filtered = data.filter((item: any) =>
          allowedStatuses.includes(item.status)
        );

        // fallback dummy
        if (filtered.length === 0) {
          setResults([
            {
              id: "CR-DUMMY-001",
              change_request_code: "CR-DUMMY-001",
              title: "No completed requests available",
              implementation_date: "-",
              pic_name: "-",
              status: "Completed",
              notes: "This is fallback dummy data",
            },
          ]);
        } else {
          setResults(filtered);
        }
      } catch (err: any) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // ← HARUS kosong (dipanggil 1x)

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">
        Implementation Results
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <TableWithSearch searchPlaceholder="Search results...">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-4 text-left font-semibold text-sm">Request ID</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Title</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Implementation Date</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">PIC</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Status</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Notes</th>
                  <th className="px-4 py-4 text-left font-semibold text-sm">Action</th>
                </tr>
              </thead>

              <tbody>
                {results.map((result: any) => (
                  <tr key={result.id} className="border-b border-border">
                    <td className="px-4 py-4 text-foreground font-medium text-sm">
                      {result.change_request_code || result.id}
                    </td>

                    <td className="px-4 py-4 text-foreground text-sm">
                      {result.title || "-"}
                    </td>

                    <td className="px-4 py-4 text-foreground text-sm">
                      {result.implementation_date ||
                        (result.updated_at ? result.updated_at.split("T")[0] : "-")}
                    </td>

                    <td className="px-4 py-4 text-foreground text-sm">
                      {result.pic_name || result.pic || "Unknown"}
                    </td>

                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                          ${
                            ["Completed", "Success"].includes(result.status)
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {result.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-foreground text-sm">
                      {result.notes || result.description || "-"}
                    </td>

                    <td className="px-4 py-4">
                      <ActionMenu
                        itemId={result.id}
                        detailPath={`/change-management/hasil-implementasi/${result.id}`}
                        historyPath={`/change-management/history/${result.id}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TableWithSearch>
      )}
    </div>
  );
};

export default HasilImplementasi;
