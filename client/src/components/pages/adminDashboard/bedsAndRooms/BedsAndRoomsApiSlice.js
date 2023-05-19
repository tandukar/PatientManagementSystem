import { apiSlice } from "../../../app/apiSlice";

export const BedsAndRoomsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerRooms: builder.mutation({
            query: (body) => ({
                url: "roomBed/room",
                method: "POST",
                body: body,
            }),
            // invalidatesTags: ["RECEPTIONISTS"],
        }),

        registerBeds: builder.mutation({
            query: (body) => ({
                url: "roomBed/bed",
                method: "POST",
                body: body,
            }),
        }),

        getRooms: builder.query({
            query: () => ({
                url: "roomBed/room",
                method: "GET",
            }),
        }),

    }),
});

export const { useRegisterRoomsMutation, useRegisterBedsMutation, useGetRoomsQuery } =
BedsAndRoomsApiSlice;