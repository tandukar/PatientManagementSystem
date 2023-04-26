import { createSlice } from "@reduxjs/toolkit";

export const AppointmentSlice = createSlice({
    name: "count",
    initialState: {
        appointmentCount: 0,
    },
    reducers: {

        setAppointmentCount: (state, action) => {

            state.appointmentCount = action.payload;
        },
    },
});

export const { setAppointmentCount } = AppointmentSlice.actions;
export default AppointmentSlice.reducer;