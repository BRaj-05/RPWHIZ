import { Bell, Search, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Topbar() {
  const [open, setOpen] = useState(false);

  const admin = JSON.parse(localStorage.getItem("admin_auth"));

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    window.location.href = "/control-center-7845/login";
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">

      {/* SEARCH */}
      <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl w-[300px] border border-white/10">
        <Search size={16} className="text-gray-400" />
        <input
          placeholder="Search products, orders..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATIONS */}
        <div className="relative">
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
            <Bell size={18} />
          </button>

          <span className="absolute -top-1 -right-1 text-xs bg-red-500 px-1 rounded-full">
            2
          </span>
        </div>

        {/* USER */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl"
          >
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              {admin?.email?.[0]?.toUpperCase()}
            </div>

            <span className="text-sm">{admin?.email}</span>

            <ChevronDown size={14} />
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-[#020617] border border-white/10 rounded-lg">

              <button className="w-full text-left px-4 py-2 hover:bg-white/5">
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/5"
              >
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}