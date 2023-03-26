import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="reason"
            name="reason"
            label="Reason"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="notes"
            name="notes"
            label="Notes"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="procedures"
            name="procedures"
            label="Procedures"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="diagnosis"
            name="diagnosis"
            label="Diagnosis"
            fullWidth
            autoComplete="shipping address-line2"
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
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </>
  );
}
