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
    }),
});

export const { useRegisterPatientMutation, useGetPatientQuery } = patientApiSlice;