import AdminLayout from "../layout/AdminLayout";
import { useStore } from "../../../context/StoreContext";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Customers() {
  const { users } = useStore();
  const [search, setSearch] = useState("");

  // 🔍 FILTER USERS
  const filtered = users.filter((u) =>
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Customers</h1>

        <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
          {users.length} Users
        </span>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-4 bg-white/5 border border-white/10 px-4 py-2 rounded-lg w-72"
      />

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">

        <StatCard title="Total Users" value={users.length} />
        <StatCard title="Active Users" value={users.length} />
        <StatCard title="New Users" value={Math.floor(users.length / 2)} />

      </div>

      {/* TABLE */}
      <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

        {filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No users found 🚀
          </div>
        ) : (
          <table className="w-full text-sm">

            <thead className="text-gray-400 border-b border-white/10">
              <tr>
                <th className="p-3 text-left">User</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  {/* USER */}
                  <td className="p-3 flex items-center gap-3">

                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-xs">
                      {u.email?.[0]?.toUpperCase()}
                    </div>

                    <span>User {i + 1}</span>

                  </td>

                  {/* EMAIL */}
                  <td>{u.email}</td>

                  {/* STATUS */}
                  <td>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                      Active
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
    </AdminLayout>
  );
}

/* COMPONENT */

function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-white/5 border border-white/10 p-5 rounded-2xl"
    >
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-xl font-bold mt-2">{value}</h2>
    </motion.div>
  );
}