import React from "react";

// import Sidebar from "./sidebar/Sidebar";

import { CiSearch } from "react-icons/ci";

const Dashboard = () => {
  const [searchTerm, setsearchTerm] = React.useState([]);
  const [email, setEmail] = React.useState([]);

  const printHandler = (event) => {
    console.log(searchTerm);
  };
  return (
    <>
      {/* <div className="bg-slate-800"> */}
        <div className="flex  flex-wrap   gap-5 p-8 ">
          {/* ```````````````````````````````````````` */}
         
          <div className="flex  flex-row md:mt-5 md:h- md:w-1/4 w-full  p-10 bg-custom-blue1  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-114 hover:shadow-xl hover:shadow-blue-500/50  duration-300 rounded-xl text-white  text-xl font-bold mb-5">
            <div className=" flex w-2/3">Registered Doctors</div>
            <div className="flex  w-1/3 justify-center items-center">
              <div className=" text-6xl font-bold text-white">12</div>

            </div>
          </div>
          {/* ```````````````````````````````````````` */}
          <div className="flex  flex-row md:mt-5 md:h- md:w-1/4 w-full  p-10 bg-custom-blue1  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-114 hover:shadow-xl hover:shadow-blue-500/50  duration-300 rounded-xl text-white  text-xl font-bold mb-5">
            <div className=" flex w-2/3">Registered Rooms</div>
            <div className="flex  w-1/3 justify-center items-center">
              <div className=" text-6xl font-bold text-white">12</div>
            </div>
          </div>
          {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
          <div className="flex  flex-row md:mt-5 md:h- md:w-1/4 w-full  p-10 bg-custom-blue1  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-114 hover:shadow-xl hover:shadow-blue-500/50  duration-300 rounded-xl text-white  text-xl font-bold mb-5">
            <div className=" flex w-2/3">Registered Receptionists</div>
            <div className="flex  w-1/3 justify-center items-center">
              <div className=" text-6xl font-bold text-white">12</div>
            </div>
          </div>
          <div className="flex  flex-row  md:h- md:w-1/4 w-full  p-10 bg-custom-blue1  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-114 hover:shadow-xl hover:shadow-blue-500/50  duration-300 rounded-xl text-white  text-xl font-bold mb-5">
            <div className=" flex w-2/3">Registered Beds</div>
            <div className="flex  w-1/3 justify-center items-center">
              <div className=" text-6xl font-bold text-white">12</div>
            </div>
          </div>
          {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
        {/* </div> */}
      </div>
    </>
  );
};
export default Dashboard;
