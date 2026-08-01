import { useEffect, useState } from "react";
import { Briefcase, AlertCircle, CheckCircle, Clock } from "lucide-react";
import KPICard from "../components/KPICard";
import { getDashboardData } from "../services/api";

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
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Operations</h1>
        <p className="text-slate-400">Day-to-day operations and task management</p>
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

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Active Operations</h2>
            <div className="grid gap-4">
              <div className="bg-slate-800 p-4 rounded-xl flex items-center justify-between border border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500/20 p-3 rounded-lg text-orange-400">
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Server Migration</h3>
                    <p className="text-sm text-slate-400">Due in 2 days</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-orange-400 font-medium">In Progress</div>
                  <div className="text-sm text-slate-400">65% Complete</div>
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-xl flex items-center justify-between border border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Q3 Marketing Campaign</h3>
                    <p className="text-sm text-slate-400">Due next week</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-blue-400 font-medium">Planning</div>
                  <div className="text-sm text-slate-400">20% Complete</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-white">Loading Operations data...</div>
      )}
    </div>
  );
}