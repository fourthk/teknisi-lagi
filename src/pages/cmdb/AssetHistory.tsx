import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/http";

interface HistoryItem {
  id?: string;
  action?: string;
  description?: string;
  created_at?: string;
}

const AssetHistory = ({ assetId }: { assetId: string }) => {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const res = await api<any>(`/assets/${assetId}/history`);

      // Fix inti: pastikan bentuk data array
      if (Array.isArray(res)) {
        setHistoryData(res);
      } else if (Array.isArray(res?.data)) {
        setHistoryData(res.data);
      } else {
        setHistoryData([]);
      }
    } catch (err) {
      console.error("Load history error:", err);
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (assetId) loadHistory();
  }, [assetId]);

  const rows = useMemo(() => {
    return historyData.map((item, i) => ({
      no: i + 1,
      action: item.action || "-",
      description: item.description || "-",
      date: item.created_at
        ? new Date(item.created_at).toLocaleString()
        : "-",
    }));
  }, [historyData]);

  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="text-lg font-semibold mb-3">Asset History</h3>

      {loading ? (
        <p>Loading...</p>
      ) : rows.length === 0 ? (
        <p className="text-gray-500">No history found</p>
      ) : (
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">No</th>
              <th className="p-2 border">Action</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.no}>
                <td className="p-2 border">{r.no}</td>
                <td className="p-2 border">{r.action}</td>
                <td className="p-2 border">{r.description}</td>
                <td className="p-2 border">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssetHistory;
