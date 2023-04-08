import { apiSlice } from "../../../app/apiSlice";

export const doctorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDoctors: builder.query({
            query: () => "doctors",
            providesTags: (result) => [
                ...result.map(({ id }) => ({ type: "DOCTORS", id })),
                { type: "DOCTORS", id: "LIST" },
            ],
        }),

        registerDoctors: builder.mutation({
            query: (body) => ({
                url: "doctors/register",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["DOCTORS"],
        }),

        deleteDoctors: builder.mutation({
            query: (id) => ({
                url: `doctors/deleteDoc/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["DOCTORS"],
        }),


    }),
});

export const {
    useGetDoctorsQuery,
    useRegisterDoctorsMutation,
    useDeleteDoctorsMutation,

} = doctorApiSlice;