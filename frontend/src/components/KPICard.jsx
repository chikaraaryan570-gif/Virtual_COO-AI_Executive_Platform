import { motion } from "framer-motion";

export default function KPICard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {Number(value).toLocaleString()}
          </h2>
        </div>

        <div
          className="flex h-14 w-14 items-center justify-center rounded-xl"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}