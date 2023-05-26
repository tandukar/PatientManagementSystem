import { getIdFromLocalStorage } from "../../utlis";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSendNotesMutation } from "../DoctorApiSlice";
import { useLocation } from "react-router-dom";

const Prescription = () => {
  const [patient, setpatient] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  //   const { data: userDetail = [] } = useDoctorDetailQuery(docId);
  //   const [updatePassword, { isLoading, error }] = useUpdatePasswordMutation();
    const [sendNotes, { isLoading, error }] = useSendNotesMutation();

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      const response = await sendNotes({
        prescription: data.notes,
        patientId: id,    
      });
      if (response) {
        toast.success(response.data.message);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    //   console.log("sdf");
      toast.error(error);
    }
  };

  // console.log("userDetail", userDetail);

  return (
    <>
    <ToastContainer />
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="w-96 bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl mb-6 text-center font-bold text-gray-600">
            Send Notes
          </h2>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <label className="block mb-2 font-bold text-gray-600">
                Notes
              </label>
              <TextField
                id="notes"
                fullWidth
                multiline
                rows={4}
                autoComplete="shipping address-line1"
                variant="outlined"
                error={errors.notes ? true : false}
                {...register("notes", { required: "This is required" })}
              />
              {errors.notes && (
                <p className="text-red-500 mt-2">{errors.notes.message}</p>
              )}
            </Grid>
          </Grid>
          <div className="mt-6 text-center">
            <p className="text-red-600">*Send notes if you want or you can simply go back.</p>

            <button
              type="submit"
              className="bg-custom-blue hover:bg-custom-blue text-white w-full py-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Prescription;
