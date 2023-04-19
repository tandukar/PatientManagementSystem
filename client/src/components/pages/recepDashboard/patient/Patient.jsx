import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import { useRegisterPatientMutation } from "./PatientApiSlice";

const Patient = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedOption, setSelectedOption] = useState(null);

  const [registerPatient, { isLoading, error }] = useRegisterPatientMutation();
  const sex = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const onSubmit = (data) => {
    console.log("data", data);
    // console.log("selectedOption", selectedOption);

    const payload = { ...data, sex: selectedOption.value };
    registerPatient(payload);
    toast.success("Patient registered successfully");
    console.log(payload);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setValue("sex", selectedOption.value);
  };
  return (
    <>
      <ToastContainer />
      <div className="text-center my-8">
        <Typography variant="h4">Register Patient</Typography>
      </div>
      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <label>First Name</label>

            <TextField
              id="firstname"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              error={errors.firstname ? true : false}
              {...register("firstname", { required: "This is required" })}
            />
            {errors.firstname && (
              <p className={errors.firstname ? "text-red-500" : ""}>
                {errors.firstname.message}
              </p>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Last Name</label>

            <TextField
              id="lastname"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
              error={errors.lastname ? true : false}
              {...register("lastname", { required: "This is required" })}
            />
            {errors.lastname && (
              <p className={errors.lastname ? "text-red-500" : ""}>
                {errors.lastname.message}
              </p>
            )}
          </Grid>

          <Grid item xs={12}>
            <label>Age</label>

            <TextField
              id="age"
              // label="Reason"
              fullWidth
              autoComplete="shipping address-line1"
              variant="outlined"
              error={errors.age ? true : false}
              {...register("age", { required: "This is required" })}
            />
            {errors.age && (
              <p className={errors.age ? "text-red-500" : ""}>
                {errors.age.message}
              </p>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Sex</label>
            <Select
              options={sex}
              name="sex"
              onChange={handleSelectChange}
              value={selectedOption}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Address</label>
            <TextField
              id="address"
              // label="Room No"
              fullWidth
              autoComplete="shipping postal-code"
              variant="outlined"
              error={errors.address ? true : false}
              {...register("address", { required: "This is required" })}
            />
            {errors.address && (
              <p className={errors.address ? "text-red-500" : ""}>
                {errors.address.message}
              </p>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Email</label>
            <TextField
              id="email"
              // label="Room No"
              fullWidth
              autoComplete="shipping postal-code"
              variant="outlined"
              error={errors.email ? true : false}
              {...register("email", { required: "This is required" })}
            />
            {errors.email && (
              <p className={errors.email ? "text-red-500" : ""}>
                {errors.email.message}
              </p>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Phone Number</label>
            <TextField
              id="number"
              // label="Room No"
              fullWidth
              autoComplete="shipping postal-code"
              variant="outlined"
              error={errors.number ? true : false}
              {...register("number", { required: "This is required" })}
            />
            {errors.number && (
              <p className={errors.number ? "text-red-500" : ""}>
                {errors.number.message}
              </p>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <button className="mt-8  bg-custom-blue hover:bg-custom-blue text-white w-80  md:w-60 sm:w20 font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg">
              Submit
            </button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Patient;
