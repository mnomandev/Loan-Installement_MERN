import {  UserCircle } from "lucide-react";

function AdminHeader() {
  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3">
        {/* <Menu className="h-6 w-6 text-gray-600 cursor-pointer hover:text-indigo-600" /> */}
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
      </div>

      {/* Right: User Profile */}
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Welcome, Admin</span>
        <UserCircle className="h-8 w-8 text-gray-600 cursor-pointer hover:text-indigo-600" />
      </div>
    </header>
  );
}

export default AdminHeader;
