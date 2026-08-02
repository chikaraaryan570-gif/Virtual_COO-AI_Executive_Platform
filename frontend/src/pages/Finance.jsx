import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import KPICard from "../components/KPICard";
import RevenueChart from "../components/RevenueChart";
import { getDashboardData } from "../services/api";
import { motion } from "framer-motion";

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
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-6"
    >
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
          Finance
        </h1>
        <p className="text-slate-400 text-sm mt-1">Financial overview and revenue tracking</p>
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

          <div>
            <RevenueChart />
          </div>
        </>
      ) : (
        <div className="text-white">Loading financial data...</div>
      )}
    </motion.div>
  );
}