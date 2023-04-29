import React from "react";
import { useGetBedsQuery } from "./BedsAndRoomsApiSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";

const GetRooms = () => {
  const { data } = useGetBedsQuery();

  console.log("datas===", data);

  return (
    <>
      <div className="flex flex-col mt-5 ">
        <div className=" md:w-1/2 p-4 w-full text-gray-800 text-xl font-bold">
          Get Rooms
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((room) => (
            <div
              key={room._id}
              className={
                room.isAvailable
                  ? "bg-green-200 rounded-lg shadow-md p-4"
                  : "bg-red-200 rounded-lg shadow-md p-4"
              }
            >
              <div className="text-gray-800 font-bold">{room.name}</div>
              <div className="text-gray-500">{room.number}</div>
              <div className="text-gray-500">{room.patient}</div>
              <div className="text-gray-500">
                {room.isAvailable ? "Available" : "Occupied"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default GetRooms;
