import { apiSlice } from "../../app/apiSlice";

export const DoctorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        doctorDetail: builder.query({
            query: (id) => ({
                url: `doctors/find/${id}`,
                method: "GET",
            }),
        }),
        appointments: builder.query({
            query: (id) => ({
                url: `doctors/appointments/${id}`,
                method: "GET",
            }),
        }),

        updateAppointmentStatus: builder.mutation({
            query: ({ id, newStatus, recepId }) => ({
                url: `appointments/updateAppointmentStatus/${id}`,
                method: "PATCH",
                body: { status: newStatus, recepId: recepId },
            }),
            invalidatesTags: ["Appointments"],
        }),
    }),
});
export const {
    useDoctorDetailQuery,
    useAppointmentsQuery,
    useUpdateAppointmentStatusMutation,
} = DoctorApiSlice;