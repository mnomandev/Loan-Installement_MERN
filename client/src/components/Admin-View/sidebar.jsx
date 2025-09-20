import { NavLink } from "react-router-dom";
import { LayoutDashboard, Wallet, X } from "lucide-react";
import PropTypes from "prop-types";



const AdminSidebar = ({ open, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:flex`}
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-gray-700">
          <span className="text-2xl font-bold">Admin Panel</span>
          {/* Close button on mobile */}
          <X
            className="h-6 w-6 cursor-pointer md:hidden"
            onClick={onClose}
          />
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
            onClick={onClose}
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
            onClick={onClose}
          >
            <Wallet size={20} />
            Manage Loans
          </NavLink>

          <NavLink
            to="/admin/add-loans"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
            onClick={onClose}
          >
            <Wallet size={20} />
            Add Loans
          </NavLink>
        </nav>
      </div>
    </>
  );
};
AdminSidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AdminSidebar;
