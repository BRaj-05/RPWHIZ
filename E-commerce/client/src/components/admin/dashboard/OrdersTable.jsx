export default function OrdersTable({ orders }) {
  if (!orders.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No orders yet 🚀
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-500/20 text-green-400";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "Shipped":
        return "bg-blue-500/20 text-blue-400";
      case "Delivered":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

      <table className="w-full text-sm">

        <thead className="text-gray-400 border-b border-white/10">
          <tr>
            <th className="p-3 text-left">Order</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-b border-white/5 hover:bg-white/5">

              <td className="p-3">{o._id}</td>

              <td>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(o.status)}`}>
                  {o.status}
                </span>
              </td>

              <td>₹{o.grandTotal}</td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}