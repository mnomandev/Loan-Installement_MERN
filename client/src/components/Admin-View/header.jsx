import { UserCircle, Menu } from "lucide-react";
import { useState } from "react";
import LogoutModal from "../common/logoutModel";
import PropTypes from "prop-types";

AdminHeader.propTypes = {
  onMenuClick: PropTypes.func,
};

function AdminHeader({ onMenuClick }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm px-4 py-2.5 flex items-center justify-between md:px-6">
      {/* Left: Menu button */}
      <div className="flex items-center">
        <Menu
          className="h-6 w-6 text-gray-600 cursor-pointer hover:text-indigo-600 md:hidden"
          onClick={onMenuClick}
        />
      </div>

      {/* Right: Profile & Logout */}
      <div className="flex items-center gap-3 md:gap-5">
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1.5 md:px-4 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-all duration-150"
        >
          Logout
        </button>
        <span className="hidden sm:block text-gray-700 text-sm md:text-base">
          Welcome, <span className="font-semibold">Admin</span>
        </span>
        <UserCircle className="h-7 w-7 text-gray-600 cursor-pointer hover:text-indigo-600 transition-colors" />
      </div>

      <LogoutModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </header>
  );
}

export default AdminHeader;
