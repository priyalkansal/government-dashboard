"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function AuditPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAuditLogs() {
      // We fetch the history of reports
      const { data, error } = await supabase
        .from('reports')
        .select('id, type, details, created_at, user_email')
        .order('created_at', { ascending: false }); // Newest first

      if (data) setLogs(data);
    }
    fetchAuditLogs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Topbar title="System Audit Log" />
        <main className="p-6">
          <div className="bg-white rounded shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User/Reporter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action/Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                        {log.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.user_email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}