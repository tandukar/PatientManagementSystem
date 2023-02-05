import React from "react";

import Sidebar from "./sidebar/Sidebar";
import DocDashboard from "./Doctor/DocDashboard";

const AdminDashboard = () => {
  return (
    <>
      <div className="flex">
        <div className="w-60 ">
          <Sidebar />
        </div>
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
