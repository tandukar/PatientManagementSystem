import React, { useState, useEffect } from "react";
import { useGetDoctorsQuery } from "../../adminDashboard/Doctor/doctorApiSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetDoctorList = () => {
  // const [doctors, setDoctors] = useState([]);

  const { data: doctors = [], error, isLoading } = useGetDoctorsQuery();

  console.log(doctors);

  return (
    <div>
      <ToastContainer />

      <ul>
        <li>
          <div className=" h-14 p-4 flex flex-row w-200">
            <div className="w-2/4 ml-5 font-bold text-gray-600 text-md">ID</div>
            <div className="w-2/4 ml-5 font-bold text-gray-600  text-md">
              Doctor Name
            </div>
            <div className="w-1/4 font-bold text-gray-600 text-md text-end">
              Specialization
            </div>
            <div className="w-1/4 font-bold text-gray-600  text-md text-end mr-5">
              Qualification
            </div>
          </div>
        </li>
      </ul>
      <div className=" w-200">
        <ul>
          {doctors &&
            doctors.map((doctor) => (
              <div className="p-1 " key={doctor.id}>
                <li>
                  <div className="bg-white rounded-xl h-14 p-4 flex flex-row">
                    <div className="w-2/4 ml-5 font-bold text-gray-600 text-md">
                      {doctor._id}
                    </div>
                    <div className="w-2/4 ml-5 font-bold text-custom-blue text-md">
                      Dr. {doctor.firstname} {doctor.lastname}
                    </div>
                    <div className="w-1/4 font-bold text-pink-600 text-md text-end">
                      {doctor.specialization}
                    </div>
                    <div className="w-1/4 font-bold text-red-700 text-md text-end mr-5">
                      {doctor.qualification}
                    </div>
                  </div>
                </li>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default GetDoctorList;
