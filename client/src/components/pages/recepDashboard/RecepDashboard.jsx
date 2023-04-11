import React, { useEffect, useState } from "react";

// import Sidebar from "./sidebar/Sidebar";
import Sidebar from "../docDashboard/sidebar/Sidebar";

import { HiOutlineMenuAlt1 } from "react-icons/hi";

import CreateAppointment from "./appointment/Appointment";
import Patient from "./patient/Patient";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";

const RecepDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState(null);
  const navigate = useNavigate();

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
  {
    replace: true;
  }
  if (authenticated === false) {
    // return <Navigate replace to="/login" />;
    navigate("/login", { replace: true });
    return null;
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
          <div className="flex md:flex-row flex-col justtify-content-center">
            <div className="md:w-1/2 min-height: 100vh ">
              <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                  <Typography component="h1" variant="h5" align="center">
                    Create Appointment
                  </Typography>

                  <CreateAppointment />
                </Paper>
              </Container>
            </div>
            <div className="md:w-1/2 min-height: 100vh ">
              <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                  <Typography component="h1" variant="h5" align="center">
                    Create Patient
                  </Typography>

                  <Patient />
                </Paper>
              </Container>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default RecepDashboard;
