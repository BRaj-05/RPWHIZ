import AdminLayout from "../layout/AdminLayout";
import { useEffect, useState } from "react";
import { useStore } from "../context/StoreContext"; // ✅ FIX PATH

export default function Settings() {
  const { settings, updateSettings } = useStore();

  const [storeName, setStoreName] = useState("");
  const [currency, setCurrency] = useState("");
  const [currencies, setCurrencies] = useState([]);

  // SYNC
  useEffect(() => {
    if (settings) {
      setStoreName(settings.storeName || "Shopora");
      setCurrency(settings.currency || "INR");
    }
  }, [settings]);

  // FETCH
  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates));
      })
      .catch(() => {
        setCurrencies(["INR", "USD"]);
      });
  }, []);

  const handleSave = () => {
    updateSettings({ storeName, currency });
    alert("Saved ✅");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="bg-white/5 p-6 rounded-xl mt-6 space-y-4">

        <input
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          className="w-full px-4 py-2 bg-white/5 rounded-lg"
        />

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full px-4 py-2 bg-white/5 rounded-lg"
        >
          {currencies.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={handleSave}
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          Save
        </button>

      </div>
    </AdminLayout>
  );
}