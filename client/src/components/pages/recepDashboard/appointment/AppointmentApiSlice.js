import { apiSlice } from "../../../app/apiSlice";

export const AppointmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // registerReceptionists: builder.mutation({
        //   query: (body) => ({
        //     url: "receptionists/register",
        //     method: "POST",
        //     body: body,
        //   }),
        //   invalidatesTags: ["RECEPTIONISTS"],
        // }),

        registerAppointments: builder.mutation({
            query: (body) => ({
                url: "appointments/create",
                method: "Post",
                body: body,
            }),
            invalidatesTags: ["APPOINTMENTS"],

        }),

        getDoctor: builder.query({
            query: (firstName) => ({
                url: `doctors/search/${firstName}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result ?
                result.map(({ id }) => ({ type: "Doctor", id })) : [{ type: "Doctor", id: "LIST" }],
        }),


    }),
});

export const { useRegisterAppointmentsMutation, useGetDoctorQuery } = AppointmentApiSlice;