import React, { useEffect, useState } from "react";

import Sidebar from "./sidebar/Sidebar";
import DocDashboard from "./Doctor/DocDashboard";
import RecepDashboard from "./receptionist/RecepDashboard";
import Dashboard from "./dashboard/Dashboard";
import BedsRoomsDashboard from "./bedsAndRooms/Dashboard";

import { HiOutlineMenuAlt1 } from "react-icons/hi"; 

import { Navigate } from "react-router-dom";

const AdminDashboard = () => {

  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [authenticated, setAuthenticated] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState("Dashboard");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
      console.log("token");
      const headers = {
        'Authorization': `Bearer ${token}`
      };
    } else {
      console.log("no token");
      setAuthenticated(false);
    }
  }, []);

  if (authenticated === false) {
    return <Navigate replace to="/login" />;
  } else if (authenticated === true) {
    console.log("authenticated");
    return (
      <>
        <div className="flex flex-col md:flex-row bg-gray-100 ">
          {!sidebarOpen ? (
            <div className="pt-4 pl-2 ">
              <HiOutlineMenuAlt1
                onClick={() => setSidebarOpen(true)}
                className="text-gray-400 hover:text-blue-600 w-10 h-10 p-1 rounded "
              />
            </div>
          ) : (
            <div className="fixed md:relative md:w-60 h-full z-50  ">
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                onItemClick={handleItemClick}
              />
            </div>
          )}
          <div className="flex-1 md:mx-10 md:mt-2 h-screen">
            <div className="h-full bg-gray-100">
              {/* <DocDashboard /> */}
              {/* <Dashboard /> */}
              {selectedItem === "Dashboard" ? (
                <Dashboard />
              ) : selectedItem === "Doctors" ? (
                <DocDashboard />
              ) : selectedItem === "Receptionist" ? (
                <RecepDashboard />
              ) : selectedItem === "Rooms/Beds" ? (
                <BedsRoomsDashboard />
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default AdminDashboard;
