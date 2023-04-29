import { apiSlice } from "../../../app/apiSlice";

export const BedsAndRoomsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getBeds: builder.query({
            query: () => ({
                url: "roomBed/bed",
                method: "GET",

            })
        })

    })
});




export const { useGetBedsQuery } = BedsAndRoomsApiSlice;