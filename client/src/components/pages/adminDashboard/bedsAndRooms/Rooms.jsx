import React from "react";
import Box from "@mui/material/Box";
import { useRegisterRoomsMutation, useGetRoomsQuery  } from "./BedsAndRoomsApiSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";

const RoomDashboard = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [registerRooms, { isLoading, error }] = useRegisterRoomsMutation();
  const { data: RoomsData = [] } = useGetRoomsQuery();

  const category = [

    { value: "General ward", label: "General ward" },
    { value: "Semi-private room", label: "Semi-private room" },
    { value: "Intensive care unit ", label: "Intensive care unit" },
    { value: "Emergency room", label: "Emergency room" },
    { value: "Operating room", label: "Operating room" },
    { value: "Labor and delivery unit", label: "Labor and delivery unit" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
    console.log("selectedOption", selectedOption);
    const roomData = {
      ...data,
    };
    registerRooms(roomData);
  };

  console.log(RoomsData)


  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setValue("category", selectedCategory.value);
  };
  return (
    <>
      <div className="flex flex-col mt-5 ">
        <div className=" md:w-1/2 p-4 w-full text-custom-blue text-xl font-bold">
          Register Room
        </div>
        <div className="flex flex-col gap-2 p-4 rounded-lg bg-slate-200 shadow-md font-semibold">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex md:flex-row gap-2 flex-col">
              <div className=" md:container md:mx-auto ">
                <label className="form-label inline-block mb-2 text-custom-blue">
                  Room Name
                </label>
                <input
                  id="name"
                  type="Text"
                  className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  error={errors.name ? true : false}
                  {...register("name", { required: "Room Name is required" })}
                />
              </div>
       
              <div className="  md:container md:mx-auto ">
                <label className="block mb-2 font-bold text-custom-blue">
                  Room Type
                </label>
                <Select
                  options={category}
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                />
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
export default RoomDashboard;
