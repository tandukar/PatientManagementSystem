import React from "react";

import Sidebar from "./sidebar/Sidebar";
import DocDashboard from "./Doctor/DocDashboard";

import { HiOutlineMenuAlt1 } from "react-icons/hi";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row ">
        {!sidebarOpen ? (
          <div className="pt-4 pl-2 ">
             <HiOutlineMenuAlt1
              onClick={() => setSidebarOpen(true)}
              className="text-gray-400 hover:text-blue-600 w-10 h-10 p-1 rounded "
            />
          </div>
        ) : (
          <div className="w-60  ">
            {/* <Sidebar /> */}
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
        )}

        <div className="flex-1">
          <div className="min-height: 100vh ">
            <DocDashboard />
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;
