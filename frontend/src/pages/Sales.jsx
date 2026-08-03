import { useEffect, useState } from "react";
import { TrendingUp, Users, Target, Activity, Edit2 } from "lucide-react";
import KPICard from "../components/KPICard";
import { updateDashboardData } from "../services/api";
import { motion } from "framer-motion";
import EditDataModal from "../components/EditDataModal";
import toast from "react-hot-toast";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function Sales() {
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
      toast.success("Sales data updated successfully!");
    } catch (err) {
      toast.error("Failed to update Sales data");
    }
  };

  const fields = [
    { name: "sales_growth", label: "Sales Growth (%)", type: "number" },
    { name: "customer_satisfaction", label: "Customer Satisfaction", type: "number" },
    { name: "conversion_rate", label: "Conversion Rate (%)", type: "number" },
    { name: "active_deals", label: "Active Deals", type: "number" },
    { name: "recent_deals", label: "Recent Deals (One per line)", type: "textarea", placeholder: "e.g. Enterprise License - $50k\nCloud Migration - $120k" },
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
            Sales
          </h1>
          <p className="text-slate-400 text-sm mt-1">Sales performance and customer metrics</p>
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
              title="Sales Growth (%)"
              value={data.sales_growth || 0}
              icon={<TrendingUp size={28} color="white" />}
              color="#3B82F6"
            />
            <KPICard
              title="Customer Satisfaction"
              value={data.customer_satisfaction || 0}
              icon={<Users size={28} color="white" />}
              color="#10B981"
            />
            <KPICard
              title="Conversion Rate (%)"
              value={data.conversion_rate || 0}
              icon={<Target size={28} color="white" />}
              color="#F59E0B"
            />
            <KPICard
              title="Active Deals"
              value={data.active_deals || 0}
              icon={<Activity size={28} color="white" />}
              color="#8B5CF6"
            />
          </div>

          <div className="glass-panel border border-white/5 bg-white/[0.01] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Recent Deals Pipeline</h2>
            {data.recent_deals && data.recent_deals.trim() !== "" ? (
              <div className="space-y-3">
                {data.recent_deals.split('\n').filter(item => item.trim() !== "").map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-900/50 rounded-xl border border-white/10 flex items-center justify-between">
                    <span className="text-white font-medium">{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-400 text-sm py-4 text-center">
                No active deals found.
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-white">Loading Sales data...</div>
      )}

      <EditDataModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
        title="Edit Sales Data"
        fields={fields}
        initialData={data}
      />
    </motion.div>
  );
}