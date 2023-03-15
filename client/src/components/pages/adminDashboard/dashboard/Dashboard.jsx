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
      <div className="flex flex-col md:flex-row  w-full ">
        {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
        <div className="flex  md:flex-row flex-col  mt-2">
          <div className=" p-4  pb-0  flex-col">
            {/* ```````````````````````````````````````` */}
            <div className="flex md:flex-col flex-row md:mt-9 md:h-329 md:w-30 w-full md:gap-20 p-10 bg-custom-blue1 rounded-3xl text-white md:text-2xl text-xl font-bold mb-5">
              <div className="flex  py-2 justify-center items-center">
                 Doctors
              </div>
              <div className="flex justify-center items-center ">
                <div className="md:text-8xl w-1/3 text-6xl font-bold text text-white">
                  12
                </div>
              </div>
            </div>
            {/* ```````````````````````````````````````` */}
            <div className="flex md:flex-col flex-row md:mt-9 md:h-329 md:w-30 w-full md:gap-20 p-10 bg-custom-blue1 rounded-3xl text-white md:text-2xl text-xl font-bold mb-5">
              <div className="flex  py-2 justify-center items-center">
                 Rooms
              </div>
              <div className="flex justify-center items-center ">
                <div className="md:text-8xl w-1/3 text-6xl font-bold text text-white">
                  13
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
        <div className="flex md:flex-row flex-col  md:mt-2">
          <div className=" md:p-4 p-4 pt-0 flex-col">
          <div className="flex md:flex-col flex-row md:mt-9 md:h-329 md:w-30 w-full md:gap-20 p-10 bg-custom-blue1 rounded-3xl text-white md:text-2xl text-xl font-bold mb-5">
              <div className="flex  py-2 justify-center items-center">
              Receptionists
              </div>
              <div className="flex justify-center items-center ">
                <div className="md:text-8xl w-1/3 text-6xl font-bold text text-white">
                  12
                </div>
              </div>
            </div>
            <div className="flex md:flex-col flex-row md:mt-9 md:h-329 md:w-30 w-full md:gap-20 p-10 bg-custom-blue1 rounded-3xl text-white md:text-2xl text-xl font-bold mb-5">
              <div className="flex  py-2 justify-center items-center">
                Beds
              </div>
              <div className="flex justify-center items-center ">
                <div className="md:text-8xl w-1/3 text-6xl font-bold text text-white">
                  12
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

        <div className="md:w-1/2 md:p-4 md:mx-auto"></div>
      </div>
    </>
  );
};
export default Dashboard;
