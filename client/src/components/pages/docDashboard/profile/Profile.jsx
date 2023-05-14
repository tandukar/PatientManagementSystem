import { getIdFromLocalStorage } from "../../utlis";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useDoctorDetailQuery,
  useUpdatePasswordMutation,
} from "../DoctorApiSlice";

const Profile = () => {
  const [docId, setdocId] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { data: userDetail = [] } = useDoctorDetailQuery(docId);
  const [updatePassword, { isLoading, error }] = useUpdatePasswordMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const docId = getIdFromLocalStorage(token);
    setdocId(docId);
  }, []);

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      const response = await updatePassword({
        id: docId,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();
      if (response) {
        toast.success(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.data.message);
      console.log("sdf");
      toast.error(error.data.message);
    }
  };

  // console.log("userDetail", userDetail);

  return (
    <>
      <h2 className="text-2xl flex items-center justify-center font-bold text-gray-600">
        Update Password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <label className="block mb-2 font-bold text-gray-600">
              Old Password
            </label>

            <TextField
              id="oldPassword"
              fullWidth
              autoComplete="shipping address-line1"
              variant="outlined"
              error={errors.oldPassword ? true : false}
              {...register("oldPassword", { required: "This is required" })}
            />

            {errors.newPassword && (
              <p className="text-red-500">{errors.newPassword.message}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <label className="block mb-2 font-bold text-gray-600">
              New Password
            </label>

            <TextField
              id="newPassword"
              fullWidth
              autoComplete="shipping address-line1"
              variant="outlined"
              error={errors.newPassword ? true : false}
              {...register("newPassword", { required: "This is required" })}
            />
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
    </>
  );
};

export default Profile;
