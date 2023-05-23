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

        ipd: builder.query({
            query: (id) => ({
                url: `doctors/ipd/${id}`,
                method: "GET",
            }),
        }),
        sendNotes: builder.mutation({
            query: ({ prescription, patientId }) => ({
                url: `appointments/send`,
                method: "POST",
                body: { prescription: prescription, patientId: patientId },
            }),
        }),


        updatePassword: builder.mutation({
            query: ({ id, oldPassword, newPassword }) => ({
                url: `doctors/updatePassword/${id}`,
                method: "PATCH",
                body: { oldPassword: oldPassword, newPassword: newPassword },
            }),
            invalidatesTags: ["Doctors"],
        }),

        updateAppointmentStatus: builder.mutation({
            query: ({ id, newStatus, recepId, newTime, patientId }) => ({
                url: `appointments/updateAppointmentStatus/${id}`,
                method: "PATCH",
                body: { status: newStatus, recepId: recepId, appointmentDate: newTime, patientId: patientId },
            }),
            invalidatesTags: ["Appointments"],
        }),

        updateIpdStatus: builder.mutation({
            query: ({ id, newStatus, recepId, patientId }) => ({
                url: `ipd/updateIpdStatus/${id}`,
                method: "PATCH",
                body: { status: newStatus, recepId: recepId, patientId: patientId },
            }),
            invalidatesTags: ["DOCTORS"],
        }),

    }),
});
export const {
    useDoctorDetailQuery,
    useAppointmentsQuery,
    useUpdateAppointmentStatusMutation,
    useIpdQuery,
    useUpdateIpdStatusMutation,
    useUpdatePasswordMutation,
    useSendNotesMutation
} = DoctorApiSlice;