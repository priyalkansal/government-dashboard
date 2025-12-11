import PredictionCard from "../../components/PredictionCard";
import TrendLineChart from "../../components/Charts/TrendLineChart";
import { vulnerabilityAreas, predictedTrend } from "../../mock/predictions";

export default function PredictionsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Predictions & Vulnerability Model</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {vulnerabilityAreas.map((a, i) => (
          <PredictionCard key={i} title={a.name} value={(a.score * 100).toFixed(1) + "%"} />
        ))}
      </div>

      <TrendLineChart data={predictedTrend} />
    </main>
  );
}
