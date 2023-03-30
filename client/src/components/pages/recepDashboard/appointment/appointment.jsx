import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CreateAppointment() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="patientId"
            name="patientId"
            label="Patient Id"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="doctorId"
            name="doctorId"
            label="Doctor Id"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
 
        <Grid item xs={12}>
          <TextField
            required
            id="Reason"
            name="Reason"
            label="Reason"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
       
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ipd"
            name="ipd"
            label="ipd"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="opd"
            name="opd"
            label="opd"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="roomNo"
            name="roomNo"
            label="Room No"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label className="form-label inline-block mb-2">
            Appointment Date
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker className="outline-blue-500" />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  );
}
