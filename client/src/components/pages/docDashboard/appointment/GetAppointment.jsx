// Import required dependencies
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
import { useUpdateAppointmentStatusMutation } from "../DoctorApiSlice";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

// Component for the confirmation pop-up used to update appointment status
const StatusConfirmation = ({
  onCancel,
  onConfirm,
  selectedDate,
  handleDateChange,
}) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-8 border border-gray-300">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Update Appointment Status
        </h2>

        <label className="block mb-2 font-semibold text-gray-700">
          Appointment Date and Time:
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
        <div className="flex justify-end mt-3">
          <button
           className="mr-4 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Approve
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Function to create a data object for each appointment
const createData = (name, appointmentDate, reason, type, action) => {
  return { name, appointmentDate, reason, type, action };
};

// Main component for the appointment list
const AppointmentList = () => {
  // Set up state variables
  const [userId, setUserId] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null);
  const [receptionstId, setReceptionistId] = useState(null);
  const [showStatusConfirmation, setShowStatusConfirmation] = useState(false);
  const [updateAppointmentStatus] = useUpdateAppointmentStatusMutation();
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Function to handle changes to the date picker
  const handleDateChange = (selectedDate) => {
    setSelectedDate(dayjs(selectedDate));
  };

  // Set up state variables and functions from Redux
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

  useEffect(() => {
    let totalCount = appointments.length;
    dispatch(setAppointmentCount(totalCount));
  }, [appointments, dispatch]);

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
        const appointmentDay = new Date(
          appointment.appointmentDate
        ).toLocaleDateString();
        const appointmentTime = new Date(
          appointment.appointmentDate
        ).toLocaleTimeString([], { hour: "numeric", minute: "numeric" });

        return createData(
          appointment.patientName,
          <>
            <span className="text-teal-500 font-semibold">
              {appointmentDay}
              <br />
              {appointmentTime}
            </span>
          </>,
          appointment.reason,
          appointment.patientType,
          <button
            type="submit"
            onClick={() =>
              showStatusConfirmationHandler(
                appointment._id,
                appointment.recepId
              )
            }
            className={
              appointment.status === "Pending"
                ? "text-blue-600 font-bold"
                : appointment.status === "Approved"
                ? "text-green-600 font-bold"
                : "text-red-600 font-bold"
            }
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
  const showStatusConfirmationHandler = (id, recepId) => {
    setAppointmentId(id);
    setReceptionistId(recepId);
    setShowStatusConfirmation(true);
  };

  // Hide the delete confirmation pop-up
  const cancelStatusHandler = () => {
    console.log("from cancel", appointmentId);
    updateAppointmentStatus({
      id: appointmentId,
      newStatus: "Cancelled",
      recepId: receptionstId,
    })
      .unwrap()
      .then((result) => {
        setShowStatusConfirmation(false);
      })
      .catch((error) => console.error(error));
  };

  const approveStatusHandler = () => {
    console.log(selectedDate);
    console.log("from approve", appointmentId);
    updateAppointmentStatus({
      id: appointmentId,
      newStatus: "Approved",
      recepId: receptionstId,
      newTime: selectedDate.format("YYYY-MM-DD hh:mm:ss"),
    })
      .unwrap()
      .then((result) => {
        setShowStatusConfirmation(false);
      })
      .catch((error) => console.error(error));
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
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#f5f5f5",
                      fontWeight: "bold",
                      color: "#555555",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#f5f5f5",
                      }}
                    >
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
          onCancel={cancelStatusHandler}
          onConfirm={approveStatusHandler}
          handleDateChange={handleDateChange}
        />
      )}
    </>
  );
};

export default AppointmentList;
