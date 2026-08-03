import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, Wallet, Edit2 } from "lucide-react";
import KPICard from "../components/KPICard";
import RevenueChart from "../components/RevenueChart";
import { updateDashboardData } from "../services/api";
import { motion } from "framer-motion";
import EditDataModal from "../components/EditDataModal";
import toast from "react-hot-toast";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function Finance() {
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
      // Backend expects the auth token, we'll configure axios interceptor later for this.
      await updateDashboardData(updatedData);
      toast.success("Finance data updated successfully!");
    } catch (err) {
      toast.error("Failed to update finance data");
    }
  };

  const fields = [
    { name: "revenue", label: "Total Revenue", type: "number" },
    { name: "expenses", label: "Total Expenses", type: "number" },
    { name: "profit", label: "Net Profit", type: "number" },
    { name: "cash_on_hand", label: "Cash on Hand", type: "number" },
    { name: "revenue_jan", label: "Jan Revenue", type: "number" },
    { name: "revenue_feb", label: "Feb Revenue", type: "number" },
    { name: "revenue_mar", label: "Mar Revenue", type: "number" },
    { name: "revenue_apr", label: "Apr Revenue", type: "number" },
    { name: "revenue_may", label: "May Revenue", type: "number" },
    { name: "revenue_jun", label: "Jun Revenue", type: "number" },
    { name: "revenue_jul", label: "Jul Revenue", type: "number" },
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
            Finance
          </h1>
          <p className="text-slate-400 text-sm mt-1">Financial overview and revenue tracking</p>
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
              title="Total Revenue"
              value={data.revenue || 0}
              icon={<DollarSign size={28} color="white" />}
              color="#2563EB"
            />
            <KPICard
              title="Total Expenses"
              value={data.expenses || 0}
              icon={<TrendingDown size={28} color="white" />}
              color="#EF4444"
            />
            <KPICard
              title="Net Profit"
              value={data.profit || 0}
              icon={<TrendingUp size={28} color="white" />}
              color="#10B981"
            />
            <KPICard
              title="Cash on Hand"
              value={data.cash_on_hand || 0}
              icon={<Wallet size={28} color="white" />}
              color="#8B5CF6"
            />
          </div>

          <div>
            <RevenueChart data={data} />
          </div>
        </>
      ) : (
        <div className="text-white">Loading financial data...</div>
      )}

      <EditDataModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
        title="Edit Finance Data"
        fields={fields}
        initialData={data}
      />
    </motion.div>
  );
}