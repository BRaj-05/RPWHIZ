export default function AdminDashboard() {
  return (
    <div className="p-10 grid grid-cols-3 gap-6">
      <div className="bg-black text-white p-6 rounded-2xl">
        <p className="text-sm opacity-60">
          Total Revenue
        </p>
        <h2 className="text-2xl font-bold mt-2">
          ₹12,48,650
        </h2>
      </div>

      <div className="bg-gray-200 p-6 rounded-2xl">
        <p className="text-sm opacity-60">
          Orders
        </p>
        <h2 className="text-2xl font-bold mt-2">
          8,432
        </h2>
      </div>

      <div className="bg-gray-200 p-6 rounded-2xl">
        <p className="text-sm opacity-60">
          Customers
        </p>
        <h2 className="text-2xl font-bold mt-2">
          52,180
        </h2>
      </div>
    </div>
  );
}