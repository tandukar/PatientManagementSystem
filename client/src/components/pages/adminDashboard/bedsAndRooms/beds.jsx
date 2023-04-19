import React from "react";

// import Sidebar from "./sidebar/Sidebar";
import axios from "axios";
import Box from "@mui/material/Box";

import { CiSearch } from "react-icons/ci";

const BedDashboard = () => {
  const [searchTerm, setsearchTerm] = React.useState([]);
  const registerHandler = (event) => {
    const data = new FormData(event.currentTarget);

    // const payload = {
    //   firstname: data.get("fname"),
    //   lastname: data.get("lname"),
    //   age: data.get("age"),
    //   sex: data.get("sex"),
    //   email: data.get("email"),
    //   number: data.get("number"),
    //   qualification: data.get("qualification"),
    //   address: data.get("address"),
    //   specialization: data.get("specialization"),
    // };

    // event.preventDefault();

    // axios
    //   .post("http://localhost:5000/api/doctors/register", payload)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data);
    //   });

    // console.log(payload);
  };
  
  return (
    <>
      <div className="flex flex-col   mt-5 ">
            <div className=" md:w-1/2 p-4 w-full text-custom-blue text-xl font-bold">
              Register Bed
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-lg bg-slate-200 shadow-md font-semibold">
              <Box component="form" onSubmit={registerHandler}>
                <div className="flex md:flex-row gap-2 flex-col">
                  <div className=" md:container md:mx-auto ">
                    <label className="form-label inline-block mb-2 text-custom-blue">
                      Bed ID
                    </label>
                    <input
                      id=" Bed_ID"
                      name="Bed_ID"
                      type="Text"
                      className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="  md:container md:mx-auto ">
                  <label className="form-label inline-block mb-2 text-custom-blue">
                      Room ID
                    </label>
                    <input
                      id=" room_ID"
                      name="room_ID"
                      type="Text"
                      className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

                

                {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
                <div className=" mt-5 mb-5  text-center">
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
    </>
  );
};
export default BedDashboard;
