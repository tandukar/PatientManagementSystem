import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  useRegisterBedsMutation,
  useGetRoomsQuery,
} from "./BedsAndRoomsApiSlice";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BedDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [registerBeds, { isLoading, error }] = useRegisterBedsMutation();

  const { data: RoomsData = [] } = useGetRoomsQuery();

  console.log(RoomsData);

  const handleRoomChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
    console.log("selectedOption", selectedOption);
    const bedData = {
      ...data,
      roomName: selectedOption,
    };
    registerBeds(bedData)
      .unwrap()
      .then(() => {
        toast.success("Successfully registered bed!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="flex flex-col   mt-5 ">
        <div className=" md:w-1/2 p-4 w-full text-custom-blue text-xl font-bold">
          Register Bed
        </div>
        <div className="flex flex-col gap-2 p-4 rounded-lg bg-slate-200 shadow-md font-semibold">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex md:flex-row gap-2 flex-col">
              <div className=" md:container md:mx-auto ">
                <label className="form-label inline-block mb-2 text-custom-blue">
                  Bed Number
                </label>
                <input
                  id="number"
                  type="Text"
                  className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  error={errors.number ? true : false}
                  {...register("number", { required: "Bed Numbe is required" })}
                />
              </div>
              <div className="  md:container md:mx-auto ">
                <label className="form-label inline-block mb-2 text-custom-blue">
                  Room Name
                </label>
                {/* <input
                  id=" roomName"
                  type="Text"
                  className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  error={errors.roomName ? true : false}
                  {...register("roomName", {
                    required: "Room Name is required",
                  })}
                /> */}

                <select
                  className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  value={selectedOption}
                  onChange={handleRoomChange}
                >
                  {RoomsData.map((room) => (
                    <option key={room.name} value={room.name}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className=" mt-5 mb-5  text-center">
              <button
                type="submit"
                className="bg-custom-blue hover:bg-custom-blue text-white w-60  md:w-40 sm:w20 font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default BedDashboard;
