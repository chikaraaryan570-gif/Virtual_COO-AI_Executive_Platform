import { useEffect, useState } from "react";
import { Users, UserCheck, Heart, UserPlus } from "lucide-react";
import KPICard from "../components/KPICard";
import { getDashboardData } from "../services/api";

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
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Human Resources</h1>
        <p className="text-slate-400">Manage workforce and employee satisfaction</p>
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

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Employee Distribution</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-slate-300 mb-2">
                  <span>Engineering</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-slate-300 mb-2">
                  <span>Sales & Marketing</span>
                  <span>30%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-slate-300 mb-2">
                  <span>Operations</span>
                  <span>15%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-slate-300 mb-2">
                  <span>HR & Admin</span>
                  <span>10%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5">
                  <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-white">Loading HR data...</div>
      )}
    </div>
  );
}