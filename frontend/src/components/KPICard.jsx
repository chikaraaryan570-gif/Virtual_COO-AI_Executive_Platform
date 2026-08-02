import { motion } from "framer-motion";

export default function KPICard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="glass-panel rounded-2xl p-6 relative overflow-hidden group border border-white/5 bg-white/[0.02]"
      style={{
        boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.3), 0 0 10px ${color}15`
      }}
    >
      {/* Background glowing orb */}
      <div 
        className="absolute -right-10 -bottom-10 w-24 h-24 rounded-full blur-2xl opacity-15 transition-all duration-500 group-hover:scale-150 group-hover:opacity-30"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
          <h2 className="mt-3 text-3xl font-black text-white tracking-tight">
            {Number(value).toLocaleString()}
          </h2>
        </div>

        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-lg"
          style={{ 
            background: `linear-gradient(135deg, ${color}cc 0%, ${color}ff 100%)`,
            boxShadow: `0 0 20px ${color}50`
          }}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}