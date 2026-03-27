import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart({ data }) {
  return (
    <div className="bg-white/5 p-5 rounded-2xl border border-white/10">

      <h3 className="mb-4 text-sm text-gray-400">Revenue</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#aaa" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ef4444"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}