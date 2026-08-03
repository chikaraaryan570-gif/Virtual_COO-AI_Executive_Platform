import { Activity } from "lucide-react";

export default function HealthCard({ data }) {
  // Safe defaults if data is missing
  const revenue = data?.revenue || 0;
  const profit = data?.profit || 0;
  const empSat = data?.employee_satisfaction || 0;
  const custSat = data?.customer_satisfaction || 0;
  const pendingTasks = data?.pending_tasks || 0;

  // Calculate scores dynamically based on the formula requirement
  const finScore = revenue > 0 ? Math.round(75 + (profit / revenue) * 25) : 0;
  const hrScore = Math.round(empSat);
  const salesScore = Math.round(custSat);
  const opsScore = Math.round(Math.max(0, 100 - pendingTasks)); // 1 task = -1 point from 100
  
  const finance = Math.min(100, Math.max(0, finScore));
  const hr = Math.min(100, Math.max(0, hrScore));
  const sales = Math.min(100, Math.max(0, salesScore));
  const operations = Math.min(100, Math.max(0, opsScore));

  const healthScore = Math.round((finance + hr + sales + operations) / 4) || 0;

  return (
    <div className="glass-panel border border-white/5 bg-white/[0.01] rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute -left-10 -bottom-10 w-24 h-24 rounded-full blur-3xl opacity-10 bg-cyan-400 pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-cyan-500/10 p-3 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Activity size={28} className="text-cyan-400 animate-pulse" />
        </div>
        <div>
          <h2 className="text-white text-xl font-bold tracking-tight">
            Company Health
          </h2>
          <p className="text-slate-400 text-xs">Overall Performance</p>
        </div>
      </div>

      <div className="space-y-5 relative z-10">
        <div>
          <div className="flex justify-between mb-1.5 text-xs font-semibold">
            <span className="text-slate-300 font-semibold">Finance</span>
            <span className="text-emerald-400 font-bold">{finance}%</span>
          </div>
          <div className="w-full h-3 bg-slate-950/60 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ width: `${finance}%`, background: "linear-gradient(90deg, #059669, #34d399)", boxShadow: "0 0 10px rgba(52, 211, 153, 0.6)" }} 
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1.5 text-xs font-semibold">
            <span className="text-slate-300 font-semibold">HR</span>
            <span className="text-cyan-400 font-bold">{hr}%</span>
          </div>
          <div className="w-full h-3 bg-slate-950/60 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ width: `${hr}%`, background: "linear-gradient(90deg, #0891b2, #22d3ee)", boxShadow: "0 0 10px rgba(34, 211, 238, 0.6)" }} 
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1.5 text-xs font-semibold">
            <span className="text-slate-300 font-semibold">Sales</span>
            <span className="text-purple-400 font-bold">{sales}%</span>
          </div>
          <div className="w-full h-3 bg-slate-950/60 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ width: `${sales}%`, background: "linear-gradient(90deg, #7c3aed, #a78bfa)", boxShadow: "0 0 10px rgba(167, 139, 250, 0.6)" }} 
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1.5 text-xs font-semibold">
            <span className="text-slate-300 font-semibold">Operations</span>
            <span className="text-pink-400 font-bold">{operations}%</span>
          </div>
          <div className="w-full h-3 bg-slate-950/60 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ width: `${operations}%`, background: "linear-gradient(90deg, #db2777, #f472b6)", boxShadow: "0 0 10px rgba(244, 114, 182, 0.6)" }} 
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