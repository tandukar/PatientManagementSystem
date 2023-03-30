import React from "react";

import Box from "@mui/material/Box";

import { CiSearch } from "react-icons/ci";

import Profile from "./GetDoctors";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRegisterDoctorsMutation } from "./DoctorApiSlice";

const DocDashboard = () => {
  const [searchTerm, setsearchTerm] = React.useState([]);

  const printHandler = (event) => {
    console.log(searchTerm);
  };

  const [registerDoctor, { isLoading, error }] = useRegisterDoctorsMutation();

  const registerHandler = async (event) => {
    const data = new FormData(event.currentTarget);

    const payload = {
      firstname: data.get("fname"),
      lastname: data.get("lname"),
      age: data.get("age"),
      sex: data.get("sex"),
      email: data.get("email"),
      number: data.get("number"),
      qualification: data.get("qualification"),
      address: data.get("address"),
      specialization: data.get("specialization"),
    };

    event.preventDefault();

    try {
      const register = await registerDoctor(payload).unwrap();
      console.log(register);
      // clear input fields
      event.target.fname.value = "";
      event.target.lname.value = "";
      event.target.age.value = "";
      event.target.sex.value = "";
      event.target.email.value = "";
      event.target.number.value = "";
      event.target.address.value = "";
      event.target.qualification.value = "";
      event.target.specialization.value = "";
      toast.success("Doctor registered successfully");
    } catch (err) {
      console.log(err);
    }

    console.log(payload);
  };
  return (
    <>
    <ToastContainer/>
      <div className="flex flex-col md:flex-row  w-full ">
        {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
        <div className="md:w-2/3 p-4     ">
          <div className="flex md:flex-wrap flex-row  ">
            {/* ```````````````````````````````````````` */}
            <div className="flex flex-row md:mt-9 md:h-60 w-full gap-4 p-10 bg-custom-blue1 rounded-xl text-white md:text-2xl text-xl font-bold mb-5">
              <div className=" flex w-1/2">Registered Doctors</div>
              <div className="flex  w-1/2 justify-center items-center">
                <div className="md:text-8xl text-6xl font-bold text-white">
                  12
                </div>
              </div>
            </div>
            {/* ```````````````````````````````````````` */}
          </div>

          <div className="flex flex-col md:flex-row">
            <div className=" md:w-1/2 p-4 w-full text-custom-blue text-xl font-bold">
              Registered Doctors
            </div>
            <div className="md:w-1/2 p-4 ">
              <div className="relative   border border-custom-blue p-2 rounded-3xl">
                <input
                  type="text"
                  className="w-full pl-10 text-sm outline-none  text-custom-blue"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(event) => setsearchTerm(event.target.value)}
                />
                <button
                  className="absolute right-0 top-0 p-2 "
                  onClick={printHandler}
                >
                  <CiSearch className="w-6 h-6  text-custom-blue" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-3 bg-slate-200 shadow-md rounded-lg">
            {/* ```````````````````````````````````````` */}
            {/* {loop} */}
            <Profile />

            {/* ```````````````````````````````````````` */}
          </div>
        </div>
        {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

        <div className="md:w-1/2  md:mx-auto">
          <div className="flex flex-col p-4 gap-8  mt-5 ">
            <div className=" md:w-1/2 p-4 w-full text-custom-blue text-xl font-bold">
              Register Doctors
            </div>
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-slate-200 shadow-md font-semibold">
              <Box component="form" onSubmit={registerHandler}>
                <div className="flex md:flex-row gap-2 flex-col">
                  <div className=" md:container md:mx-auto ">
                    <label className="form-label inline-block mb-2 text-custom-blue">
                      First name
                    </label>
                    <input
                      id="fname"
                      name="fname"
                      type="Text"
                      className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="  md:container md:mx-auto ">
                    <label
                      htmlFor="exampleEmail0"
                      className="form-label inline-block mb-2 text-custom-blue"
                    >
                      Last name
                    </label>
                    <input
                      id="lname"
                      name="lname"
                      type="Text"
                      className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

                <div className="flex flex-col md:flex-row gap-2">
                  <div className="md:w-1/2">
                    <div className="md:container md:mx-auto">
                      <label className="form-label inline-block mb-2 text-custom-blue">
                        Age
                      </label>
                      <input
                        id="age"
                        name="age"
                        type="Number"
                        className="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="md:container md:mx-auto">
                      <label className="form-label inline-block mb-2 text-custom-blue">
                        Sex
                      </label>
                      <input
                        id="sex"
                        name="sex"
                        type="Text"
                        className="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="md:w-full">
                    <div className="md:container md:mx-auto">
                      <label
                        htmlFor="exampleEmail0"
                        className="form-label inline-block mb-2 text-custom-blue"
                      >
                        Phone Number
                      </label>
                      <input
                        id="number"
                        name="number"
                        type="Text"
                        className="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
                <div className="flex md:flex-row flex-col gap-2">
                  <div className="  md:container md:mx-auto ">
                    <label className="form-label inline-block mb-2 text-custom-blue">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className=" md:container md:mx-auto ">
                    <label className="form-label inline-block mb-2 text-custom-blue">
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="Text"
                      className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
                <div className="flex  md:flex-row flex-col gap-2">
                  <div className="  md:container md:mx-auto ">
                    <label className="form-label inline-block mb-2 text-custom-blue">
                      Qualification
                    </label>
                    <input
                      id="qualification"
                      name="qualification"
                      type="Text"
                      className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className=" md:container md:mx-auto ">
                    <label className="form-label inline-block mb-2 text-custom-blue">
                      Specialization
                    </label>
                    <input
                      id="specialization"
                      name="specialization"
                      type="Text"
                      className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
                <div className=" mt-10 mb-10  text-center">
                  <button
                    type="submit"
                    className="bg-custom-blue hover:bg-custom-blue text-white w-60  md:w-40 sm:w20 font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg"
                  >
                    Submit
                  </button>
                </div>
              </Box>
            </div>
          </div>
          {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
        </div>
      </div>
    </>
  );
};
export default DocDashboard;
