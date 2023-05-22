import { apiSlice } from "../../app/apiSlice";

export const AuthApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendOpt: builder.mutation({
            query: (body) => ({
                url: `auth/forgotpassword`,
                method: "POST",
                body: body,
            }),
        }),
        verifyOpt: builder.mutation({
            query: (body) => ({
                url: `auth/verify-otp`,
                method: "POST",
                body: body,

            }),
        }),
        resetPass: builder.mutation({
            query: (body) => ({
                url: `auth/reset-password`,
                method: "PATCH",
                body: body,


            }),
        }),
    }),
});
export const {
    useResetPassMutation,
    useSendOptMutation,
    useVerifyOptMutation,
} = AuthApiSlice;