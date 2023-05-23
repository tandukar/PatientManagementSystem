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
} from "../../docDashboard/DoctorApiSlice";
import { useShiftIpdPatientMutation } from "../patient/PatientApiSlice";

const ShiftIpd = ({id, patientId, patientName}) => {
  const [updateId, setUpdateId] = useState();
  const [patientid, setpatientid] = useState();
  const [patientname, setPatientname] = useState();

  useEffect(() => {
    setUpdateId(id);
    setpatientid(patientid);
    setPatientname(patientName);
  },  [id, patientId, patientName]);

  console.log("sdf",updateId)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  // const { data: userDetail = [] } = useDoctorDetailQuery(docId);
  const [shiftIpdPatient, { isLoading, error }] = useShiftIpdPatientMutation();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const docId = getIdFromLocalStorage(token);
  //   setdocId(docId);
  // }, []);

  const onSubmit = async (data) => {
    try {
      console.log(data)
      console.log(updateId)
      console.log(patientId)
      console.log(patientName)
      const response = await shiftIpdPatient({
        id: updateId,
        roomNumber: data.roomNumber,
        bedNumber: data.bedNumber,
        patientId: patientName,
        patientName: patientId,

      }).unwrap();
      if (response) {
        toast.success("Patient Shifted Successfully");
        console.log(response);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  // console.log("userDetail", userDetail);

  return (
    <>
      <ToastContainer />

      <h2 className="text-2xl flex items-center justify-center font-bold text-gray-600">
        Update Room and Bed
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <label className="block mb-2 font-bold text-gray-600">
              Room Name
            </label>

            <TextField
              id="roomNumber"
              fullWidth
              autoComplete="shipping address-line1"
              variant="outlined"
              error={errors.roomNumber ? true : false}
              {...register("roomNumber", { required: "Room Name is required" })}
            />

            {errors.roomNumber && (
              <p className="text-red-500">{errors.roomNumber.message}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <label className="block mb-2 font-bold text-gray-600">
              Bed Number
            </label>

            <TextField
              id="bedNumber"
              fullWidth
              autoComplete="shipping address-line1"
              variant="outlined"
              error={errors.bedNumber ? true : false}
              {...register("bedNumber", { required: "Bed Number is required" })}
            />
             {errors.bedNumber && (
              <p className="text-red-500">{errors.bedNumber.message}</p>
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
    </>
  );
};

export default ShiftIpd;
