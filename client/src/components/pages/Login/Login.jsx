// import React from "react";
import React, { useEffect, useState } from "react";
import { Alert } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = React.useState([]);
  const [email, setEmail] = React.useState([]);

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password,
      })

      .then((res) => {
        // console.log(email, password);
        console.log(res.data.token);
        console.log(res.data.role);

        if (res.data.token && res.data.role) {
          localStorage.setItem("token", res.data.token);
          sessionStorage.setItem("role", res.data.role);

          if (res.data.role === "Admin") {
            navigate("/admin");
          } else if (res.data.role === "Doctor") {
            if (window.location.pathname !== "/doctor") {
              navigate("/doctor");
            }
          } else if (res.data.role === "Receptionist") {
            if (window.location.pathname !== "/receptionist") {
              navigate("/receptionist");
            }
          } else {
            toast.error("Invalid role");
          }
        } else {
          toast.error("Invalid credentials");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          toast.error("Invalid credentials");
          // setShowAlert(true)
        }
      });
  };
  return (
    <>
      <ToastContainer />

      <div className="flex md:flex-row flex-col ">
        <div className="md:w-138 ">
          <img
            className=" hidden md:flex   md:h-screen w-120  bg-cover bg-center"
            src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
          />
        </div>
        <div className="md:w-3/4  ">
          <div className="flex justify-center items-center h-screen ">
            <div className="flex flex-col gap-4 max-w-screen-md mx-auto ">
              <div className="text-left  text-3xl  ">Welcome Back</div>
              <div className="text-left text-gray-500 text-1xl mb-7 ">
                Let's get started! Please enter your details.
              </div>
              <div className=" md:container md:mx-auto ">
                <label className="form-label inline-block font-bold mb-2 text-gray-600">
                  Email
                </label>
                <input
                  type="Email"
                  className=" appearance-none border-2  rounded-lg w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:border-blue-500"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="  md:container md:mx-auto ">
                <label className="form-label font-bold inline-block mb-2 text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  className=" appearance-none border-2  rounded-lg w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:border-blue-500 focus:"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="•••••••••••"
                />
              </div>

              <div className="text-right font-bold text-blue-600">
                Forgot password?
              </div>

              <div className="text-left pt-1">
                <button
                  className="w-full  text-white bg-blue-600 hover:bg-blue-700  font-bold py-2 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg"
                  onClick={submitHandler}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
