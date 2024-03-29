import { apiSlice } from "../../../app/apiSlice";

export const patientApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerPatient: builder.mutation({
            query: (body) => ({
                url: "patients/register",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["PATIENTS"],
        }),
        getPatient: builder.query({
            query: () => "patients",
            provideTags: (result) => [
                ...result.map(({ id }) => ({ type: "PATIENTS", id })),
                { type: "PATIENTS", id: "LIST" },
            ],
        }),

        getPatientInfo: builder.query({
            query: (number) => ({
                url: `doctors/patient/search/${number}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result ?
                result.map(({ id }) => ({ type: "Patients", id })) : [{ type: "Patients", id: "LIST" }],
        }),
        getPatientAppointments: builder.query({
            query: (number) => ({
                url: `patients/appointment/search/${number}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result ?
                result.map(({ id }) => ({ type: "Patients", id })) : [{ type: "Patients", id: "LIST" }],
        }),

        getIpdPatients: builder.query({
            query: (number) => ({
                url: `patients/ipd/search/${number}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result ?
                result.map(({ id }) => ({ type: "Patients", id })) : [{ type: "Patients", id: "LIST" }],
        }),

        getOpdBill: builder.query({
            query: (adminId) => ({
                url: `admin/${adminId}`,
                method: "GET",
            }),
        }),
        shiftIpdPatient: builder.mutation({
            query: ({ id, roomNumber, bedNumber, patientId, patientName }) => ({
                url: `ipd/updateRoomBed/${id}`,
                method: "PATCH",
                body: { roomNumber: roomNumber, bedNumber: bedNumber, patientId: patientId, patientName: patientName },

            }),
            invalidatesTags: ["PATIENTS"],
        }),

    }),
});

export const { useRegisterPatientMutation, useGetPatientQuery, useGetIpdPatientsQuery, useGetPatientInfoQuery, useGetPatientAppointmentsQuery, useGetOpdBillQuery, useShiftIpdPatientMutation } =
patientApiSlice;