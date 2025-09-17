import {  UserCircle } from "lucide-react";
import { useState } from "react";
import LogoutModal from "../common/logoutModel";

function AdminHeader() {
  const [showModal, setShowModal] = useState(false);
  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3">
        {/* <Menu className="h-6 w-6 text-gray-600 cursor-pointer hover:text-indigo-600" /> */}
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
      </div>

      {/* Right: User Profile */}
      <div className="flex items-center gap-4">
         <button
          className="px-4 py-2 flex items-center gap-2 bg-black hover:bg-red-600 text-white rounded-md shadow hover:opacity-90"
          onClick={() => setShowModal(true)}
        >
          Logout
        </button>
        <span className="text-gray-600">Welcome, Admin</span>
        <UserCircle className="h-8 w-8 text-gray-600 cursor-pointer hover:text-indigo-600" />
      </div>
 {/* Logout Modal */}
      <LogoutModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </header>
  );
}

export default AdminHeader;
