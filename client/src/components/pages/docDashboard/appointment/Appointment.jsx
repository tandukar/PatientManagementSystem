import React from "react";

// import Sidebar from "./sidebar/Sidebar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { CiSearch } from "react-icons/ci";
import AppointmentList from "./GetAppointment";
import { useSelector } from "react-redux";

const Appointment = (props) => {
  const [searchTerm, setsearchTerm] = React.useState([]);
  const [email, setEmail] = React.useState([]);
  const appointmentCount = useSelector(
    (state) => state.appointmentCount.appointmentCount
  );

  const printHandler = (event) => {
    console.log(searchTerm);
  };
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
            <div className="flex flex-col gap-4 p-6 rounded-lg   font-semibold">
              <div className="flex md:flex-row gap-2 flex-col">
                <div className=" md:container md:mx-auto ">
                  <label className="form-label inline-block mb-2 text-custom-blue">
                    Patient Name
                  </label>
                  <input
                    type="Text"
                    className="bg-whtie appearance-none border-2 border-custom-blue rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="  md:container md:mx-auto ">
                  <label
                    htmlFor="exampleEmail0"
                    className="form-label inline-block mb-2 text-custom-blue"
                  >
                    Doctor Name
                  </label>
                  <input
                    type="Text"
                    className="bg-whtie appearance-none border-2 border-custom-blue rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

              <div className="flex flex-col md:flex-row gap-2">
                <div className="md:container md:mx-auto">
                  <label className="form-label inline-block mb-2 text-custom-blue">
                    Appointment Date
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker className="outline-blue-500" />
                  </LocalizationProvider>
                </div>

                <div className="md:w-full">
                  <div className="md:container md:mx-auto">
                    <label
                      htmlFor="exampleEmail0"
                      className="form-label inline-block mb-2 text-custom-blue"
                    >
                      Appointment time
                    </label>
                    <input
                      type="email"
                      className="bg-white appearance-none border-2 border-custom-blue rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
              <div className="flex  flex-col gap-2">
                <label className="form-label inline-block mb-2 text-custom-blue">
                  Notes
                </label>

                <TextField
                  id="outlined-multiline-static"
                  // label="Multiline"

                  multiline
                  rows={4}
                />

                <label className="form-label inline-block mb-2 text-custom-blue">
                  Reason
                </label>

                <TextField
                  id="outlined-multiline-static"
                  // label="Multiline"
                  className="bg-white"
                  multiline
                  rows={4}
                />
              </div>

              {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
              <div className=" mt-10 mb-10  text-center">
                <button className="bg-custom-blue hover:bg-custom-blue text-white w-60  md:w-40 sm:w20 font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg">
                  Create Revisit
                </button>
              </div>
            </div>
          </div>
          {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
        </div>
      </div>
    </>
  );
};
export default Appointment;
