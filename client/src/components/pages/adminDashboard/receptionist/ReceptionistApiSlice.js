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

        updateReceptionist: builder.mutation({
            query: ({ id, body }) => ({
                url: `receptionists/updateRecep/${id}`,
                method: "PATCH",
                body: body,

            }),
            invalidatesTags: ["RECEPTIONISTS"],
        }),

        getReceptionist: builder.query({
            query: (id) => ({
                url: `receptionists/find/${id}`,
                method: "GET",
            }),
        }),



        getReceptionistName: builder.query({
            query: (firstName) => ({
                url: `receptionists/search/${firstName}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result ?
                result.map(({ id }) => ({ type: "Receptionist", id })) : [{ type: "Receptionist", id: "LIST" }],
        }),

    }),
});

export const {
    useGetReceptionistsQuery,
    useRegisterReceptionistsMutation,
    useDeleteReceptionistsMutation,
    useGetReceptionistNameQuery,
    useUpdateReceptionistMutation,
    useGetReceptionistQuery,
} = ReceptionistApiSlice;