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
    <header className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between md:px-6">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3">
        {/* Menu button only for mobile */}
        <Menu
          className="h-6 w-6 text-gray-600 cursor-pointer hover:text-indigo-600 md:hidden"
          onClick={onMenuClick}
        />
      </div>

      {/* Right: User Profile */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          className="px-3 py-1.5 md:px-4 md:py-2 flex items-center gap-2 bg-black hover:bg-red-600 text-white rounded-md shadow text-sm md:text-base"
          onClick={() => setShowModal(true)}
        >
          Logout
        </button>
        <span className="hidden sm:block text-gray-600">Welcome, Admin</span>
        <UserCircle className="h-8 w-8 text-gray-600 cursor-pointer hover:text-indigo-600" />
      </div>

      {/* Logout Modal */}
      <LogoutModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </header>
  );
}


export default AdminHeader;
