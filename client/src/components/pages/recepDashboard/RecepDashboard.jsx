import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import CreateAppointment from "./appointment/Appointment";
import Patient from "./patient/Patient";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GetPatients from "./patient/GetPatients";
import GetDoctorList from "./doctor/GetDoctorList";

const RecepDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState(null);
  const [selectedItem, setSelectedItem] = useState("Patients");

  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
      console.log("token");
    } else {
      console.log("no token");
      setAuthenticated(false);
    }
  }, []);

  if (authenticated === false) {
    navigate("/login", { replace: true });
    return null;
  } else if (authenticated === true) {
    console.log("authenticated");
    return (
      <>
        <div className="flex flex-col md:flex-row bg-slate-100 ">
          {!sidebarOpen ? (
            <div className="pt-4 pl-2 ">
              <HiOutlineMenuAlt1
                onClick={() => setSidebarOpen(true)}
                className="text-gray-400 hover:text-blue-600 w-10 h-10 p-1 rounded "
              />
            </div>
          ) : (
            <div className="fixed md:relative md:w-60 h-full z-50">
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                onItemClick={handleItemClick}
              />
            </div>
          )}
            <div className="w-full md:pr-10 overflow-x-hidden p-10">
              {selectedItem === "Appointments" ? (
                <GetPatients />
              ) : selectedItem === "Patients" ? (
                <Patient />
              ) : selectedItem === "Doctors" ? (
                <GetDoctorList />
              ) : null}
            </div>
        </div>
      </>
    );
  }
};

export default RecepDashboard;
