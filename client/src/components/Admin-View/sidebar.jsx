import { NavLink } from "react-router-dom";
import { LayoutDashboard, Wallet, X } from "lucide-react";
import PropTypes from "prop-types";

const AdminSidebar = ({ open, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-60 bg-gray-900 text-white flex flex-col shadow-xl z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <span className="text-xl font-semibold tracking-wide">Admin Panel</span>
          <X
            className="h-5 w-5 cursor-pointer text-gray-300 hover:text-white md:hidden"
            onClick={onClose}
          />
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 p-3 space-y-2 text-sm">
          {[
            { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
            { to: "/admin/manage-loans", label: "Manage Loans", icon: Wallet },
            { to: "/admin/add-loans", label: "Add Loans", icon: Wallet },
          ].map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
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
