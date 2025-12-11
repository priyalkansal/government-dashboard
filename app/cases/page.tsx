// app/cases/page.tsx
import React from "react";
import { casesData } from "../../mock/cases";
import CasesTable from "../../components/CasesTable";
import CaseCard from "../../components/CaseCard";

export default function CasesPage() {
  // server component: we pass mock data down to client components
  return (
    <main className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Cases</h1>
        <p className="text-sm text-gray-600">All reported cases — filter, search and review.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* show a few highlight cards */}
        {casesData.slice(0, 3).map(c => (
          <CaseCard key={c.id} c={c} />
        ))}
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">All cases</h2>
        <CasesTable cases={casesData} />
      </section>
    </main>
  );
}
