import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useGetReceptionistsQuery,
  useDeleteReceptionistsMutation,
} from "./ReceptionistApiSlice";

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

const ReceptionistList = () => {
  const {
    data: receptionists = [],
    error,
    isloading,
  } = useGetReceptionistsQuery();
  const [deleteReceptionistId, setDeleteReceptionistId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [deleteReceptionist] = useDeleteReceptionistsMutation();

  console.log(receptionists);

  // Set the id of the doctor to delete and show the delete confirmation pop-up
  const showDeleteConfirmationHandler = (id) => {
    setDeleteReceptionistId(id);
    setShowDeleteConfirmation(true);
  };

  // Hide the delete confirmation pop-up
  const hideDeleteConfirmationHandler = () => {
    setShowDeleteConfirmation(false);
  };

  // Delete the selected doctor
  const deleteReceptionistHandler = () => {
    console.log(deleteReceptionistId);
    deleteReceptionist(deleteReceptionistId)
      .unwrap()
      .then((result) => {
        console.log(`Receptionist deleted: ${deleteReceptionistId}`);
        setShowDeleteConfirmation(false);
        toast.error("Receptionist deleted successfully");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <ToastContainer />
      <ul>
        {receptionists.map((receptionist) => (
          <div className="p-1 " key={receptionist.id}>
            <li>
              <div className="bg-white rounded-xl h-10 p-2 flex flex-row">
                <div className="w-2/4 ml-5 font-bold text-custom-blue text-md">
                  Dr. {receptionist.firstname} {receptionist.lastname}
                </div>
                <div className="w-1/4 font-bold text-gray-500 text-md text-end">
                  Edit
                </div>
                <div className="w-1/4 font-bold text-red-700 text-md text-end mr-5">
                  <button
                    type="submit"
                    onClick={() =>
                      showDeleteConfirmationHandler(receptionist._id)
                    }
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
          onConfirm={deleteReceptionistHandler}
        />
      )}
    </div>
  );
};

export default ReceptionistList;
