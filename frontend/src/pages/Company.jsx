import { useEffect, useState } from "react";
import { Building, MapPin, Calendar, FileText } from "lucide-react";
import { getDashboardData } from "../services/api";
import { motion } from "framer-motion";

export default function Company() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getDashboardData();
        setData(result);
      } catch (err) {
        console.error("Failed to load company data", err);
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
          Company Profile
        </h1>
        <p className="text-slate-400 text-sm mt-1">View and manage company details</p>
      </div>

      {data ? (
        <div className="glass-panel border border-white/5 bg-white/[0.01] rounded-2xl p-8 max-w-4xl relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-3xl opacity-10 bg-purple-500 pointer-events-none" />
          
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/5">
            <div className="bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 p-4 rounded-2xl shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <Building size={48} className="text-cyan-400" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">{data.company_name}</h2>
              <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">{data.industry}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-cyan-400 mt-1" size={24} />
                <div>
                  <h3 className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Location</h3>
                  <p className="text-white text-lg font-medium">{data.location || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="text-purple-400 mt-1" size={24} />
                <div>
                  <h3 className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Founded Year</h3>
                  <p className="text-white text-lg font-medium">{data.founded_year || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <FileText className="text-pink-400 mt-1" size={24} />
                <div>
                  <h3 className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Description</h3>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    {data.description || "No description provided."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white">Loading company profile...</div>
      )}
    </motion.div>
  );
}