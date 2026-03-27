import AdminLayout from "../layout/AdminLayout";
import { useStore } from "../../../context/StoreContext";
import { useState } from "react";

export default function Orders() {
  const { orders, setOrders } = useStore();
  const [selected, setSelected] = useState(null);

  const updateStatus = (id, status) => {
    setOrders(
      orders.map((o) =>
        o._id === id ? { ...o, status } : o
      )
    );
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold">Orders</h1>

      <div className="mt-6 bg-white/5 border border-white/10 rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-b border-white/5">

                <td className="p-3">{o._id}</td>
                <td>{o.user}</td>
                <td>₹{o.grandTotal}</td>

                <td>
                  <select
                    value={o.status}
                    onChange={(e) =>
                      updateStatus(o._id, e.target.value)
                    }
                    className="bg-white/5 px-2 py-1 rounded"
                  >
                    <option>Pending</option>
                    <option>Paid</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>

                <td>
                  <button
                    onClick={() => setSelected(o)}
                    className="text-blue-400"
                  >
                    View
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* ORDER MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-[#020617] p-6 rounded-xl w-[400px]">

            <h2 className="text-lg font-semibold">
              Order Details
            </h2>

            <p className="mt-3">ID: {selected._id}</p>
            <p>User: {selected.user}</p>
            <p>Total: ₹{selected.grandTotal}</p>
            <p>Status: {selected.status}</p>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 bg-red-500 px-4 py-2 rounded"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </AdminLayout>
  );
}