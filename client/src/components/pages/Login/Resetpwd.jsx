import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  useSendOptMutation,
  useResetPassMutation,
  useVerifyOptMutation,
} from "./Auth";
import { useNavigate } from "react-router-dom";
const ResetPwd = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();



  const [resetPass, { data, loading, error }] = useResetPassMutation();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const payload = { ...data };
    console.log(payload);
    try {
      const response = await resetPass(payload);
      console.log(response);
      if (response.error.originalStatus === 200) {
        toast.success("Password Changed Successfully");

        setTimeout(() => {
          navigate("/login")

        }, 1000); 
      } else {
        toast.error(response.error.data); 
      }
    } catch (error) {
      console.log(error);
      toast.error(response.error.data);
    }
  };

  // console.log("userDetail", userDetail);

  return (
    <>
     <div className="flex items-center justify-center h-screen bg-gray-100">
      
      <form onSubmit={handleSubmit(onSubmit)} className="w-96 bg-white p-6 rounded shadow-md">

        <h2 className="text-2xl mb-6 text-center font-bold text-gray-600">
            Reset Password
          </h2>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <label className="block mb-2 font-bold text-gray-600">
                Organization Email
              </label>

              <TextField
                id="email"
                fullWidth
                autoComplete="shipping address-line1"
                variant="outlined"
                type="email"
                error={errors.email ? true : false}
                {...register("email", {
                  required: "email is required",
                })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <label className="block mb-2 font-bold text-gray-600">
                Password
              </label>

              <TextField
                id="password"
                fullWidth
                autoComplete="shipping address-line1"
                variant="outlined"
                error={errors.password ? true : false}
                {...register("password", {
                  required: "password is required",minLength: {
                    value: 6,
                    message: "Password must be 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <label className="block mb-2 font-bold text-gray-600">
                Confirm Password
              </label>

              <TextField
                id="password1"
                fullWidth
                autoComplete="shipping address-line1"
                variant="outlined"
                error={errors.password1 ? true : false}
                {...register("password1", {
                  required: "confirmation password is required",
                })}
              />
              {errors.password1 && (
                <p className="text-red-500">{errors.password1.message}</p>
              )}
            </Grid>
          </Grid>
          <div className=" mt-10 mb-10  text-center">
            <button
              type="submit"
              className="bg-custom-blue hover:bg-custom-blue text-white w-full py-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg"


            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ResetPwd;
