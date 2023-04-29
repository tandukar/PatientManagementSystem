import React, { useState, useEffect } from "react";
import {
  useGetPatientQuery,
  useGetPatientAppointmentsQuery,
} from "./PatientApiSlice";
import { TablePagination } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";

const GetPatientAppointment = ({ recepId }) => {
  const { data: patients = [], error, isloading } = useGetPatientQuery();
  const [searchTerm, setsearchTerm] = React.useState([]);
  const { data } = useGetPatientAppointmentsQuery(searchTerm);
  const [list, setList] = useState([patients]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  useEffect(() => {
    if (data) {
      const sortData = [...data];
      const sortedData = sortData.sort(
        (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
      );
      setList(sortedData);
    } else {
      setList([]);
    }
  }, [data, patients, searchTerm]);

  const searchHandler = () => {
    setsearchTerm(searchTerm);
    console.log("searchHandler DATA", data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className=" md:w-1/2 p-4 w-full text-custom-blue text-xl font-bold">
          Find Appointments
        </div>
        <div className="md:w-1/2 p-4 ">
          <div className="relative   border border-custom-blue p-2 rounded-3xl">
            <input
              type="text"
              className="w-full pl-10 text-sm outline-none  text-gray-600"
              placeholder="Search..."
              value={searchTerm}
              onChange={(event) => setsearchTerm(event.target.value)}
            />
            <button
              className="absolute right-0 top-0 p-2 "
              onClick={searchHandler}
            >
              <CiSearch className="w-6 h-6  text-custom-blue" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-3 bg-slate-200 shadow-md rounded-lg">
        {console.log(list)}
        <ul>
          {list.length > 0 ? (
            list.map((patient) => (
              <div className="p-1 " key={patient.id}>
                <li>
                  <div className="bg-white rounded-xl h-10 p-2 flex flex-row">
                    <div className="w-2/4 ml-5 font-bold text-custom-blue text-md">
                      {patient.patientName}
                    </div>
                    <div className="w-2/4 ml-5 font-bold text-custom-blue text-md">
                      {patient.docName}
                    </div>
                    <div className="w-2/4 ml-5 font-bold text-custom-blue text-md">
                      {patient.appointmentDate}
                    </div>

                    <div className="w-1/4 font-bold text-red-700 text-md text-end mr-5">
                      <button
                        type="submit"
                        onClick={() =>
                          showDeleteConfirmationHandler(patient._id)
                        }
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </li>
              </div>
            ))
          ) : (
            <div className="p-1 flex justify-center items-center font-semibold text-red-600">
              No Appointments can be found.
            </div>
          )}
        </ul>
      </div>
    </>
  );
};
export default GetPatientAppointment;
