import { apiSlice } from "../../../app/apiSlice";

export const AppointmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        registerAppointments: builder.mutation({
            query: (body) => ({
                url: "appointments/create",
                method: "Post",
                body: body,
            }),
            invalidatesTags: ["APPOINTMENTS"],

        }),

        getPatientNumber: builder.query({
            query: (number) => ({
                url: `doctors/patient/search/${number}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result ?
                result.map(({ id }) => ({ type: "Patients", id })) : [{ type: "Patients", id: "LIST" }],
        }),


    }),
});

export const { useRegisterAppointmentsMutation, useGetPatientNumberQuery } = AppointmentApiSlice;