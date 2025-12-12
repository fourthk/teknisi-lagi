import { useEffect, useState } from "react";
import TableWithSearch from "@/components/TableWithSearch";
import ActionMenu from "@/components/ActionMenu";

const DaftarLaporanDarurat = () => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [loading, setLoading] = useState(true);
  const [emergencies, setEmergencies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmergency = async () => {
      try {
        const res = await fetch(`${API_BASE}/emergency`);
        if (!res.ok) throw new Error("Failed to fetch emergency data");

        const json = await res.json();
        setEmergencies(json?.data || []);
      } catch (err: any) {
        console.error("Error fetching emergency data:", err);
        setError(err?.message || "Error fetching emergency data");
        setEmergencies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmergency();
  }, [API_BASE]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">
        Emergency Requests
      </h1>

      <TableWithSearch searchPlaceholder="Search emergency reports...">
        <div className="overflow-x-auto">
          {loading ? (
            <p className="p-4 text-sm">Loading emergency data...</p>
          ) : error ? (
            <p className="p-4 text-sm text-red-600">{error}</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-4 text-left text-sm font-semibold">Emergency ID</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Title</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Reporter</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Severity</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {emergencies.map((item: any) => (
                  <tr key={item.id} className="border-b border-border">
                    <td className="px-4 py-4 text-sm font-medium">
                      {item.emergency_code}
                    </td>

                    <td className="px-4 py-4 text-sm">
                      {item.title}
                    </td>

                    <td className="px-4 py-4 text-sm">
                      {item.created_at?.slice(0, 10)}
                    </td>

                    <td className="px-4 py-4 text-sm">
                      {item.reporter_id || "Unknown"}
                    </td>

                    <td className="px-4 py-4 text-sm">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                        N/A
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <ActionMenu
                        itemId={item.id}
                        detailPath={`/change-management/emergency/${item.id}`}
                        historyPath={`/change-management/emergency/history/${item.id}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </TableWithSearch>
    </div>
  );
};

export default DaftarLaporanDarurat;
