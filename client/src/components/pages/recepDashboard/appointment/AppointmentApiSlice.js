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


    }),
});

export const { useRegisterAppointmentsMutation } = AppointmentApiSlice;