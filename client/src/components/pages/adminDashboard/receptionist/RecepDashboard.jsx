import React from "react";
import Box from "@mui/material/Box";
import Select from "react-select";
import ReceptionistList from "./GetReceptionists";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegisterReceptionistsMutation } from "./ReceptionistApiSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";

const RecepDashboard = () => {
  const sex = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedOption, setSelectedOption] = useState(null);

  const [registerReceptionist, { error, isLoading }] =
    useRegisterReceptionistsMutation();

  const onSubmit = (data) => {
    console.log("data", data);
    // console.log("selectedOption", selectedOption);

    const payload = { ...data, sex: selectedOption.value };
    registerReceptionist(payload);
    toast.success("Receptionist registered successfully");
    console.log(payload);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setValue("sex", selectedOption.value);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col md:flex-row  w-full ">
        {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
        <div className="md:w-1/2 p-4">
          <div className="flex md:flex-wrap flex-row ">
            <div className="flex flex-row md:mt-9 md:h-60 w-full gap-4 p-10 bg-custom-blue1 rounded-xl text-white md:text-2xl text-xl font-bold mb-5">
              <div className=" flex w-1/2">Registered Receptionists</div>
              <div className="flex  w-1/2 justify-center items-center">
                <div className="md:text-8xl text-6xl font-bold text-white">
                  <div>
                    <img
                      className="object-cover w-full md:max-h-64 h-full"
                      src="http://127.0.0.1:5173/receptionist.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ReceptionistList />
        </div>
        {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

        <div className="md:w-1/2  md:mx-auto">
          <div className="flex flex-col p-4 gap-8  mt-5 ">
            <div className=" md:w-1/2 p-4 w-full text-custom-blue text-xl font-bold">
              Register Receptionists
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4 p-6 rounded-lg ">
                <div className="flex md:flex-row gap-2 flex-col">
                  <div className=" md:container md:mx-auto ">
                    <label className="form-label inline-block mb-2 text-custom-blue font-semibold">
                      First name
                    </label>
                    <input
                      id="firstname"
                      type="Text"
                      className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      error={errors.firstname ? true : false}
                      {...register("firstname", {
                        required: "First Name is required",
                      })}
                    />
                    {errors.firstname && (
                      <p className="text-red-500">{errors.firstname.message}</p>
                    )}
                  </div>
                  <div className="  md:container md:mx-auto ">
                    <label className="form-label inline-block mb-2 text-custom-blue font-semibold">
                      Last name
                    </label>
                    <input
                      id="lastname"
                      type="Text"
                      className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      error={errors.lastname ? true : false}
                      {...register("lastname", {
                        required: "Last Name is required",
                      })}
                    />
                    {errors.lastname && (
                      <p className="text-red-500">{errors.lastname.message}</p>
                    )}
                  </div>
                </div>
                {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

                <div className="flex flex-col md:flex-row gap-2">
                  <div className="md:w-1/2">
                    <div className="md:container md:mx-auto">
                      <label className="form-label inline-block mb-2 text-custom-blue font-semibold">
                        Age
                      </label>
                      <input
                        id="age"
                        type="Number"
                        className="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        error={errors.age ? true : false}
                        {...register("age", { required: "Age is required" })}
                      />
                      {errors.age && (
                        <p className="text-red-500">{errors.age.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="md:container md:mx-auto">
                      <label className="form-label inline-block mb-2 text-custom-blue font-semibold">
                        Sex
                      </label>
                      <Select
                        options={sex}
                        name="sex"
                        onChange={handleSelectChange}
                        value={selectedOption}
                      />
                    </div>
                  </div>
                  <div className="md:w-full">
                    <div className="md:container md:mx-auto">
                      <label className="form-label inline-block mb-2 text-custom-blue font-semibold">
                        Phone Number
                      </label>
                      <input
                        id="number"
                        type="Text"
                        className="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        error={errors.number ? true : false}
                        {...register("number", {
                          required: "Phone Number is required",
                        })}
                      />
                      {errors.number && (
                        <p className="text-red-500">{errors.number.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
                <div className="flex md:flex-row flex-col gap-2">
                  <div className="  md:container md:mx-auto ">
                    <label className="form-label inline-block mb-2 text-custom-blue font-semibold">
                      Primary Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      error={errors.email ? true : false}
                      {...register("email", {
                        required: "Primary Email is required",
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="  md:container md:mx-auto ">
                    <label className="form-label inline-block mb-2 text-custom-blue font-semibold">
                      Secondary Email
                    </label>
                    <input
                      id="email1"
                      type="email"
                      className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      error={errors.email1 ? true : false}
                      {...register("email1", {
                        required: "Secondary Email is required",
                      })}
                    />
                    {errors.email1 && (
                      <p className="text-red-500">{errors.email1.message}</p>
                    )}
                  </div>
                </div>

                <div className=" w-1/2 md:container md:mx-auto ">
                  <label className="form-label inline-block mb-2 text-custom-blue font-semibold">
                    Address
                  </label>
                  <input
                    id="address"
                    type="Text"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    error={errors.address ? true : false}
                    {...register("address", { required: "This is required" })}
                  />
                  {errors.address && (
                    <p className="text-red-500 ">{errors.address.message}</p>
                  )}
                </div>

                {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
                <div className=" mt-10 mb-10  text-center">
                  <button
                    type="submit"
                    className="bg-custom-blue1 hover:bg-custom-blue text-white w-60  md:w-40 sm:w20 font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
        </div>
      </div>
    </>
  );
};
export default RecepDashboard;
