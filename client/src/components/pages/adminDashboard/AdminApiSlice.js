import { apiSlice } from "../../app/apiSlice";

export const AdminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userDetail: builder.query({
            query: (id) => ({
                url: `admin/${id}`,
                method: "GET",
            }),
        }),
        updatePasswordAdmin: builder.mutation({
            query: ({ id, oldPassword, newPassword }) => ({
                url: `admin/updatePasswordAdmin/${id}`,
                method: "PATCH",
                body: { oldPassword: oldPassword, newPassword: newPassword },
            }),
            invalidatesTags: ["ADMIN"],
        }),
    }),
});

export const { useUserDetailQuery, useUpdatePasswordAdminMutation } = AdminApiSlice;