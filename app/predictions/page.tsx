"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import PredictionCard from "../../components/PredictionCard";
import TrendLineChart from "../../components/Charts/TrendLineChart";
import { predictedTrend } from "../../mock/predictions";

export default function PredictionsPage() {
  const [vulnerabilityData, setVulnerabilityData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function calculateRisk() {
      try {
        // 1. Fetch only the 'type' column to save speed
        const { data, error } = await supabase
          .from('reports')
          .select('type');

        if (error) throw error;

        if (data && data.length > 0) {
          const counts: Record<string, number> = {};
          data.forEach(r => {
            if (r.type) {
              counts[r.type] = (counts[r.type] || 0) + 1;
            }
          });

          const total = data.length;
          const mapped = Object.keys(counts).map(key => ({
            name: key,
            score: (counts[key] / total)
          }));

          setVulnerabilityData(mapped);
        }
      } catch (err) {
        console.error("Prediction Page Error:", err);
      } finally {
        // This ensures that even if there is an error, the "loading" spinner stops
        setLoading(false); 
      }
    }

    calculateRisk();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="animate-pulse text-gray-500">Generating Vulnerability Model...</p>
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Live Vulnerability Model</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {vulnerabilityData.length > 0 ? (
          vulnerabilityData.map((a, i) => (
            <PredictionCard 
              key={i} 
              title={`${a.name} Risk`} 
              value={(a.score * 100).toFixed(1) + "%"} 
            />
          ))
        ) : (
          <div className="col-span-3 p-4 bg-yellow-50 text-yellow-700 rounded">
            No report data found to calculate predictions.
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Predicted Incident Trend</h2>
        <TrendLineChart data={predictedTrend} />
      </div>
    </main>
  );
}