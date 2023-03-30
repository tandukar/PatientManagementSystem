import React, { useState, useEffect } from "react";
import { useGetDoctorsQuery, useDeleteDoctorsMutation } from "./DoctorApiSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = sessionStorage?.getItem("token");

// Delete confirmation pop-up component
const DeleteConfirmation = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
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

const DoctorList = () => {
  // const [doctors, setDoctors] = useState([]);
  const [deleteDoctorId, setDeleteDoctorId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { data :doctors=[], error, isLoading } = useGetDoctorsQuery();
  const [deleteDoctor] = useDeleteDoctorsMutation();



  console.log(doctors);

  // Set the id of the doctor to delete and show the delete confirmation pop-up
  const showDeleteConfirmationHandler = (id) => {
    setDeleteDoctorId(id);
    setShowDeleteConfirmation(true);
  };

  // Hide the delete confirmation pop-up
  const hideDeleteConfirmationHandler = () => {
    setShowDeleteConfirmation(false);
  };

  // Delete the selected doctor
  const deleteDoctorHandler = () => {
    console.log(deleteDoctorId);
    deleteDoctor(deleteDoctorId)
    .unwrap()
    .then((result) => {
      console.log(`Doctor deleted: ${deleteDoctorId}`);
    setShowDeleteConfirmation(false);
    toast.success("Doctor deleted successfully");



    })
    .catch((error) => console.error(error));
  }

  return (
    <div>
      <ToastContainer />
      <ul>
        {doctors && doctors.map((doctor) => (

          <div className="p-1 " key={doctor.id}>
            <li>
              <div className="bg-white rounded-xl h-10 p-2 flex flex-row">
                <div className="w-2/4 ml-5 font-bold text-custom-blue text-md">
                  Dr. {doctor.firstname} {doctor.lastname}
                </div>
                <div className="w-1/4 font-bold text-gray-500 text-md text-end">
                  Edit
                </div>
                <div className="w-1/4 font-bold text-red-700 text-md text-end mr-5">
                  <button
                    type="submit"
                    onClick={() => showDeleteConfirmationHandler(doctor._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>

      {/* Render the delete confirmation pop-up if it is shown */}
      {showDeleteConfirmation && (
        <DeleteConfirmation
          onCancel={hideDeleteConfirmationHandler}
          onConfirm={deleteDoctorHandler}
        />
      )}
    </div>
  );
};

export default DoctorList;