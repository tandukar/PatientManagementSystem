import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {
//   useRegisterAppointmentsMutation,
//   useGetDoctorQuery,
// } from "./AppointmentApiSlice";
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
import { CiSearch } from "react-icons/ci";
import specialization from "../../specialization.json";
import {
  useGetDoctorNameQuery,
  useRegisterIpdMutation,
} from "../appointment/AppointmentApiSlice";
import { useGetPatientAppointmentsQuery } from "../patient/PatientApiSlice";
const CreateIpdAdmission = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  // const [receptionId, setReceptionId] = useState(recepId);
  // const [patient, setPatient] = useState(patientId);
  const [searchTerm, setSearchTerm] = useState([]);
  const [patientNumber, setpatientNumber] = useState([]);
  const [specializationTerm, setSpecializationTerm] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);

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

  // console.log("receptionId", receptionId);
  // console.log("patient", patient);

  const [registerIpd, { isLoading, error }] = useRegisterIpdMutation();

  const { data: doctorData } = useGetDoctorNameQuery(searchTerm);
  const { data: appointmentData } =
    useGetPatientAppointmentsQuery(patientNumber);

  const doctorsList = doctorData ?? [];
  const patientsList = appointmentData ?? [];

  // const printHandler = () => {
  //   console.log(searchTerm);
  //   console.log(docName);
  // };

  const handleFilterClick = () => {
    setShowOverlay(true);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
  };

  const onSubmit = async (data) => {
    console.log("data", data);
    console.log("selectedOption", selectedOption);
    console.log("selectedDate", selectedDate);
    const appointmentData = {
      ...data,
      admissionDate: selectedDate.format("YYYY-MM-DD hh:mm:ss"),
      // recepId: receptionId,
      patientId: patientNumber,
      doctorId: searchTerm,
    };
    console.log("appointmentData", appointmentData);
    try {
      const result = await registerIpd(appointmentData).unwrap();
      if (result) {
        toast.success("Appointment created successfully");
        console.log(appointmentData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  const handleSpecializationChange = (event) => {
    setSpecializationTerm(event.target.value);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setValue("patientType", selectedOption.value);
  };
  const handleDateChange = (selectedDate) => {
    setSelectedDate(dayjs(selectedDate));
  };
  // console.log(specializationTerm);

  return (
    <>
      <ToastContainer />
      <div className="text-center my-8">
        <div className="text-4xl">Create Ipd Admission</div>
      </div>

      <label className="block mb-2 font-bold text-gray-700">Doctor</label>
      <div className="relative">
        <div className="flex flex-row">
          <div className="flex flex-row gap-5 w-1/2">
            <div className="flex w-2/3 items-center border border-gray-400 p-2 rounded-md focus-within:border-blue-500">
              <input
                type="text"
                className="w-full pr-10 text-sm outline-none text-gray-600 p-1 "
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>

          <div className="flex  gap-5 w-1/2">
            <div className="w-full items-center border border-gray-400 p-2 rounded-md focus-within:border-blue-500">
              <input
                type="text"
                className="w-full pr-10 text-sm outline-none text-gray-600 p-1 "
                placeholder="Search Patient Phone Number..."
                value={patientNumber}
                onChange={(event) => setpatientNumber(event.target.value)}
              />
            </div>
          </div>
        </div>
        {/* {console.log(s)} */}

        {console.log(doctorsList)}
        {doctorsList.length > 0 && (
          <ul className="mt-2 border border-gray-400 p-2 rounded-lg bg-white text-gray-600">
            {doctorsList.map((doctor) => (
              <li
                key={doctor.id}
                onClick={() => {
                  setSearchTerm(doctor._id);
                }}
                className="cursor-pointer hover:bg-gray-100 p-2"
              >
                {doctor.firstname} {doctor.lastname}{" "}
                <span className="font-bold">{doctor.specialization}</span>
              </li>
            ))}
          </ul>
        )}

        {patientsList.length > 0 && (
          <ul className="mt-2 border border-gray-400 p-2 rounded-lg bg-white text-gray-600">
            {patientsList.map((patient) => (
              <li
                key={patient.id}
                onClick={() => {
                  setpatientNumber(patient._id);
                }}
                className="cursor-pointer hover:bg-gray-100 p-2"
              >
                {patient.firstname} {patient.lastname}
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 text-gray-600">
        <Grid container spacing={4}>
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

          {/* <Grid item xs={12} sm={6}>
            <label className="block mb-2 font-bold text-gray-700">
              Select patient type
            </label>

            <Select
              options={patientType}
              name="patientType"
              onChange={handleSelectChange}
              value={selectedOption}
            />
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <label className="block mb-2 font-bold text-gray-700">
              Room No
            </label>

            <TextField
              id="roomNumber"
              fullWidth
              autoComplete="shipping postal-code"
              variant="outlined"
              error={errors.roomNumber ? true : false}
              {...register("roomNumber", { required: "This is required" })}
            />

            {errors.roomNumber && (
              <p className="text-red-500">{errors.roomNumber.message}</p>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className="block mb-2 font-bold text-gray-700">
              Bed Bumber
            </label>

            <TextField
              id="bedNumber"
              fullWidth
              autoComplete="shipping postal-code"
              variant="outlined"
              error={errors.bedNumber ? true : false}
              {...register("bedNumber", { required: "This is required" })}
            />

            {errors.bedNumber && (
              <p className="text-red-500">{errors.bedNumber.message}</p>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className="block mb-2 font-bold text-gray-700">
              Admission Date
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

          <Grid item xs={12} sm={6} className="flex justify-end ">
            <button className="mt-11   bg-custom-blue hover:bg-blue-700 text-white w-80 md:w-60 sm:w20 font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg">
              Submit
            </button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CreateIpdAdmission;
