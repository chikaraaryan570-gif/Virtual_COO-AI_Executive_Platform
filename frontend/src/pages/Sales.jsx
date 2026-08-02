import { useEffect, useState } from "react";
import { TrendingUp, Users, Target, Activity } from "lucide-react";
import KPICard from "../components/KPICard";
import { getDashboardData } from "../services/api";
import { motion } from "framer-motion";

export default function Sales() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getDashboardData();
        setData(result);
      } catch (err) {
        console.error("Failed to load Sales data", err);
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
          Sales
        </h1>
        <p className="text-slate-400 text-sm mt-1">Sales performance and customer metrics</p>
      </div>

      {data ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <KPICard
              title="Sales Growth (%)"
              value={data.sales_growth}
              icon={<TrendingUp size={28} color="white" />}
              color="#3B82F6"
            />
            <KPICard
              title="Customer Satisfaction"
              value={data.customer_satisfaction}
              icon={<Users size={28} color="white" />}
              color="#10B981"
            />
            <KPICard
              title="Conversion Rate (%)"
              value={12.4} // Mock data
              icon={<Target size={28} color="white" />}
              color="#F59E0B"
            />
            <KPICard
              title="Active Deals"
              value={42} // Mock data
              icon={<Activity size={28} color="white" />}
              color="#8B5CF6"
            />
          </div>

          <div className="glass-panel border border-white/5 bg-white/[0.01] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Recent Deals Pipeline</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-slate-950/40 text-slate-400 border-b border-white/5">
                  <tr>
                    <th scope="col" className="px-6 py-4 rounded-l-lg">Client</th>
                    <th scope="col" className="px-6 py-4">Value</th>
                    <th scope="col" className="px-6 py-4">Stage</th>
                    <th scope="col" className="px-6 py-4 rounded-r-lg">Probability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200">
                    <td className="px-6 py-4 font-semibold text-white">Acme Corp</td>
                    <td className="px-6 py-4 font-medium">$45,000</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md text-xs font-semibold">Negotiation</span></td>
                    <td className="px-6 py-4 font-semibold text-cyan-400">80%</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200">
                    <td className="px-6 py-4 font-semibold text-white">Globex Inc</td>
                    <td className="px-6 py-4 font-medium">$12,500</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md text-xs font-semibold">Proposal</span></td>
                    <td className="px-6 py-4 font-semibold text-amber-400">40%</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200">
                    <td className="px-6 py-4 font-semibold text-white">Soylent Corp</td>
                    <td className="px-6 py-4 font-medium">$89,000</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-semibold">Closed Won</span></td>
                    <td className="px-6 py-4 font-semibold text-emerald-400">100%</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200">
                    <td className="px-6 py-4 font-semibold text-white">Initech</td>
                    <td className="px-6 py-4 font-medium">$3,200</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md text-xs font-semibold">Discovery</span></td>
                    <td className="px-6 py-4 font-semibold text-purple-400">20%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="text-white">Loading Sales data...</div>
      )}
    </motion.div>
  );
}