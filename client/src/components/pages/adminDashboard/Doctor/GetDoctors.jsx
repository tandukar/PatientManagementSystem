import React, { useState, useEffect } from "react";
import {
  useGetDoctorsQuery,
  useDeleteDoctorsMutation,
  useGetDoctorNameQuery,
} from "./doctorApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";

import UpdateDoctors from "./UpdateDoctors";
// Delete confirmation pop-up component
const DeleteConfirmation = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-8">
        <p className="text-lg font-bold mb-4">
          Are you sure you want to delete this doctor?
        </p>
        <div className="flex justify-end">
          <button className="mr-4" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="bg-custom-blue text-white px-4 py-2 rounded-md"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Update confirmation pop-up component
const UpdateConfirmation = ({ onCancel, doctorId }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4  w-150">
        <div className="flex justify-end">
          <RxCross2
            onClick={onCancel}
            className="text-3xl  absoulte  text-red-600  hover:text-pink-600"
          />
        </div>
        <div className="px-8">
          <UpdateDoctors docId={doctorId} />
        </div>
      </div>
    </div>
  );
};

const DoctorList = () => {
  const [doctorID, setdoctorID] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const { data: doctors = [], error, isLoading } = useGetDoctorsQuery();
  const [list, setList] = useState([doctors]);
  const [deleteDoctor] = useDeleteDoctorsMutation();

  const [searchTerm, setsearchTerm] = React.useState([]);
  const { data } = useGetDoctorNameQuery(searchTerm);

  useEffect(() => {
    if (data) {
      setList(data);
    } else {
      setList(doctors);
    }
    if (!searchTerm) {
      setList(doctors);
    }
  }, [data, doctors, searchTerm]);

  const searchHandler = () => {
    console.log("searchHandler DATA", data);
    setsearchTerm(searchTerm);

    // setList(searchTerm)
  };


  // Set the id of the doctor to delete and show the delete confirmation pop-up
  const showDeleteConfirmationHandler = (id) => {
    setdoctorID(id);
    setShowDeleteConfirmation(true);
  };

  // Set the id of the doctor to update and show the update confirmation pop-up
  const showUpdateConfirmationHandler = (id) => {
    setdoctorID(id);
    setShowUpdateConfirmation(true);
    console.log("doc", id);
  };

  // Hide the delete confirmation pop-up
  const hideDeleteConfirmationHandler = () => {
    setShowDeleteConfirmation(false);
  };
  // Hide the update confirmation pop-up
  const hideUpdateConfirmationHandler = () => {
    setShowUpdateConfirmation(false);
  };

  // Delete the selected doctor
  const deleteDoctorHandler = () => {
    console.log(doctorID);
    deleteDoctor(doctorID)
      .unwrap()
      .then((result) => {
        console.log(`Doctor deleted: ${doctorID}`);
        setShowDeleteConfirmation(false);
        toast.error("Doctor deleted successfully");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>

      <div className="flex flex-col md:flex-row">
        <div className=" md:w-1/2 p-4 w-full text-custom-blue text-xl font-bold">
          Registered Doctors
        </div>
        <div className="md:w-1/2 p-4 ">
          <div className="relative   border border-custom-blue p-2 rounded-3xl">
            <input
              type="text"
              className="w-full pl-10 text-sm outline-none  text-gray-600"
              placeholder="Search..."
              value={searchTerm}
              onChange={(event) => setsearchTerm(event.target.value)}
            />
            <button
              className="absolute right-0 top-0 p-2 "
              onClick={searchHandler}
            >
              <CiSearch className="w-6 h-6  text-custom-blue" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-3 bg-slate-200 shadow-md rounded-lg">
        <ul>
          {list.length > 0 ? (
            list.map((doctor) => (
              <div className="p-1 " key={doctor.id}>
                <li>
                  <div className="bg-white rounded-xl h-10 p-2 flex flex-row">
                    <div className="w-2/4 ml-5 font-bold text-custom-blue text-md">
                      Dr. {doctor.firstname} {doctor.lastname}
                    </div>
                    <div className="w-1/4 font-bold text-gray-500 text-md text-end">
                      <button
                        type="submit"
                        onClick={() =>
                          showUpdateConfirmationHandler(doctor._id)
                        }
                      >
                        Edit
                      </button>
                    </div>
                    <div className="w-1/4 font-bold text-red-700 text-md text-end mr-5">
                      <button
                        type="submit"
                        onClick={() =>
                          showDeleteConfirmationHandler(doctor._id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              </div>
            ))
          ) : (
            <div className="p-1 flex justify-center items-center font-semibold text-red-600">
              No doctors found.
            </div>
          )}
        </ul>

        {/* Render the delete confirmation pop-up if it is shown */}
        {showDeleteConfirmation && (
          <DeleteConfirmation
            onCancel={hideDeleteConfirmationHandler}
            onConfirm={deleteDoctorHandler}
          />
        )}
        {/* Render the delete confirmation pop-up if it is shown */}
        {showUpdateConfirmation && (
          <UpdateConfirmation
            onCancel={hideUpdateConfirmationHandler}
            doctorId={doctorID}
            // onConfirm={UpdateDoctorHandler}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorList;
