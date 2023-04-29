import React, { useState } from "react";
import { useGetPatientQuery, useGetPatientAppointmentsQuery } from "./PatientApiSlice";
import { TablePagination } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import CreateAppointment from "../appointment/appointment";
import { CiSearch } from "react-icons/ci";

const CreateAppointmentHandler = ({ onCancel, onConfirm, id, recepId }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-3 w-150">
        <div className="flex justify-end">
          <RxCross2
            onClick={onCancel}
            className="text-3xl  absoulte  text-red-400  hover:text-pink-600"
          />
        </div>
        <div className="px-6">
          <CreateAppointment recepId={recepId} patientId={id} />
        </div>
      </div>
    </div>
  );
};

const GetPatients = ({ recepId }) => {
  const { data: patients = [], error, isloading } = useGetPatientQuery();
  const [showCreateAppointment, setShowCreateAppointment] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [searchTerm, setsearchTerm] = React.useState([]);
  const { data} = useGetPatientAppointmentsQuery(searchTerm);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);


  

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

  const showCreateAppointmentHandler = (id) => {
    console.log(id);

    setPatientId(id);
    setShowCreateAppointment(true);
  };

  const hideCreateAppointmentHandler = () => {
    setShowCreateAppointment(false);
  };
  const approveStatusHandler = () => {
    setShowCreateAppointment(false);
  };

  const createData = (id, name, email, phone, action) => {
    return { id, name, email, phone, action };
  };

  const rows = patients
    ? patients.map((patient) => {
        return createData(
          patient._id,
          patient.firstname + " " + patient.lastname,
          patient.email,
          patient.number
        );
      })
    : [];

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
      <div className="flex flex-col mt-5 max-w-full ">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 w-80">
                <thead className="bg-gray-50 w-80 text-center">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-center">
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <tr key={row.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {row.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {row.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {row.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {row.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => showCreateAppointmentHandler(row.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Create Appointment
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <TablePagination
          rowsPerPageOptions={[7, 15, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      {showCreateAppointment && (
        <CreateAppointmentHandler
          onCancel={hideCreateAppointmentHandler}
          onConfirm={approveStatusHandler}
          id={patientId}
          recepId={recepId}
        />
      )}
    </>
  );
};
export default GetPatients;
