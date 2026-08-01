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
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[400px]">
      <h2 className="text-white text-xl font-semibold mb-6">
        Revenue Growth
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}