import { apiSlice } from "../../../app/apiSlice";

export const BedsAndRoomsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        RegisterRooms: builder.mutation({
            query: (body) => ({
                url: "roomBed/room",
                method: "POST",
                body: body,
            }),
            // invalidatesTags: ["RECEPTIONISTS"],
        }),


    })
});




export const { useRegisterRoomsMutation } = BedsAndRoomsApiSlice;