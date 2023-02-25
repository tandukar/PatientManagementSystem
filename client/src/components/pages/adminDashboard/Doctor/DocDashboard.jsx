import React from "react";

// import Sidebar from "./sidebar/Sidebar";

import { CiSearch } from "react-icons/ci";

const DocDashboard = () => {
  const [searchTerm, setsearchTerm] = React.useState([]);
  const [email, setEmail] = React.useState([]);

  const printHandler = (event) => {
    console.log(searchTerm);
  };
  return (
    <>
      <div className="flex flex-wrap ">
        <div className="w-1/2 p-4   ">
          <div className="flex flex-wrap  mt-5">
            <div className="w-1/2 p-4 font-bold text-custom-blue text-xl">
              Registered Doctors
            </div>
            <div className="w-1/2 p-4 ">
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
          <div className="flex flex-col gap-4 p-3 bg-slate-200 rounded-xl">
            {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

            <div className="bg-white rounded-xl h-10 p-2 flex flex-row  ">
              <div className="w-2/4 ml-5 font-bold text-custom-blue text-md ">
                Dr.Milan Maharjan
              </div>
              <div className="w-1/4    font-bold  text-gray-500 text-md text-end">
                Edit
              </div>
              <div className="w-1/4  font-bold text-red-700 text-md text-end mr-5">
                Delete
              </div>
            </div>
            {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

            <div className="bg-white rounded-xl h-10 p-2 flex flex-row  ">
              <div className="w-2/4 ml-5 font-bold text-custom-blue text-md ">
                Dr.Milan Maharjan
              </div>
              <div className="w-1/4    font-bold  text-gray-500 text-md text-end">
                Edit
              </div>
              <div className="w-1/4  font-bold text-red-700 text-md text-end mr-5">
                Delete
              </div>
            </div>
            {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

            <div className="bg-white rounded-xl h-10 p-2 flex flex-row  ">
              <div className="w-2/4 ml-5 font-bold text-custom-blue text-md ">
                Dr.Milan Maharjan
              </div>
              <div className="w-1/4    font-bold  text-gray-500 text-md text-end">
                Edit
              </div>
              <div className="w-1/4  font-bold text-red-700 text-md text-end mr-5">
                Delete
              </div>
            </div>
            {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

            <div className="bg-white rounded-xl h-10 p-2 flex flex-row  ">
              <div className="w-2/4 ml-5 font-bold text-custom-blue text-md ">
                Dr.Milan Maharjan
              </div>
              <div className="w-1/4    font-bold  text-gray-500 text-md text-end">
                Edit
              </div>
              <div className="w-1/4  font-bold text-red-700 text-md text-end mr-5">
                Delete
              </div>
            </div>
            {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
          </div>
        </div>
        {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

        <div className="w-1/2 p-4 md:mx-auto">
          <div className="flex flex-col p-4 gap-8  mt-5  ml-10">
            <div className=" font-bold text-custom-blue text-xl">
              Register Doctors
            </div>
            <div className="flex flex-col gap-4 p-6 rounded-xl">
              <div className="flex flex-row gap-2">
                <div className=" md:container md:mx-auto ">
                  <label className="form-label inline-block mb-2 text-gray-700">
                    First name
                  </label>
                  <input
                    type="Text"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    placeholder="First Name"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="  md:container md:mx-auto ">
                  <label
                    htmlFor ="exampleEmail0"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Last name
                  </label>
                  <input
                    type="Text"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    placeholder="Last name"
                  />
                </div>
              </div>
              {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

              <div className="flex flex-row gap-2">
                <div className=" md:container md:mx-auto ">
                  <label className="form-label inline-block mb-2 text-gray-700">
                    Age
                  </label>
                  <input
                    type="Number"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    placeholder="Patient Age"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className=" md:container md:mx-auto ">
                  <label className="form-label inline-block mb-2 text-gray-700">
                    Sex
                  </label>
                  <input
                    type="Text"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    placeholder="Patient Name"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="  md:container md:mx-auto ">
                  <label
                    htmlFor ="exampleEmail0"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="email"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
              <div className="flex flex-row gap-2">
                <div className="  md:container md:mx-auto ">
                  <label className="form-label inline-block mb-2 text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    placeholder="Email"
                  />
                </div>

                <div className=" md:container md:mx-auto ">
                  <label className="form-label inline-block mb-2 text-gray-700">
                    Address
                  </label>
                  <input
                    type="Text"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    placeholder="Address"
                  />
                </div>
              </div>
              {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
              <div className="flex flex-row gap-2">
                <div className="  md:container md:mx-auto ">
                  <label className="form-label inline-block mb-2 text-gray-700">
                    Qualification
                  </label>
                  <input
                    type="Text"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    placeholder="Qualification"
                  />
                </div>

                <div className=" md:container md:mx-auto ">
                  <label className="form-label inline-block mb-2 text-gray-700">
                    Specialization
                  </label>
                  <input
                    type="Text"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    placeholder="Specialization"
                  />
                </div>
              </div>
              {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
              <div className="flex flex-row gap-2 w-1/2">
                <div className="  md:container md:mx-auto ">
                  <label className="form-label inline-block mb-2 text-gray-700">
                    Schedule
                  </label>
                  <input
                    type="Text"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    placeholder="Schedule"
                  />
                </div>
              </div>

              {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
              <div className=" mt-10 mb-10  text-center">
                <button className="bg-custom-blue hover:bg-custom-blue text-white w-60  md:w-40 sm:w20 font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg">
                  Submit
                </button>
              </div>
            </div>
          </div>
          {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
        </div>
      </div>
    </>
  );
};
export default DocDashboard;
