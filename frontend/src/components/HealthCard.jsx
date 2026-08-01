import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { getCompanyHealth } from "../services/api";

export default function HealthCard() {
  const [healthScore, setHealthScore] = useState(88); // Default fallback

  useEffect(() => {
    async function fetchHealth() {
      try {
        const result = await getCompanyHealth();
        if (result && result["Company Health Score"]) {
          setHealthScore(result["Company Health Score"]);
        }
      } catch (err) {
        console.error("Failed to load health score", err);
      }
    }
    fetchHealth();
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-500/20 p-3 rounded-xl">
          <Activity
            size={28}
            color="#22c55e"
          />
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold">
            Company Health
          </h2>

          <p className="text-slate-400 text-sm">
            Overall Performance
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-slate-300">Finance</span>
            <span className="text-green-400 font-semibold">92%</span>
          </div>

          <div className="w-full h-2 bg-slate-700 rounded-full">
            <div className="h-2 bg-green-500 rounded-full w-[92%]" />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-slate-300">HR</span>
            <span className="text-blue-400 font-semibold">87%</span>
          </div>

          <div className="w-full h-2 bg-slate-700 rounded-full">
            <div className="h-2 bg-blue-500 rounded-full w-[87%]" />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-slate-300">Sales</span>
            <span className="text-purple-400 font-semibold">81%</span>
          </div>

          <div className="w-full h-2 bg-slate-700 rounded-full">
            <div className="h-2 bg-purple-500 rounded-full w-[81%]" />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-slate-300">Operations</span>
            <span className="text-orange-400 font-semibold">89%</span>
          </div>

          <div className="w-full h-2 bg-slate-700 rounded-full">
            <div className="h-2 bg-orange-500 rounded-full w-[89%]" />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="text-5xl font-bold text-green-400">
          {healthScore}%
        </div>

        <p className="text-slate-400 mt-2">
          Overall Health Score
        </p>
      </div>
    </div>
  );
}