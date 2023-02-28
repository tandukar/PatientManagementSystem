import React from "react";

// import Sidebar from "./sidebar/Sidebar";

import { CiSearch } from "react-icons/ci";

const DocDashboard = () => {
  const [searchTerm, setsearchTerm] = React.useState([]);
  const [email, setEmail] = React.useState([]);

  const loop = Array.from({ length: 5 }, (_, i) => (
    <div className="bg-white rounded-xl h-10 p-2 flex flex-row" key={i}>
      <div className="w-2/4 ml-5 font-bold text-custom-blue text-md">
        Dr.Milan Maharjan
      </div>
      <div className="w-1/4 font-bold text-gray-500 text-md text-end">Edit</div>
      <div className="w-1/4 font-bold text-red-700 text-md text-end mr-5">
        Delete
      </div>
    </div>
  ));

  const printHandler = (event) => {
    console.log(searchTerm);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row md:mt-10 ">
        {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
        <div className="md:w-1/2 p-4     ">
          <div className="flex md:flex-wrap flex-row   mt-2">
            {/* ```````````````````````````````````````` */}
            <div className="flex flex-row md:mt-9 md:h-60 w-full gap-4 p-10 bg-custom-blue1 rounded-3xl text-white md:text-2xl text-xl font-bold mb-5">
              <div className=" flex w-1/2">Registered Doctors</div>
              <div className="flex  w-1/2 justify-center items-center">
                <div className="md:text-8xl text-6xl font-bold text-white">12</div>
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

          <div className="flex flex-col gap-4 p-3 bg-slate-200 rounded-lg">
            {/* ```````````````````````````````````````` */}
            {loop}
            {/* ```````````````````````````````````````` */}
          </div>
        </div>
        {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

        <div className="md:w-1/2 md:p-4 md:mx-auto">
          <div className="flex flex-col p-4 gap-8  mt-5  md:ml-10">
            <div className=" md:w-1/2 p-4 w-full text-custom-blue text-xl font-bold">
              Register Doctors
            </div>
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-slate-200 font-semibold">
              <div className="flex md:flex-row gap-2 flex-col">
                <div className=" md:container md:mx-auto ">
                  <label className="form-label inline-block mb-2 text-custom-blue">
                    First name
                  </label>
                  <input
                    type="Text"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    onChange={(event) => setEmail(event.target.value)}
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
                      type="Number"
                      className="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="md:container md:mx-auto">
                    <label className="form-label inline-block mb-2 text-custom-blue">
                      Sex
                    </label>
                    <input
                      type="Text"
                      className="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      onChange={(event) => setEmail(event.target.value)}
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
                      type="email"
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
                    type="email"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className=" md:container md:mx-auto ">
                  <label className="form-label inline-block mb-2 text-custom-blue">
                    Address
                  </label>
                  <input
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
                    type="Text"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className=" md:container md:mx-auto ">
                  <label className="form-label inline-block mb-2 text-custom-blue">
                    Specialization
                  </label>
                  <input
                    type="Text"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
              <div className="flex  md:flex-row flex-col gap-2 md:w-1/2">
                <div className="  md:container md:mx-auto ">
                  <label className="form-label inline-block mb-2 text-custom-blue">
                    Schedule
                  </label>
                  <input
                    type="Text"
                    className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
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
