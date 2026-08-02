import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 180000 },
  { month: "Mar", revenue: 250000 },
  { month: "Apr", revenue: 320000 },
  { month: "May", revenue: 450000 },
  { month: "Jun", revenue: 620000 },
  { month: "Jul", revenue: 850000 },
];

export default function RevenueChart() {
  return (
    <div className="glass-panel border border-white/5 bg-white/[0.01] rounded-2xl p-6 h-[400px] relative overflow-hidden">
      <h2 className="text-white text-xl font-bold tracking-tight mb-6">
        Revenue Growth
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <defs>
            <linearGradient id="revenueGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="50%" stopColor="#9d4edd" />
              <stop offset="100%" stopColor="#ff007f" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.03)" strokeDasharray="5 5" />

          <XAxis
            dataKey="month"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
          />

          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            tickFormatter={(v) => `$${v / 1000}k`}
          />

          <Tooltip 
            contentStyle={{ 
              background: "rgba(10, 6, 30, 0.8)", 
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)",
              color: "#fff"
            }}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="url(#revenueGlow)"
            strokeWidth={4}
            dot={{ r: 5, fill: "#00f2fe", stroke: "#0b001a", strokeWidth: 2 }}
            activeDot={{ r: 8, fill: "#ff007f", stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}