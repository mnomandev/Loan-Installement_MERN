import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import Footer from "./footer";

function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <AdminSidebar />

      <div className="flex flex-1 flex-col pl-64">
        {/* Header */}
        <AdminHeader />

        {/* Main Content */}
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;


// import { Outlet } from "react-router-dom";
// import AdminSidebar from "./sidebar";
// import AdminHeader from "./header";


// function AdminLayout() {


//   return (
//     <div className="flex min-h-screen w-full">
//       {/* admin sidebar */}
//        <AdminSidebar />
//       <div className="flex flex-1 flex-col pl-64">
//         {/* admin header */}
//         <AdminHeader />
//         <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;