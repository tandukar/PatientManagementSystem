import { apiSlice } from "../../app/apiSlice";

export const DoctorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        doctorDetail: builder.query({
            query: (id) => ({
                url: `doctors/find/${id}`,
                methos: "GET",
            }),
        }),
        appointments: builder.query({
            query: (id) => ({
                url: `doctors/appointments/${id}`,
                methos: "GET",
            }),
        }),



    }),
});
export const { useDoctorDetailQuery, useAppointmentsQuery } = DoctorApiSlice;