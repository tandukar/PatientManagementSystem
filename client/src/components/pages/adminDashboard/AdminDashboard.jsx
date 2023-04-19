import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import jwtDecode from "jwt-decode";
import Sidebar from "./sidebar/Sidebar";
import DocDashboard from "./Doctor/DocDashboard";
import RecepDashboard from "./receptionist/RecepDashboard";
import Dashboard from "./dashboard/Dashboard";
import BedsRoomsDashboard from "./bedsAndRooms/Dashboard";
import { useUserDetailQuery } from "./AdminApiSlice";

import { getIdFromLocalStorage } from "../utlis";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // State variable to track whether the sidebar is open or closed
  const [authenticated, setAuthenticated] = useState(null); // State variable to track whether the user is authenticated or not
  const [selectedItem, setSelectedItem] = useState("Dashboard"); // State variable to track which item is currently selected in the sidebar
  const [userId, setUserId] = useState(null); // State variable to track the ID of the currently logged in user

  // Callback function to handle clicks on items in the sidebar
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    // Get the JWT token from local storage
    const token = localStorage.getItem("token");
    if (token) {
      const id = getIdFromLocalStorage(token);

      setUserId(id); // Set the user ID state variable
      setAuthenticated(true); // Set the authenticated state variable to true
      console.log("token");
      console.log(userId);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
    } else {
      console.log("no token");
      setAuthenticated(false); // Set the authenticated state variable to false
    }
  }, []);

  // Fetch the user details using the user ID from the state variable
  const { data: userDetail = [] } = useUserDetailQuery(userId);

  // If the user is not authenticated, redirect them to the login page
  if (authenticated === false) {
    return <Navigate replace to="/login" />;
  } else if (authenticated === true) {
    console.log("authenticated");
    console.log("details====", userDetail.firstname);

    return (
      <>
        <div className="flex flex-col md:flex-row  ">
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
          <div className="flex-1 h-screen">
            <div className="h-full ">
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
