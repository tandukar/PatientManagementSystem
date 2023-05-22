import React from "react";
import AdminDashboard from "./components/pages/adminDashboard/AdminDashboard";
import Login from "./components/pages/Login/Login";
// import DocDashboard from "./components/pages/adminDashboard/Doctor/DocDashboard";
import DoctorDashboard from "./components/pages/docDashboard/DocDashboard";
import Dashboard from "./components/pages/adminDashboard/dashboard/Dashboard";
import RecepDashboard from "./components/pages/recepDashboard/RecepDashboard";
import Patient from "./components/pages/recepDashboard/patient/Patient";
import Profile from "./components/pages/adminDashboard/Doctor/GetDoctors";
import Home from "./components/pages/landingPage";
import ForgotPassword from "./components/pages/Login/ForgotPassword";
import Otp from "./components/pages/Login/Otp";
import ResetPwd from "./components/pages/Login/Resetpwd";
//import app.css
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/receptionist" element={<RecepDashboard />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/admin/get-doctor" element={<Profile />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/validateOtp" element={<Otp />} />
          <Route path="/resetPassword" element={<ResetPwd />} />
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
