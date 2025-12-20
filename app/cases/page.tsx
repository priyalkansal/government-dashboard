"use client"; // Required to fetch data on the client side

import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase"; 
import CasesTable from "../../components/CasesTable";
import CaseCard from "../../components/CaseCard";

export default function CasesPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCases() {
      // 1. Fetch from your 'reports' table
      const { data, error } = await supabase
        .from('reports') 
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching cases:", error.message);
      } else if (data) {
        // 2. Map your DB columns to what the CaseCard and CasesTable expect
        const formatted = data.map((item: any) => ({
          id: item.id,
          status: item.status || "Open", // Using your 'status' column
          type: item.type,
          user_email: item.user_email,
          created_at: item.created_at
        }));
        setCases(formatted);
      }
      setLoading(false);
    }

    fetchCases();
  }, []);

  if (loading) return <div className="p-6">Connecting to database...</div>;

  return (
    <main className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Cases</h1>
        <p className="text-sm text-gray-600">All reported cases — filter, search and review.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* We use the real 'cases' state instead of casesData */}
        {cases.slice(0, 3).map(c => (
          <CaseCard key={c.id} c={c} />
        ))}
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">All cases</h2>
        {/* Passing the real database cases here */}
        <CasesTable cases={cases} />
      </section>
    </main>
  );
}