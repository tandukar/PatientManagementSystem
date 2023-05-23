import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useSendOptMutation,
  useResetPassMutation,
  useVerifyOptMutation,
} from "./Auth";

const Otp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [verifyOTP, { data, loading, error }] = useVerifyOptMutation();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const payload = { ...data };
    console.log(payload);
    try {
      const response = await verifyOTP(payload);
      console.log(response);
      if (response.error.originalStatus === 200) {
        toast.success("OTP Verified");
        setTimeout(() => {
          navigate("/resetPassword");
        }, 1000); 
    } 
      else{
        toast.error("Invalid OTP");
      }

    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  // console.log("userDetail", userDetail);

  return (
    <>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      
        <form onSubmit={handleSubmit(onSubmit)} className="w-96 bg-white p-6 rounded shadow-md">

          <h2 className="text-2xl mb-6 text-center font-bold text-gray-600">
          
            Verify OTP
          </h2>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <label className="block mb-2 font-bold text-gray-600">
                OTP-Verification
              </label>

              <TextField
                id="otp"
                fullWidth
                autoComplete="shipping address-line1"
                variant="outlined"
                error={errors.otp ? true : false}
                {...register("otp", {
                  required: "OTP is required",
                  maxLength: {
                    value: 4,
                    message: "OTP must be 4 characters long",
                  },
                })}
              />

              {errors.otp && (
                <p className="text-red-500">{errors.otp.message}</p>
              )}
            </Grid>
          </Grid>
          <div className=" mt-10 mb-10  text-center">
            <button
              type="submit"
              className="bg-custom-blue hover:bg-custom-blue text-white w-60  md:w-40 sm:w20 font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg"

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

export default Otp;
