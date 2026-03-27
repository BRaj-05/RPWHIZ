import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-white">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 space-y-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}