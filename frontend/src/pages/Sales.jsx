import { useEffect, useState } from "react";
import { TrendingUp, Users, Target, Activity } from "lucide-react";
import KPICard from "../components/KPICard";
import { getDashboardData } from "../services/api";

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
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Sales</h1>
        <p className="text-slate-400">Sales performance and customer metrics</p>
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

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Deals Pipeline</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-slate-800 text-slate-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 rounded-l-lg">Client</th>
                    <th scope="col" className="px-6 py-3">Value</th>
                    <th scope="col" className="px-6 py-3">Stage</th>
                    <th scope="col" className="px-6 py-3 rounded-r-lg">Probability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="px-6 py-4 font-medium text-white">Acme Corp</td>
                    <td className="px-6 py-4">$45,000</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-md">Negotiation</span></td>
                    <td className="px-6 py-4">80%</td>
                  </tr>
                  <tr className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="px-6 py-4 font-medium text-white">Globex Inc</td>
                    <td className="px-6 py-4">$12,500</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-md">Proposal</span></td>
                    <td className="px-6 py-4">40%</td>
                  </tr>
                  <tr className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="px-6 py-4 font-medium text-white">Soylent Corp</td>
                    <td className="px-6 py-4">$89,000</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-md">Closed Won</span></td>
                    <td className="px-6 py-4">100%</td>
                  </tr>
                  <tr className="hover:bg-slate-800/50">
                    <td className="px-6 py-4 font-medium text-white">Initech</td>
                    <td className="px-6 py-4">$3,200</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-md">Discovery</span></td>
                    <td className="px-6 py-4">20%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="text-white">Loading Sales data...</div>
      )}
    </div>
  );
}