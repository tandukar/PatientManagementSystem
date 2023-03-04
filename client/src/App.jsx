import React from "react";
import AdminDashboard from "./components/pages/adminDashboard/AdminDashboard";
import Login from "./components/pages/Login/Login";

//import app.css
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/navbar" element={<Navbar />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} /> */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>

      {/* <AdminDashboard /> */}
      {/* <Login /> */}
      {/* other components */}
    </div>
  );
}

export default App;
