

import { Outlet } from "react-router-dom";
import TeacherSidebar from "./sidebar";
import TeacherHeader from "./header";


function TeacherLayout() {


  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
       <TeacherSidebar />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <TeacherHeader />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default TeacherLayout;