import { apiSlice } from "../../app/apiSlice";

export const RecepApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        recepDetail: builder.query({
            query: (id) => ({
                url: `receptionists/find/${id}`,
                method: "GET",
            }),
        }),

        updatePasswordRecep: builder.mutation({
            query: ({ id, oldPassword, newPassword }) => ({
                url: `receptionists/updatePasswordRecep/${id}`,
                method: "PATCH",
                body: { oldPassword: oldPassword, newPassword: newPassword },
            }),
            invalidatesTags: ["RECEPTIONISTS"],
        }),
    }),
});

export const { useRecepDetailQuery, useUpdatePasswordRecepMutation } = RecepApiSlice;