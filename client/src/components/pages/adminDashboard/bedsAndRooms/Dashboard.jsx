import React from "react";

// import Sidebar from "./sidebar/Sidebar";
import axios from "axios";
import Box from "@mui/material/Box";

import BedDashboard from "./beds";
import RoomDashboard from "./Rooms";

import { CiSearch } from "react-icons/ci";

const BedsRoomsDashboard = () => {
  const [searchTerm, setsearchTerm] = React.useState([]);

  const printHandler = (event) => {
    console.log(searchTerm);
  };

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
      <div className="flex flex-col md:flex-row  w-full ">
        {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
        <div className="md:w-2/3 p-4     ">
          <div className="flex md:flex-wrap flex-row  ">
            {/* ```````````````````````````````````````` */}
            <div className="flex flex-row md:mt-9 md:h-60 w-full gap-4 p-10 bg-custom-blue1 rounded-xl text-white md:text-2xl text-xl font-bold mb-5">
              <div className=" flex w-1/2">Registered Rooms </div>
              <div className="flex  w-1/2 justify-center items-center">
                <div className="md:text-8xl text-6xl font-bold text-white">
                  12
                </div>
              </div>
            </div>
          </div>
        {/* ````````````````````````````````````````````````````````` */}

          <div className="flex md:flex-wrap flex-row  ">
            {/* ```````````````````````````````````````` */}
            <div className="flex flex-row md:h-60 w-full gap-4 p-10 bg-custom-blue1 rounded-xl text-white md:text-2xl text-xl font-bold mb-5">
              <div className=" flex w-1/2">Registered Beds </div>
              <div className="flex  w-1/2 justify-center items-center">
                <div className="md:text-8xl text-6xl font-bold text-white">
                  12
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

        <div className="md:w-1/2  md:mx-auto">
            <BedDashboard/>
            <RoomDashboard/>
        </div>
      </div>
    </>
  );
};
export default BedsRoomsDashboard;
