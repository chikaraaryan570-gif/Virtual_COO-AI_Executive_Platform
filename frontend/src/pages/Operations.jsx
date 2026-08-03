import { useEffect, useState } from "react";
import { Briefcase, AlertCircle, CheckCircle, Clock, Edit2 } from "lucide-react";
import KPICard from "../components/KPICard";
import { updateDashboardData } from "../services/api";
import { motion } from "framer-motion";
import EditDataModal from "../components/EditDataModal";
import toast from "react-hot-toast";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function Operations() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, "companies", user.id), (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
    });
    return () => unsub();
  }, [user]);

  const handleSave = async (updatedData) => {
    try {
      await updateDashboardData(updatedData);
      toast.success("Operations data updated successfully!");
    } catch (err) {
      toast.error("Failed to update Operations data");
    }
  };

  const fields = [
    { name: "pending_tasks", label: "Pending Tasks", type: "number" },
    { name: "completed_projects", label: "Completed Projects", type: "number" },
    { name: "avg_issue_resolution", label: "Avg Issue Resolution (hrs)", type: "number" },
    { name: "critical_alerts", label: "Critical Alerts", type: "number" },
    { name: "active_operations", label: "Active Operations (One per line)", type: "textarea", placeholder: "e.g. Q3 Server Migration\nNew CRM Integration\nOffice Expansion" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
            Operations
          </h1>
          <p className="text-slate-400 text-sm mt-1">Day-to-day operations and task management</p>
        </div>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
        >
          <Edit2 size={16} /> Edit Data
        </button>
      </div>

      {data ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <KPICard
              title="Pending Tasks"
              value={data.pending_tasks || 0}
              icon={<Briefcase size={28} color="white" />}
              color="#F97316"
            />
            <KPICard
              title="Completed Projects"
              value={data.completed_projects || 0}
              icon={<CheckCircle size={28} color="white" />}
              color="#10B981"
            />
            <KPICard
              title="Avg Issue Resolution"
              value={data.avg_issue_resolution || 0}
              icon={<Clock size={28} color="white" />}
              color="#3B82F6"
            />
            <KPICard
              title="Critical Alerts"
              value={data.critical_alerts || 0}
              icon={<AlertCircle size={28} color="white" />}
              color="#EF4444"
            />
          </div>

          <div className="glass-panel border border-white/5 bg-white/[0.01] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Active Operations</h2>
            {data.active_operations && data.active_operations.trim() !== "" ? (
              <div className="space-y-3">
                {data.active_operations.split('\n').filter(item => item.trim() !== "").map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-900/50 rounded-xl border border-white/10 flex items-center justify-between">
                    <span className="text-white font-medium">{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-400 text-sm py-4 text-center">
                No active operations or tasks.
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-white">Loading Operations data...</div>
      )}

      <EditDataModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
        title="Edit Operations Data"
        fields={fields}
        initialData={data}
      />
    </motion.div>
  );
}