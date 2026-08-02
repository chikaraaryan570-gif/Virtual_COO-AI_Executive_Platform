import { useEffect, useState } from "react";
import { Users, UserCheck, Heart, UserPlus } from "lucide-react";
import KPICard from "../components/KPICard";
import { getDashboardData } from "../services/api";
import { motion } from "framer-motion";

export default function HR() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getDashboardData();
        setData(result);
      } catch (err) {
        console.error("Failed to load HR data", err);
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
          Human Resources
        </h1>
        <p className="text-slate-400 text-sm mt-1">Manage workforce and employee satisfaction</p>
      </div>

      {data ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <KPICard
              title="Total Employees"
              value={data.employees}
              icon={<Users size={28} color="white" />}
              color="#3B82F6"
            />
            <KPICard
              title="Employee Satisfaction"
              value={data.employee_satisfaction}
              icon={<Heart size={28} color="white" />}
              color="#F43F5E"
            />
            <KPICard
              title="Active Roles"
              value={15} // Mock data
              icon={<UserCheck size={28} color="white" />}
              color="#10B981"
            />
            <KPICard
              title="Open Positions"
              value={3} // Mock data
              icon={<UserPlus size={28} color="white" />}
              color="#8B5CF6"
            />
          </div>

          <div className="glass-panel border border-white/5 bg-white/[0.01] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Employee Distribution</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span>Engineering</span>
                  <span className="text-cyan-400 font-bold">45%</span>
                </div>
                <div className="w-full bg-slate-950/50 rounded-full h-3 overflow-hidden border border-white/5">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: '45%',
                      background: "linear-gradient(90deg, #0891b2, #22d3ee)",
                      boxShadow: "0 0 10px rgba(34, 211, 238, 0.6)"
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span>Sales & Marketing</span>
                  <span className="text-purple-400 font-bold">30%</span>
                </div>
                <div className="w-full bg-slate-950/50 rounded-full h-3 overflow-hidden border border-white/5">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: '30%',
                      background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                      boxShadow: "0 0 10px rgba(167, 139, 250, 0.6)"
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span>Operations</span>
                  <span className="text-emerald-400 font-bold">15%</span>
                </div>
                <div className="w-full bg-slate-950/50 rounded-full h-3 overflow-hidden border border-white/5">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: '15%',
                      background: "linear-gradient(90deg, #059669, #34d399)",
                      boxShadow: "0 0 10px rgba(52, 211, 153, 0.6)"
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span>HR & Admin</span>
                  <span className="text-pink-400 font-bold">10%</span>
                </div>
                <div className="w-full bg-slate-950/50 rounded-full h-3 overflow-hidden border border-white/5">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: '10%',
                      background: "linear-gradient(90deg, #db2777, #f472b6)",
                      boxShadow: "0 0 10px rgba(244, 114, 182, 0.6)"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-white">Loading HR data...</div>
      )}
    </motion.div>
  );
}