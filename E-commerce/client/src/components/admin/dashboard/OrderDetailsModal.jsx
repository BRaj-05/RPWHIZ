export default function OrderDetailsModal({ order, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-[#020617] p-6 rounded-xl w-[400px] border border-white/10">

        <h2 className="text-lg font-semibold mb-4">Order Details</h2>

        <p><strong>ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ₹{order.grandTotal}</p>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 px-4 py-2 rounded-lg"
        >
          Close
        </button>

      </div>

    </div>
  );
}