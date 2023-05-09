import { apiSlice } from "../../../app/apiSlice";

export const BedsAndRoomsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRooms: builder.query({
            query: () => ({
                url: "roomBed/room",
                method: "GET",
            }),
        }),

        getBeds: builder.query({
            query: (name) => ({
                url: `roomBed/beds/${name}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result ?
                result.map(({ id }) => ({ type: "Beds", id })) : [{ type: "Beds", id: "LIST" }],
        }),
    }),
});

export const { useGetBedsQuery, useGetRoomsQuery } = BedsAndRoomsApiSlice;