import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import KPICard from "../components/KPICard";
import RevenueChart from "../components/RevenueChart";
import { getDashboardData } from "../services/api";

export default function Finance() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getDashboardData();
        setData(result);
      } catch (err) {
        console.error("Failed to load finance data", err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Finance</h1>
        <p className="text-slate-400">Financial overview and revenue tracking</p>
      </div>

      {data ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <KPICard
              title="Total Revenue"
              value={data.revenue}
              icon={<DollarSign size={28} color="white" />}
              color="#2563EB"
            />
            <KPICard
              title="Total Expenses"
              value={data.expenses}
              icon={<TrendingDown size={28} color="white" />}
              color="#EF4444"
            />
            <KPICard
              title="Net Profit"
              value={data.profit}
              icon={<TrendingUp size={28} color="white" />}
              color="#10B981"
            />
            <KPICard
              title="Cash on Hand"
              value={125000} // Mock data for cash
              icon={<Wallet size={28} color="white" />}
              color="#8B5CF6"
            />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <RevenueChart />
          </div>
        </>
      ) : (
        <div className="text-white">Loading financial data...</div>
      )}
    </div>
  );
}