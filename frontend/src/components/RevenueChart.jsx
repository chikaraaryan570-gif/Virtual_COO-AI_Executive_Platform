import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function RevenueChart({ data: dashboardData }) {
  const chartData = [
    { month: "Jan", revenue: dashboardData?.revenue_jan || 0 },
    { month: "Feb", revenue: dashboardData?.revenue_feb || 0 },
    { month: "Mar", revenue: dashboardData?.revenue_mar || 0 },
    { month: "Apr", revenue: dashboardData?.revenue_apr || 0 },
    { month: "May", revenue: dashboardData?.revenue_may || 0 },
    { month: "Jun", revenue: dashboardData?.revenue_jun || 0 },
    { month: "Jul", revenue: dashboardData?.revenue_jul || 0 },
  ];

  return (
    <div className="glass-panel border border-white/5 bg-white/[0.01] rounded-2xl p-6 h-[400px] relative overflow-hidden">
      <h2 className="text-white text-xl font-bold tracking-tight mb-6">
        Revenue Growth
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData}>
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
            tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
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