import React, { useState } from "react";
import { useGetPatientQuery } from "./PatientApiSlice";
import { TablePagination } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import CreateAppointment from "../appointment/Appointment";


const CreateAppointmentHandler = ({ onCancel, onConfirm, id, recepId}) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4  w-150">
        <div className="flex justify-end">
          <RxCross2
            onClick={onCancel}
            className="text-3xl  absoulte  text-red-600  hover:text-pink-600"
          />
        </div>
        <div className="px-8">
          {id}  
          <CreateAppointment recepId={recepId}  />
        </div>
      </div>
    </div>
  );
};

const GetPatients = ({recepId}) => {
  const { data: patients = [], error, isloading } = useGetPatientQuery();
  const [showCreateAppointment, setShowCreateAppointment] = useState(false);
  const [patientId, setPatientId] = useState(null);
  
  // console.log("retrieved",recepId)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

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
