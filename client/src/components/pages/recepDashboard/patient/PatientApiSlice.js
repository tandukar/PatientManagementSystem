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
    }),
});

export const { useRegisterPatientMutation } = patientApiSlice;