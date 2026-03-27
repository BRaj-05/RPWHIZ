import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

const sections = [
  {
    title: "CORE",
    items: [
      { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { name: "Products", path: "/admin/products", icon: ShoppingBag },
      { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
      { name: "Customers", path: "/admin/customers", icon: Users },
    ],
  },
  {
    title: "INSIGHTS",
    items: [
      { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
      { name: "Settings", path: "/admin/settings", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#020617] border-r border-white/5 flex flex-col">

      {/* LOGO */}
      <div className="px-6 py-6 border-b border-white/5">
        <h2 className="text-lg font-semibold tracking-tight">
          Shop<span className="text-red-500">ora</span>
        </h2>
      </div>

      {/* MENU */}
      <div className="flex-1 px-3 py-4 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-xs text-gray-500 px-3 mb-2">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg relative transition-all ${
                      isActive
                        ? "bg-red-500/10 text-red-400"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <item.icon size={18} />

                  <span className="text-sm">{item.name}</span>

                  {/* Active Indicator */}
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-red-500 rounded-r"></span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}