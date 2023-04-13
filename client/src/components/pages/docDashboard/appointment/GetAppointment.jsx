import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useDoctorDetailQuery, useAppointmentsQuery } from "../DoctorApiSlice";
import { getIdFromLocalStorage } from "../../../pages/utlis";
import Appointment from "./Appointment";
import { useSelector, useDispatch } from "react-redux";
import { setAppointmentCount } from "../appointment/AppointmentSlice";

// Delete confirmation pop-up component
const StatusConfirmation = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-8">
        <p className="text-lg font-bold mb-4">Update Status</p>
        <div className="flex justify-end">
          <button
            className="mr-4 bg-custom-blue text-white px-4 py-2 rounded-md"
            onClick={onConfirm}
          >
            Approve
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const createData = (name, appointmentDate, reason, type, action) => {
  return { name, appointmentDate, reason, type, action };
};

const AppointmentList = () => {
  const [userId, setUserId] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null);
  const [showStatusConfirmation, setShowStatusConfirmation] = useState(false);

  const dispatch = useDispatch();
  const appointmentCount = useSelector(
    (state) => state.appointmentCount.appointmentCount
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = getIdFromLocalStorage(token);
    setUserId(id);
    console.log("ID =", userId);
  }, []);

  const {
    data: appointments = [],
    error,
    isLoading,
  } = useAppointmentsQuery(userId);

  // var appointmentCount = appointments.length;
  // console.log("appointments==", appointmentCount);

  useEffect(() => {
    let totalCount = appointments.length;
    dispatch(setAppointmentCount(totalCount));
  }, [appointments, dispatch]);

  // console.log("this is from redux====",appointmentCount);

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "appointmentDate", label: "Appointment Date", minWidth: 100 },
    {
      id: "reason",
      label: "Reason",
      minWidth: 170,
      align: "right",
    },
    {
      id: "type",
      label: "Type",
      minWidth: 170,
      align: "right",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "right",
    },
  ];

  const rows = appointments
    ? appointments.map((appointment) => {
        const appointmentDate = new Date(
          appointment.appointmentDate
        ).toLocaleDateString();
        return createData(
          appointment.patientName,
          appointmentDate,
          appointment.reason,
          appointment.patientType,
          <button
            type="submit"
            onClick={() => showStatusConfirmationHandler(appointment._id)}
          >
            {appointment.status}
          </button>
        );
      })
    : [];

  console.log(rows.length);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Set the id of the doctor to delete and show the delete confirmation pop-up
  const showStatusConfirmationHandler = (id) => {
    setAppointmentId(id);
    setShowStatusConfirmation(true);
  };

  // Hide the delete confirmation pop-up
  const hideStatusConfirmationHandler = () => {
    setShowStatusConfirmation(false);
  };

  
  const updateStatusHandler = () => {
    console.log(appointmentId);
    // deleteDoctor(deleteDoctorId)
    //   .unwrap()
    //   .then((result) => {
    //     console.log(`Doctor deleted: ${deleteDoctorId}`);
    //     setShowDeleteConfirmation(false);
    //     toast.error("Doctor deleted successfully");
    //   })
    //   .catch((error) => console.error(error));
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[7, 15, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* Render the delete confirmation pop-up if it is shown */}
      {showStatusConfirmation && (
        <StatusConfirmation
          onCancel={hideStatusConfirmationHandler}
          onConfirm={updateStatusHandler}
        />
      )}
    </>
  );
};

export default AppointmentList;
