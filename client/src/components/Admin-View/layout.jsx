import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import Footer from "./footer";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Start open on desktop

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${
          sidebarOpen ? "md:ml-60" : "md:ml-0"
        }`}
      >
        <AdminHeader onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
