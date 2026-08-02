import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { getCompanyHealth, getDashboardData } from "../services/api";

export default function HealthCard() {
  const [healthScore, setHealthScore] = useState(88); // Default fallback
  const [breakdown, setBreakdown] = useState({
    finance: 92,
    hr: 87,
    sales: 81,
    operations: 89
  });

  useEffect(() => {
    async function fetchHealth() {
      try {
        const [healthRes, companyRes] = await Promise.all([
          getCompanyHealth(),
          getDashboardData()
        ]);
        if (healthRes && healthRes["Company Health Score"] !== undefined) {
          setHealthScore(healthRes["Company Health Score"]);
        }
        if (companyRes) {
          const finScore = Math.round(75 + (companyRes.profit / companyRes.revenue) * 25);
          const hrScore = Math.round(companyRes.employee_satisfaction);
          const salesScore = Math.round(companyRes.customer_satisfaction);
          const opsScore = Math.round(Math.max(60, 100 - companyRes.pending_tasks));
          setBreakdown({
            finance: Math.min(100, Math.max(0, finScore)),
            hr: Math.min(100, Math.max(0, hrScore)),
            sales: Math.min(100, Math.max(0, salesScore)),
            operations: Math.min(100, Math.max(0, opsScore))
          });
        }
      } catch (err) {
        console.error("Failed to load health score details", err);
      }
    }
    fetchHealth();
  }, []);

  return (
    <div className="glass-panel border border-white/5 bg-white/[0.01] rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute -left-10 -bottom-10 w-24 h-24 rounded-full blur-3xl opacity-10 bg-cyan-400 pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-cyan-500/10 p-3 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Activity
            size={28}
            className="text-cyan-400 animate-pulse"
          />
        </div>

        <div>
          <h2 className="text-white text-xl font-bold tracking-tight">
            Company Health
          </h2>

          <p className="text-slate-400 text-xs">
            Overall Performance
          </p>
        </div>
      </div>

      <div className="space-y-5 relative z-10">
        <div>
          <div className="flex justify-between mb-1.5 text-xs font-semibold">
            <span className="text-slate-300 font-semibold">Finance</span>
            <span className="text-emerald-400 font-bold">{breakdown.finance}%</span>
          </div>

          <div className="w-full h-3 bg-slate-950/60 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ 
                width: `${breakdown.finance}%`,
                background: "linear-gradient(90deg, #059669, #34d399)",
                boxShadow: "0 0 10px rgba(52, 211, 153, 0.6)"
              }} 
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1.5 text-xs font-semibold">
            <span className="text-slate-300 font-semibold">HR</span>
            <span className="text-cyan-400 font-bold">{breakdown.hr}%</span>
          </div>

          <div className="w-full h-3 bg-slate-950/60 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ 
                width: `${breakdown.hr}%`,
                background: "linear-gradient(90deg, #0891b2, #22d3ee)",
                boxShadow: "0 0 10px rgba(34, 211, 238, 0.6)"
              }} 
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1.5 text-xs font-semibold">
            <span className="text-slate-300 font-semibold">Sales</span>
            <span className="text-purple-400 font-bold">{breakdown.sales}%</span>
          </div>

          <div className="w-full h-3 bg-slate-950/60 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ 
                width: `${breakdown.sales}%`,
                background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                boxShadow: "0 0 10px rgba(167, 139, 250, 0.6)"
              }} 
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1.5 text-xs font-semibold">
            <span className="text-slate-300 font-semibold">Operations</span>
            <span className="text-pink-400 font-bold">{breakdown.operations}%</span>
          </div>

          <div className="w-full h-3 bg-slate-950/60 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ 
                width: `${breakdown.operations}%`,
                background: "linear-gradient(90deg, #db2777, #f472b6)",
                boxShadow: "0 0 10px rgba(244, 114, 182, 0.6)"
              }} 
            />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center relative z-10 border-t border-white/5 pt-6">
        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          {healthScore}%
        </div>

        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-2">
          Overall Health Score
        </p>
      </div>
    </div>
  );
}