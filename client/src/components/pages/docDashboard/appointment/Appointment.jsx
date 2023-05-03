import React from "react";

// import Sidebar from "./sidebar/Sidebar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { CiSearch } from "react-icons/ci";
import AppointmentList from "./GetAppointment";
import { useSelector } from "react-redux";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useState } from "react";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetPatientNumberQuery,
  useRegisterAppointmentsMutation,
} from "./AppointmentApiSlice";

const Appointment = (props) => {
  const [searchTerm, setsearchTerm] = React.useState([]);
  const [patientNumber, setPatientNumber] = React.useState([]);
  const [email, setEmail] = React.useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const appointmentCount = useSelector(
    (state) => state.appointmentCount.appointmentCount
  );

  const printHandler = (event) => {
    console.log(searchTerm);
    console.log("patientNumber",data);
  };

  // ``````````````````````````````````````````````````````
  const { data } = useGetPatientNumberQuery(patientNumber);
  const patientList = data ?? [];

  const [registerAppointments, { isLoading, error }] =
    useRegisterAppointmentsMutation();

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

  const onSubmit = async (data) => {
    console.log("selectedOption", selectedOption);
    console.log("selectedDate", selectedDate);

    const appointmentData = {
      ...data,
      patientType: "opd",
      appointmentDate: selectedDate.format("YYYY-MM-DD hh:mm:ss"),
      patientId: patientNumber,
      doctorId: props.docId,
      roomNo: 34,
    };

    try {
      const result = await registerAppointments(appointmentData).unwrap();
      if (result) {
        toast.success("Appointment created successfully");
        console.log(appointmentData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setValue("patientType", selectedOption.value);
  };

  const handleDateChange = (selectedDate) => {
    setSelectedDate(dayjs(selectedDate));
  };

  // ``````````````````````````````````````````````````````
  return (
    <>
      <div className="flex flex-col md:flex-row  w-full p-3 ">
        <div className="md:w-1/2 ">
          <div className="flex md:flex-wrap flex-row mt-2">
            <div className="flex flex-row md:mt-9 md:h-60 w-full gap-4 p-10 bg-custom-blue1 rounded-3xl text-white md:text-2xl text-xl font-bold mb-5">
              <div className="flex  w-1/2 flex-col md:gap-24 gap-5">
                <div className="flex ">Hello, Dr. {props.docNameProp} </div>
                <div className="flex text-lg ">
                  You have {appointmentCount} Appointments
                </div>
              </div>
              <div className="flex w-1/2 justify-center items-center">
                <div>
                  <img
                    className="object-cover w-full md:max-h-64 h-full"
                    src="http://127.0.0.1:5173/doctor.png"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className=" md:w-1/2 p-4 w-full text-custom-blue text-xl font-bold">
              Appointments
            </div>
            <div className="md:w-1/2 p-4 ">
              <div className="relative   border border-custom-blue p-2 rounded-3xl">
                <input
                  type="text"
                  className="w-full pl-10 text-sm outline-none  text-custom-blue"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(event) => setsearchTerm(event.target.value)}
                />
                <button
                  className="absolute right-0 top-0 p-2 "
                  onClick={printHandler}
                >
                  <CiSearch className="w-6 h-6  text-custom-blue" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-3 bg-slate-200 rounded-lg">
            <AppointmentList />
          </div>
        </div>

        {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

        <div className="md:w-1/2  md:mx-auto">
          <div className="flex flex-col p-4 gap-8  mt-5  md:ml-10">
            <div className=" md:w-1/2 p-4 w-full text-custom-blue text-xl font-bold">
              Create Revisits
            </div>
            {/* <div className="flex flex-col gap-4 p-6 rounded-lg bg-slate-200  font-semibold"> */}
            <div className="flex flex-col gap-4 p-6 rounded-lg   ">
              {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

              <label className="block mb-2 font-bold text-gray-700">
                Patient
              </label>

              <div className="relative">
                <div className="flex flex-row gap-5">
                  <div className="flex w-2/3 items-center border border-gray-400 p-2 rounded-md focus-within:border-blue-500">
                    <input
                      type="text"
                      className="w-full pr-10 text-sm outline-none text-gray-600 p-1 "
                      placeholder="Search..."
                      value={patientNumber}
                      onChange={(event) => setPatientNumber(event.target.value)}
                    />
                    <button
                      className="absolute right-64 top-0 p-3"
                      onClick={printHandler}
                    >
                      <CiSearch className="w-6 h-6" />
                    </button>
                  </div>
                  
                </div>
                {patientList.length > 0 && (
                    <ul className="mt-2 border border-gray-400 p-2 rounded-lg bg-white text-gray-600">
                      {patientList.map((patient) => (
                        <li
                          key={patient._id}
                          onClick={() => {
                            setPatientNumber(patient._id);
                          }}
                          className="cursor-pointer hover:bg-gray-100 p-2"
                        >
                          {patient.firstname} {patient.lastname}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 text-gray-600"
              >
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <label className="block mb-2 font-bold text-gray-700">
                      Appointment Date
                    </label>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          value={selectedDate}
                          selected={selectedDate}
                          onChange={handleDateChange}
                          format="hh:mm A"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12}>
                    <label className="block mb-2 font-bold text-gray-700">
                      Reason
                    </label>

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
                  <Grid item xs={12}>
                    <label className="block mb-2 font-bold text-gray-700">
                      Notes
                    </label>

                    <TextField
                      id="notes"
                      fullWidth
                      autoComplete="shipping address-line1"
                      variant="outlined"
                      error={errors.notes ? true : false}
                      {...register("notes", { required: "This is required" })}
                    />

                    {errors.notes && (
                      <p className="text-red-500">{errors.notes.message}</p>
                    )}
                  </Grid>

                  <Grid item xs={12} className="flex justify-center ">
                    <button className="mt-11   bg-custom-blue hover:bg-blue-700 text-white w-80 md:w-60 sm:w20 font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg">
                      Create Revisit
                    </button>
                  </Grid>
                </Grid>
              </form>

              {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
            </div>
          </div>
          {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
        </div>
      </div>
    </>
  );
};
export default Appointment;
