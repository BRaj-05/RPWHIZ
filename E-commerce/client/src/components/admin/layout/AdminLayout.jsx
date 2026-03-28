import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-white">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Topbar />

        {/* ✅ THIS FIXES YOUR EMPTY PAGE */}
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}