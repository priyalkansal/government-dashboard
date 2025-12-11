// app/audit/page.tsx
import AuditTable from "../../components/AuditTable";
import { auditLogs } from "../../mock/audit";

export default function AuditPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Audit & Activity Logs</h1>

      <p className="text-sm text-gray-600 mb-6">
        This page shows a chronological audit trail of actions taken by agencies and officials.
      </p>

      <div className="mb-6">
        <div className="bg-white p-4 rounded shadow">
          <AuditTable rows={auditLogs} />
        </div>
      </div>
    </main>
  );
}
