import { apiSlice } from "../../../app/apiSlice";

export const ReceptionistApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReceptionists: builder.query({
            query: () => "receptionists",
            providesTags: (result) => [
                ...result.map(({ id }) => ({ type: "RECEPTIONISTS", id })),
                { type: "RECEPTIONISTS", id: "LIST" },
            ],
        }),

        registerReceptionists: builder.mutation({
            query: (body) => ({
                url: "receptionists/register",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["RECEPTIONISTS"],
        }),

        deleteReceptionists: builder.mutation({
            query: (id) => ({
                url: `receptionists/deleteReceptionist/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["RECEPTIONISTS"],
        }),


    }),
});

export const {
    useGetReceptionistsQuery,
    useRegisterReceptionistsMutation,
    useDeleteReceptionistsMutation,
} = ReceptionistApiSlice;