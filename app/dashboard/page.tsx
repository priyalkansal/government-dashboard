// app/dashboard/page.tsx
import Link from "next/link";
import SummaryCard from "../../components/SummaryCard";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import SmallLineChart from "../../components/Charts/LineChart";
import { reportsPerHour } from "../../mock/data";

export default function DashboardPage() {
  const summary = [
    { title: "Total Reports", value: "1,234" },
    { title: "Pending Approval", value: "57" },
    { title: "Assigned to NGOs", value: "320" },
  ];

  const demoData = reportsPerHour;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar title="Government Dashboard" />

        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {summary.map((s) => (
              <SummaryCard key={s.title} title={s.title} value={s.value} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <SmallLineChart data={demoData} title="Reports per hour" />
            <SmallLineChart
              data={demoData.map((d) => ({ name: d.name, value: Math.floor(d.value * 0.6) }))}
              title="Avg response (demo)"
            />
            <SmallLineChart
              data={demoData.map((d, i) => ({ name: d.name, value: (i + 1) * 10 }))}
              title="Assigned cases (demo)"
            />
          </div>

          <div className="bg-white p-4 rounded shadow mt-6">
            <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>

            <div className="space-x-2">
              <Link href="/cases" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">
                View Cases
              </Link>
              <Link href="/reports" className="inline-block bg-gray-200 px-4 py-2 rounded">
                Reports
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
