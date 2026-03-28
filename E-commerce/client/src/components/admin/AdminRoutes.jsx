import { Routes, Route } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import { AdminStoreProvider } from "./context/StoreContext";

export default function AdminRoutes() {
  return (
    <AdminStoreProvider>
      <Routes>

        {/* ✅ IMPORTANT: nested layout */}
        <Route path="/" element={<AdminLayout />}>

          {/* index route = dashboard */}
          <Route index element={<Dashboard />} />

          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />

        </Route>

      </Routes>
    </AdminStoreProvider>
  );
}