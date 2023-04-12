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

const createData = (name, appointmentDate, reason, type) => {
  return { name, appointmentDate, reason, type };
};

const AppointmentList = () => {
  const [userId, setUserId] = useState(null);

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
          appointment.patientType
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

  return (
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
  );
};

export default AppointmentList;
