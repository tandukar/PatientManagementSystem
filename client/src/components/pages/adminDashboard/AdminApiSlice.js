import { apiSlice } from "../../app/apiSlice";

export const AdminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userDetail: builder.query({
            query: (id) => ({
                url: `admin/${id}`,
                methos: "GET",
            }),
        }),
    }),
});

export const { useUserDetailQuery } = AdminApiSlice;