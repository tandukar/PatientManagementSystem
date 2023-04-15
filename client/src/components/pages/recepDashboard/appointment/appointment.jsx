import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegisterAppointmentsMutation } from "./AppointmentApiSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Typography from "@mui/material/Typography";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useState } from "react";

const CreateAppointment = () => {
  const patientType = [
    { value: "ipd", label: "Inpatient" },
    { value: "opd", label: "Outpatient" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [registerAppointments, { isLoading, error }] =
    useRegisterAppointmentsMutation();

  const onSubmit = (data) => {
    console.log("data", data);
    console.log("selectedOption", selectedOption);
    console.log("selectedDate", selectedDate);
    const appointmentData = {
      ...data,
      patientType: selectedOption.value,
      appointmentDate: selectedDate,
    };
    registerAppointments(appointmentData);
    toast.success("Appointment created successfully");
    console.log(appointmentData);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setValue("patientType", selectedOption.value);
  };
  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);
  };

  return (
    <>
      <ToastContainer />
      <div className="text-center my-8">
        <Typography variant="h4">Create Appointment</Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <Grid container spacing={4} >
          <Grid item xs={12} sm={6}>
            <label className="block mb-2 font-bold text-gray-700">
              Patient Id
            </label>

            <TextField
              id="patientId"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              error={errors.patientId ? true : false}
              {...register("patientId", { required: "This is required" })}
            />

            {errors.patientId && (
              <p className="text-red-500">{errors.patientId.message}</p>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className="block mb-2 font-bold text-gray-700">
              Doctor Id
            </label>

            <TextField
              id="doctorId"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
              error={errors.doctorId ? true : false}
              {...register("doctorId", { required: "This is required" })}
            />

            {errors.doctorId && (
              <p className="text-red-500">{errors.doctorId.message}</p>
            )}
          </Grid>

          <Grid item xs={12}>
            <label className="block mb-2 font-bold text-gray-700">Reason</label>

            <TextField
              id="reason"
              fullWidth
              autoComplete="shipping address-line1"
              variant="outlined"
              error={errors.reason ? true : false}
              {...register("reason", { required: "This is required" })}
            />

            {errors.reason && (
              <p className="text-red-500">{errors.reason.message}</p>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className="block mb-2 font-bold text-gray-700">
              Select patient type
            </label>

            <Select
              options={patientType}
              name="patientType"
              onChange={handleSelectChange}
              value={selectedOption}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className="block mb-2 font-bold text-gray-700">
              Room No
            </label>

            <TextField
              id="roomNo"
              fullWidth
              autoComplete="shipping postal-code"
              variant="outlined"
              error={errors.roomNo ? true : false}
              {...register("roomNo", { required: "This is required" })}
            />

            {errors.roomNo && (
              <p className="text-red-500">{errors.roomNo.message}</p>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className="block mb-2 font-bold text-gray-700">
              Appointment Date
            </label>

            <DatePicker
              className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              selected={selectedDate}
              onChange={handleDateChange}
              value={selectedDate}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <button className="mt-8 bg-custom-blue hover:bg-blue-700 text-white w-80 md:w-60 sm:w20 font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg">
              Submit
            </button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CreateAppointment;
