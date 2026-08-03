import { useEffect, useState } from "react";
import { FileText, Download, Filter, Edit2 } from "lucide-react";
import { updateDashboardData } from "../services/api";
import { motion } from "framer-motion";
import EditDataModal from "../components/EditDataModal";
import toast from "react-hot-toast";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function Reports() {
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
      toast.success("Reports updated successfully!");
    } catch (err) {
      toast.error("Failed to update Reports");
    }
  };

  const fields = [
    { name: "reports_list", label: "Reports (Format: Name | Department)", type: "textarea", placeholder: "e.g. Q1 Financials | Finance\nEmployee Survey | HR" },
  ];

  // Parse reports list
  const reportsLines = data?.reports_list ? data.reports_list.split('\n').filter(line => line.trim() !== "") : [];
  const reports = reportsLines.map((line, idx) => {
     const parts = line.split('|');
     return {
       id: idx,
       title: parts[0]?.trim() || "Untitled Report",
       type: parts[1]?.trim() || "General",
       date: new Date().toLocaleDateString(),
       size: "1.2 MB"
     };
  });

  const handleDownload = (report) => {
    const content = `Report Title: ${report.title}\nDepartment: ${report.type}\nDate: ${report.date}\n\nThis is a generated report file.`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.title.replace(/\s+/g, "_").toLowerCase()}_report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${report.title}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-6"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
            Reports
          </h1>
          <p className="text-slate-400 text-sm mt-1">View and download business reports</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-slate-950/40 hover:bg-white/5 text-white px-4 py-2.5 rounded-xl border border-white/5 transition-all duration-300 font-semibold text-xs tracking-wider uppercase">
            <Filter size={16} className="text-cyan-400" />
            <span>Filter</span>
          </button>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/20 border border-white/5"
          >
            <Edit2 size={16} /> Edit Data
          </button>
        </div>
      </div>

      <div className="glass-panel border border-white/5 bg-white/[0.01] rounded-2xl overflow-hidden">
        {reports.length > 0 ? (
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/40 text-slate-400 border-b border-white/5">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Report Name</th>
                <th scope="col" className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Department</th>
                <th scope="col" className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Date</th>
                <th scope="col" className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Size</th>
                <th scope="col" className="px-6 py-4 font-semibold uppercase text-xs tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-white/[0.02] transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-cyan-500/10 p-2 rounded-lg text-cyan-400 border border-cyan-500/25">
                        <FileText size={18} />
                      </div>
                      <span className="font-semibold text-white">{report.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-950/60 px-3 py-1 rounded-full text-xs font-semibold border border-white/5 text-slate-300">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-400">{report.date}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-400">{report.size}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDownload(report)}
                      className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                    >
                      <Download size={18} className="hover:text-cyan-400 transition-colors" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-slate-400 text-sm py-8 text-center">
            No reports available.
          </div>
        )}
      </div>

      <EditDataModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
        title="Edit Reports"
        fields={fields}
        initialData={data || {}}
      />
    </motion.div>
  );
}