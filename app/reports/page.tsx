"use client"; 

import { useEffect, useState } from "react";
import { supabase } from "../../supabase"; 
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import SummaryCard from "../../components/SummaryCard";
import ReportsLineChart from "../../components/Charts/ReportsLineChart";
import StatusDonut from "../../components/Charts/StatusDonut";
import RecentReportsTable from "../../components/RecentReportsTable";

// We keep these for the visual charts until you are ready to map those too
import { reportsTrend, reportsByStatus } from "../../mock/reports";

export default function ReportsPage() {
  const [dbReports, setDbReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      // 1. We fetch from your actual table (change 'reports' to your table name)
      const { data, error } = await supabase
        .from('reports') 
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Supabase Error:", error.message);
      } else if (data) {
        // 2. We transform your data slightly so the Table component understands it
        const formattedData = data.map((report: any) => ({
          id: report.id.slice(0, 8), // Shortens the UUID for the display
          title: report.details || "No Details Provided", // Maps 'details' to 'title'
          priority: "Medium", // Default since your DB doesn't have a priority column
          status: report.type || "General", // Maps 'type' to 'status'
          email: report.user_email
        }));
        setDbReports(formattedData);
      }
      setLoading(false);
    }

    fetchReports();
  }, []);

  // 3. Updated Logic based on your column 'type'
  const total = dbReports.length;
  const critical = dbReports.filter(r => r.priority === "High").length;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar title="Reports & Analytics" />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Reports & Analytics</h1>

          {loading ? (
            <p>Connecting to Government Database...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <SummaryCard title="Total Reports" value={String(total)} />
                <SummaryCard title="Recent Type" value={dbReports[0]?.status || "N/A"} />
                <SummaryCard title="Active Users" value={String(new Set(dbReports.map(r => r.email)).size)} />
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
                <RecentReportsTable rows={dbReports} />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}