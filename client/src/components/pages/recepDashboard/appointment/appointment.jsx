import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";

import { useForm } from "react-hook-form";
import { useState } from "react";

const CreateAppointment = () => {
  const patientType = [
    { value: "Inpatient", label: "Inpatient" },
    { value: "Outpatient", label: "Outpatient" },
  ];

  const { register, handleSubmit, setValue } = useForm();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSubmit = (data) => {
    console.log({ ...data, selectedDate });
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setValue("patientType", selectedOption.value);
  };
  selectedDate;
  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <label>Patient Id</label>
            <TextField
              required
              id="patientId"
              name="patientId"
              // label="Patient Id"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              {...register("patientId")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <label>Doctor Id</label>

            <TextField
              required
              id="doctorId"
              name="doctorId"
              // label="Doctor Id"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
              {...register("doctorId")}
            />
          </Grid>

          <Grid item xs={12}>
          <label>Reason</label>

            <TextField
              required
              id="Reason"
              name="Reason"
              // label="Reason"
              fullWidth
              autoComplete="shipping address-line1"
              variant="outlined"
              {...register("Reason")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Select patient type</label>
            <Select
              options={patientType}
              name="patientType"
              onChange={handleSelectChange}
              value={selectedOption}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Room No</label>
            <TextField
              required
              id="roomNo"
              name="roomNo"
              // label="Room No"
              fullWidth
              autoComplete="shipping postal-code"
              variant="outlined"
              {...register("roomNo")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className="form-label inline-block mb-2">
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
            <button className="mt-8 bg-custom-blue hover:bg-custom-blue text-white w-80  md:w-60 sm:w20 font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg">
              Submit
            </button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CreateAppointment;
