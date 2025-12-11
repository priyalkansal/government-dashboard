// app/reports/page.tsx
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import SummaryCard from "../../components/SummaryCard";
import ReportsLineChart from "../../components/Charts/ReportsLineChart";
import StatusDonut from "../../components/Charts/StatusDonut";
import RecentReportsTable from "../../components/RecentReportsTable";
import { reportsTrend, reportsByStatus, recentReports } from "../../mock/reports";

export default function ReportsPage() {
  // compute summary
  const total = recentReports.length + reportsByStatus.reduce((s, r) => s + r.value, 0); // demo mix
  const open = reportsByStatus.find(r => r.name === "Open")?.value ?? 0;
  const closed = reportsByStatus.find(r => r.name === "Closed")?.value ?? 0;
  const critical = recentReports.filter(r => r.priority === "High").length;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar title="Reports & Analytics" />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Reports & Analytics</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <SummaryCard title="Total (demo)" value={String(total)} />
            <SummaryCard title="Open" value={String(open)} />
            <SummaryCard title="Closed" value={String(closed)} />
            <SummaryCard title="Critical" value={String(critical)} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2">
              <ReportsLineChart data={reportsTrend} />
            </div>
            <div>
              <StatusDonut data={reportsByStatus} />
            </div>
          </div>

          <div>
            <RecentReportsTable rows={recentReports} />
          </div>
        </main>
      </div>
    </div>
  );
}
