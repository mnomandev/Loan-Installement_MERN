
import StudentHeader from "./header";
import { Outlet } from "react-router-dom";

function StudentLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <StudentHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;