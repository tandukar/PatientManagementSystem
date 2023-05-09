import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import Appointment from "./appointment/Appointment";
import { Navigate, useNavigate } from "react-router-dom";
import { getIdFromLocalStorage } from "../utlis";
import { useDoctorDetailQuery, useAppointmentsQuery } from "./DoctorApiSlice";

const DoctorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(null);
  const [userId, setUserId] = useState(null);
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const navigate = useNavigate();

  // Callback function to handle clicks on items in the sidebar
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    if (token && role === "Doctor") {
      const id = getIdFromLocalStorage(token);
      setUserId(id);
      setAuthenticated(true);
      console.log("token");
      // console.log("ID =", userId);
    } else {
      console.log("no token");
      setAuthenticated(false);
    }
  }, []);

  // Fetch the user details using the user ID from the state variable
  const { data: doctorDetail = [] } = useDoctorDetailQuery(userId, {
    skip: userId === null,
  });
  const { data: appointments = [] } = useAppointmentsQuery(userId);

  // console.log("details====", appointments);

  if (authenticated === false) {
    // return <Navigate replace to="/login" />;
    navigate("/login", { replace: true });
    return null;
  } else if (authenticated === true) {
    console.log("authenticated");
    var docName = doctorDetail.firstname + " " + doctorDetail.lastname;
    console.log("details====", docName);
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
                onItemClick={handleItemClick}
              />
            </div>
          )}
          <div className="flex-1  ">
            <div className="min-height: 100vh ">
              {selectedItem === "Dashboard" ? (
                <Appointment docNameProp={docName} docId={userId} />
              ) : selectedItem === "IPD" ? (
                <div>IPD</div>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default DoctorDashboard;
