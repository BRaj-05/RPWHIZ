import { useStore } from "../../../context/StoreContext";
import RevenueChart from "../dashboard/RevenueChart";
import OrdersTable from "../dashboard/OrdersTable";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { orders, products, users } = useStore();

  // ✅ TOTAL REVENUE
  const totalRevenue = orders.reduce(
    (a, o) => a + (o.grandTotal || 0),
    0
  );

  // ✅ CHART DATA
  const chartData = orders.map((o, i) => ({
    name: `#${i + 1}`,
    value: o.grandTotal || 0,
  }));

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
          Live
        </span>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard title="Revenue" value={`₹${totalRevenue}`} />
        <StatCard title="Orders" value={orders.length} />
        <StatCard title="Products" value={products.length} />
        <StatCard title="Users" value={users.length || 0} />

      </div>

      {/* ================= CHART + TABLE ================= */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* CHART */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <RevenueChart data={chartData} />
        </motion.div>

        {/* TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <OrdersTable orders={orders.slice(0, 5)} />
        </motion.div>

      </div>

      {/* ================= EXTRA INSIGHTS ================= */}
      <div className="grid md:grid-cols-3 gap-6">

        <InsightCard
          title="Avg Order Value"
          value={`₹${(totalRevenue / (orders.length || 1)).toFixed(0)}`}
        />

        <InsightCard
          title="Conversion"
          value={`${(orders.length * 3.2).toFixed(1)}%`}
        />

        <InsightCard
          title="Growth"
          value="+12%"
        />

      </div>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl"
    >
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
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