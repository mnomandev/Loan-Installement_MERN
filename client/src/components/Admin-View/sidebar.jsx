import { NavLink } from "react-router-dom";
import { LayoutDashboard, Wallet } from "lucide-react"; // nice icons

const AdminSidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg">
      {/* Logo / Title */}
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      {/* Sidebar Links */}
      <nav className="flex-1 p-4 space-y-3">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/manage-loans"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Wallet size={20} />
          Manage Loans
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
