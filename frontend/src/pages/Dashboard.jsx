import { useEffect, useState } from "react";
import {
  DollarSign,
  Users,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

import KPICard from "../components/KPICard";
import HealthCard from "../components/HealthCard";
import RevenueChart from "../components/RevenueChart";

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, "companies", user.id), (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
    });
    return () => unsub();
  }, [user]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-8 p-6"
    >
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
          Executive Dashboard
        </h1>
        <p className="text-slate-400 mt-1 font-medium tracking-wide">
          🌌 AI-Powered Realtime Cosmic Business Intelligence
        </p>
      </div>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="glass-panel relative overflow-hidden rounded-2xl p-6 border border-white/10 bg-gradient-to-r from-purple-950/20 via-cyan-950/20 to-transparent flex flex-col md:flex-row items-center gap-6 shadow-[0_0_20px_rgba(6,182,212,0.05)]"
      >
        <div className="absolute -left-12 -top-12 w-24 h-24 rounded-full bg-cyan-400 blur-2xl opacity-15 animate-pulse" />
        <div className="absolute -right-12 -bottom-12 w-24 h-24 rounded-full bg-purple-500 blur-2xl opacity-15 animate-pulse" />
        
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-500 text-white font-black text-2xl shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          AI
        </div>
        
        <div className="relative z-10">
          <h3 className="text-xs uppercase tracking-widest text-cyan-400 font-bold">COO Recommendation of the Day</h3>
          <p className="mt-1.5 text-slate-200 font-medium leading-relaxed">
            {data?.revenue > 0 ? 
              "Financial net profit margins look steady, but monitor operational bottlenecks and rising pending tasks." 
              : "No company data available yet. Start by generating operations or logging your financial records."}
          </p>
        </div>
      </motion.div>

      {data ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <KPICard
              title="Revenue"
              value={data.revenue || 0}
              icon={<DollarSign size={28} color="white" />}
              color="#2563EB"
            />
            <KPICard
              title="Employees"
              value={data.employees || 0}
              icon={<Users size={28} color="white" />}
              color="#16A34A"
            />
            <KPICard
              title="Profit"
              value={data.profit || 0}
              icon={<TrendingUp size={28} color="white" />}
              color="#9333EA"
            />
            <KPICard
              title="Pending Tasks"
              value={data.pending_tasks || 0}
              icon={<Briefcase size={28} color="white" />}
              color="#F97316"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
            <HealthCard data={data} />
            <RevenueChart data={data} />
          </div>
        </>
      ) : (
        <div className="text-white text-center py-10">Loading dashboard...</div>
      )}
    </motion.div>
  );
}