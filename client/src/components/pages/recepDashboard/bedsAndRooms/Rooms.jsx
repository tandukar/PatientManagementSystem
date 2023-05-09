import React from "react";
import { useGetBedsQuery, useGetRoomsQuery } from "./BedsAndRoomsApiSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";
import { RxCross2 } from "react-icons/rx";

const ViewRoomHandler = ({ onCancel, name }) => {
  const { data: BedsData = [] } = useGetBedsQuery(name);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-3 w-200">
        <div className="flex justify-end">
          <RxCross2
            onClick={onCancel}
            className="text-3xl  absoulte  text-red-400  hover:text-pink-600"
          />
        </div>
        <div className="px-6">
          {name}

          {/* <CreateAppointment recepId={recepId} patientId={id} /> */}
          {console.log("beds beds", BedsData)}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BedsData?.map((bed) => (
              <div key={bed._id} className=" px-2 mb-4">
                <div
                  className={
                    bed.isAvailable
                      ? "bg-green-200 rounded-lg shadow-md p-4"
                      : "bg-red-200 rounded-lg shadow-md p-4"
                  }
                >
                  <div className="text-gray-800 font-bold">
                    Bed no.{bed.number}
                  </div>
                  <div className="text-gray-800">
                    {bed.isAvailable
                      ? "Available"
                      : `Occupied by ${bed.patient}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GetRooms = () => {
  const [roomName, setRoomName] = useState(null);
  const [showViewRoom, setShowViewRoom] = useState(false);
  const { data: RoomsData = [] } = useGetRoomsQuery();
  console.log("datas===", RoomsData);

  const viewRoomHandler = (id) => {
    console.log(id);

    setRoomName(id);
    setShowViewRoom(true);
  };

  const hideViewRoomHandler = () => {
    setShowViewRoom(false);
  };

  return (
    <>
      <div className="flex flex-col mt-5 ">
        <div className=" md:w-1/2 p-4 w-full text-gray-800 text-xl font-bold">
          Get Rooms
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RoomsData?.map((room) => (
            <div
              key={room._id}
              onClick={() => viewRoomHandler(room.name)}
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
      {showViewRoom && (
        <ViewRoomHandler onCancel={hideViewRoomHandler} name={roomName} />
      )}
    </>
  );
};
export default GetRooms;
