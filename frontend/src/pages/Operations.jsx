import { useEffect, useState } from "react";
import { Briefcase, AlertCircle, CheckCircle, Clock } from "lucide-react";
import KPICard from "../components/KPICard";
import { getDashboardData } from "../services/api";
import { motion } from "framer-motion";

export default function Operations() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getDashboardData();
        setData(result);
      } catch (err) {
        console.error("Failed to load Operations data", err);
      }
    }
    loadData();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-6"
    >
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
          Operations
        </h1>
        <p className="text-slate-400 text-sm mt-1">Day-to-day operations and task management</p>
      </div>

      {data ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <KPICard
              title="Pending Tasks"
              value={data.pending_tasks}
              icon={<Briefcase size={28} color="white" />}
              color="#F97316"
            />
            <KPICard
              title="Completed Projects"
              value={142} // Mock data
              icon={<CheckCircle size={28} color="white" />}
              color="#10B981"
            />
            <KPICard
              title="Avg Issue Resolution"
              value={4.5} // Mock data in hours
              icon={<Clock size={28} color="white" />}
              color="#3B82F6"
            />
            <KPICard
              title="Critical Alerts"
              value={2} // Mock data
              icon={<AlertCircle size={28} color="white" />}
              color="#EF4444"
            />
          </div>

          <div className="glass-panel border border-white/5 bg-white/[0.01] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Active Operations</h2>
            <div className="grid gap-4">
              <div className="bg-slate-950/20 p-4 rounded-xl flex items-center justify-between border border-white/5 hover:border-orange-500/25 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500/10 p-3 rounded-lg text-orange-400 border border-orange-500/25">
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Server Migration</h3>
                    <p className="text-xs text-slate-400">Due in 2 days</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-orange-400 text-sm font-semibold">In Progress</div>
                  <div className="text-xs text-slate-400 mt-0.5">65% Complete</div>
                </div>
              </div>

              <div className="bg-slate-950/20 p-4 rounded-xl flex items-center justify-between border border-white/5 hover:border-cyan-500/25 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="bg-cyan-500/10 p-3 rounded-lg text-cyan-400 border border-cyan-500/25">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Q3 Marketing Campaign</h3>
                    <p className="text-xs text-slate-400">Due next week</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-cyan-400 text-sm font-semibold">Planning</div>
                  <div className="text-xs text-slate-400 mt-0.5">20% Complete</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-white">Loading Operations data...</div>
      )}
    </motion.div>
  );
}