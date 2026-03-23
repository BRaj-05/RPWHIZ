/* -------------------------------------------------------
   ADMIN DASHBOARD
   -------------------------------------------------------
   This version includes:
   - left sidebar
   - stats cards
   - order activity
   - top products
   - quick actions
-------------------------------------------------------- */
export default function AdminDashboard() {
  const navItems = [
    "Overview",
    "Products",
    "Orders",
    "Customers",
    "Analytics",
    "Settings",
  ];

  const stats = [
    { label: "Total Revenue", value: "₹12,48,650", hint: "+18% this month", accent: true },
    { label: "Orders", value: "8,432", hint: "+12% this week" },
    { label: "Customers", value: "52,180", hint: "+9% this month" },
    { label: "Conversion Rate", value: "3.8%", hint: "Stable performance" },
  ];

  const recentOrders = [
    { id: "#ORD-1041", customer: "Aarav Mehta", total: "₹4,299", status: "Paid" },
    { id: "#ORD-1042", customer: "Sara Khan", total: "₹5,999", status: "Processing" },
    { id: "#ORD-1043", customer: "Ishaan Roy", total: "₹899", status: "Shipped" },
  ];

  const topProducts = [
    { name: "Silk Slip Dress", sold: "124 sold" },
    { name: "Wireless Earbuds Pro", sold: "98 sold" },
    { name: "Mini Crossbody Bag", sold: "76 sold" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-500">
            Admin Panel
          </p>
          <h2 className="mt-3 text-2xl font-semibold">Shopora</h2>

          <div className="mt-6 space-y-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
                  index === 0
                    ? "bg-black text-white"
                    : "bg-transparent text-[var(--muted)] hover:bg-black/5"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-black p-5 text-white">
            <p className="text-sm text-white/70">Store Health</p>
            <h3 className="mt-2 text-2xl font-semibold">Excellent</h3>
            <p className="mt-2 text-sm text-white/60">
              Smooth order flow and healthy conversion.
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main>
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-500">
              Admin Control
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em]">
              Store dashboard
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Overview of revenue, orders, customers, and product performance.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, index) => (
              <div
                key={index}
                className={`rounded-[1.75rem] p-6 shadow-sm border ${
                  item.accent
                    ? "bg-black text-white border-black"
                    : "bg-[var(--surface-strong)] border-[var(--line)]"
                }`}
              >
                <p className={`text-sm ${item.accent ? "text-white/60" : "text-[var(--muted)]"}`}>
                  {item.label}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                  {item.value}
                </h2>
                <p className={`mt-2 text-sm ${item.accent ? "text-white/65" : "text-[var(--muted)]"}`}>
                  {item.hint}
                </p>
              </div>
            ))}
          </div>

          {/* Lower layout */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Recent orders */}
            <div className="lg:col-span-2 rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-strong)] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Recent Orders</h3>
                  <p className="text-sm text-[var(--muted)]">Latest transactions from the store.</p>
                </div>
                <button className="rounded-full border border-[var(--line)] px-4 py-2 text-sm">
                  View all
                </button>
              </div>

              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-4 py-4"
                  >
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-[var(--muted)]">{order.customer}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">{order.total}</p>
                      <span className="text-xs text-[var(--muted)]">{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side widgets */}
            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-strong)] p-6">
                <h3 className="text-xl font-semibold">Top Products</h3>
                <div className="mt-5 space-y-4">
                  {topProducts.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-[var(--muted)]">{item.sold}</p>
                      </div>
                      <span className="text-sm text-red-500">↗</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-black p-6 text-white">
                <h3 className="text-xl font-semibold">Quick Actions</h3>
                <p className="mt-2 text-sm text-white/60">
                  Fast access to store updates.
                </p>

                <div className="mt-5 space-y-3">
                  <button className="w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-black">
                    Add New Product
                  </button>
                  <button className="w-full rounded-full border border-white/15 px-4 py-3 text-sm font-semibold text-white">
                    Manage Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}