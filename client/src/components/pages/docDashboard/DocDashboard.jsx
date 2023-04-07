import React, { useEffect, useState } from "react";

import Sidebar from "./sidebar/Sidebar";

import { HiOutlineMenuAlt1 } from "react-icons/hi";
import Appointment from "./appointment/Appointment";

import { Navigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';



const DoctorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setAuthenticated(true);
      console.log("token");
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
        <div className="flex flex-col md:flex-row ">
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
              />
            </div>
          )}
          <div className="flex-1  ">
            <div className="min-height: 100vh ">
              <Appointment />
            </div>
          </div>
        </div>
      </>
    );
  } 
};

export default DoctorDashboard;
