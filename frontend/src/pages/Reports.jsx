import { FileText, Download, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function Reports() {
  const reports = []; // Removed fake reports

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
        <button className="flex items-center gap-2 bg-slate-950/40 hover:bg-white/5 text-white px-4 py-2.5 rounded-lg border border-white/5 transition-all duration-300 font-semibold text-xs tracking-wider uppercase">
          <Filter size={16} className="text-cyan-400" />
          <span>Filter</span>
        </button>
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
                    <button className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
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
    </motion.div>
  );
}