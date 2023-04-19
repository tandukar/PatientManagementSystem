import React, { useState, useEffect } from "react";
import { useGetDoctorsQuery } from "../../adminDashboard/Doctor/doctorApiSlice";
import { TablePagination } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetDoctorList = () => {
  // const [doctors, setDoctors] = useState([]);

  const { data: doctors = [], error, isLoading } = useGetDoctorsQuery();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log(doctors);

  const createData = (id, name, email, specialization) => {
    return { id, name, email, specialization };
  };

  const rows = doctors
    ? doctors.map((doctor) => {
        return createData(
          doctor._id,
          doctor.firstname + " " + doctor.lastname,
          doctor.email,
          doctor.specialization
        );
      })
    : [];

  return (
    <>
      <ToastContainer />

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
                      Specialization
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
                          {row.specialization}
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
     
    </>
  );
};

export default GetDoctorList;
