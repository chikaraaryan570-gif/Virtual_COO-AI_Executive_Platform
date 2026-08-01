import { useEffect, useState } from "react";
import {
  DollarSign,
  Users,
  Briefcase,
  TrendingUp,
} from "lucide-react";

import KPICard from "../components/KPICard";
import HealthCard from "../components/HealthCard";
import RevenueChart from "../components/RevenueChart";
import { getDashboardData } from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getDashboardData();
        setData(result);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Executive Dashboard
        </h1>

        <p className="text-slate-400">
          AI Powered Business Overview
        </p>
      </div>

      {data ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <KPICard
              title="Revenue"
              value={data.revenue}
              icon={<DollarSign size={28} color="white" />}
              color="#2563EB"
            />

            <KPICard
              title="Employees"
              value={data.employees}
              icon={<Users size={28} color="white" />}
              color="#16A34A"
            />

            <KPICard
              title="Profit"
              value={data.profit}
              icon={<TrendingUp size={28} color="white" />}
              color="#9333EA"
            />

            <KPICard
              title="Pending Tasks"
              value={data.pending_tasks}
              icon={<Briefcase size={28} color="white" />}
              color="#F97316"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
            <HealthCard />
            <RevenueChart />
          </div>
        </>
      ) : (
        <div className="text-white text-center py-10">Loading dashboard...</div>
      )}
    </div>
  );
}