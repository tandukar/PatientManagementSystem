import React from "react";
import AdminDashboard from "./components/pages/adminDashboard/AdminDashboard";
import Login from "./components/pages/Login/Login";
// import DocDashboard from "./components/pages/adminDashboard/Doctor/DocDashboard";
import DoctorDashboard from "./components/pages/docDashboard/DocDashboard"
import Dashboard from "./components/pages/adminDashboard/dashboard/Dashboard";
import RecepDashboard from "./components/pages/recepDashboard/RecepDashboard";

import Profile from "./components/pages/adminDashboard/Doctor/GetDoctors";
//import app.css
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/receptionist" element={<RecepDashboard />} />
          <Route path="/admin/get-doctor" element={<Profile />} />
        </Routes>
      </BrowserRouter>
{}
      {/* <AdminDashboard /> */}
      {/* <Login /> */}
      {/* other components */}
    </div>
  );
}

export default App;
