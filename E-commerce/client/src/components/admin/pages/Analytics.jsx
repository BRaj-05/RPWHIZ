import AdminLayout from "../layout/AdminLayout";
import { useStore } from "../../../context/StoreContext";
import RevenueChart from "../dashboard/RevenueChart";
import { motion } from "framer-motion";

export default function Analytics() {
  const { orders } = useStore();

  const totalRevenue = orders.reduce(
    (a, o) => a + (o.grandTotal || 0),
    0
  );

  const chartData = orders.map((o, i) => ({
    name: `#${i + 1}`,
    value: o.grandTotal || 0,
  }));

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold">Analytics</h1>

      {/* METRICS */}
      <div className="grid md:grid-cols-3 gap-6 mt-4">

        <Metric title="Revenue" value={`₹${totalRevenue}`} />
        <Metric title="Orders" value={orders.length} />
        <Metric
          title="Avg Order"
          value={`₹${(totalRevenue / (orders.length || 1)).toFixed(0)}`}
        />

      </div>

      {/* CHART */}
      <div className="mt-6">
        <RevenueChart data={chartData} />
      </div>

      {/* INSIGHTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">

        <InsightCard
          title="Growth"
          value="+12%"
        />

        <InsightCard
          title="Conversion"
          value={`${(orders.length * 3.2).toFixed(1)}%`}
        />

      </div>
    </AdminLayout>
  );
}

/* COMPONENTS */

function Metric({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/5 border border-white/10 p-5 rounded-2xl"
    >
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-xl font-bold mt-2">{value}</h2>
    </motion.div>
  );
}

function InsightCard({ title, value }) {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-lg font-semibold mt-2">{value}</h2>
    </div>
  );
}