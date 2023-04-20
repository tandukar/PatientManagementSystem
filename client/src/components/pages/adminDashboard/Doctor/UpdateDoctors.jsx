import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "react-datepicker/dist/react-datepicker.css";
import Typography from "@mui/material/Typography";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useState } from "react";
import dayjs from "dayjs";

const UpdateDoctors = ({ recepId }) => {
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
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [receptionId, setReceptionId] = useState(recepId);
  console.log("receptionId", receptionId);

  // const [registerAppointments, { isLoading, error }] =
  //   useRegisterAppointmentsMutation();

  const onSubmit = (data) => {
    console.log("data", data);
    console.log("selectedOption", selectedOption);
    console.log("selectedDate", selectedDate);
    const appointmentData = {
      ...data,
      patientType: selectedOption.value,
      appointmentDate: selectedDate.format("YYYY-MM-DD hh:mm:ss"),
      recepId: receptionId,
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
    setSelectedDate(dayjs(selectedDate));
  };

  return (
    <>
      <ToastContainer />
      <div className="text-center my-8">
        <div className="text-4xl">Update Doctor</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <label className="block mb-2 font-bold text-gray-700">
              First Name
            </label>

            <TextField
              id="firstname"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              {...register("firstname")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className="block mb-2 font-bold text-gray-700">
              Last Name
            </label>

            <TextField
              id="lastname"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
              {...register("lastname")}
            />

            {errors.doctorId && (
              <p className="text-red-500">{errors.doctorId.message}</p>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className="block mb-2 font-bold text-gray-700">
              Address
            </label>

            <TextField
              id="address"
              fullWidth
              autoComplete="shipping address-line1"
              variant="outlined"
              {...register("address")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className="block mb-2 font-bold text-gray-700">
              Phone No
            </label>

            <TextField
              id="number"
              fullWidth
              autoComplete="shipping postal-code"
              variant="outlined"
              {...register("number")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className="block mb-2 font-bold text-gray-700">
              Qualification
            </label>
            <TextField
              id="qualification"
              fullWidth
              autoComplete="shipping postal-code"
              variant="outlined"
              {...register("number")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className="block mb-2 font-bold text-gray-700">
              Specialization
            </label>
            <TextField
              id="specialization"
              fullWidth
              autoComplete="shipping postal-code"
              variant="outlined"
              {...register("specialization")}
            />
          </Grid>

          <Grid item xs={12}  className="flex justify-center items-center">
            <button className="mt-8 bg-custom-blue hover:bg-blue-700 text-white w-80 md:w-60 sm:w20 font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg">
              Submit
            </button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default UpdateDoctors;
