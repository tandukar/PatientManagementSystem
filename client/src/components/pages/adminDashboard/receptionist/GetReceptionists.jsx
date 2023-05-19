import React, { useState, useEffect } from "react";
import UpdateReceptionist from "./UpdateReceptionist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

import {
  useGetReceptionistsQuery,
  useDeleteReceptionistsMutation,
  useGetReceptionistNameQuery
} from "./ReceptionistApiSlice";

// Delete confirmation pop-up component
const DeleteConfirmation = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-8">
        <p className="text-lg font-bold mb-4">
          Are you sure you want to delete this Receptionist?
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
const UpdateConfirmation = ({ onCancel, receptionistId }) => {
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
          <UpdateReceptionist receptionistId={receptionistId} />
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
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const [receptionistId, setReceptionistId] = useState("");
  const [searchTerm, setsearchTerm] = useState("");
  const [deleteReceptionist] = useDeleteReceptionistsMutation();

  const [list, setList] = useState([receptionists]);

  const { data } = useGetReceptionistNameQuery(searchTerm);

  useEffect(() => {
    if (data) {
      setList(data);
    } else {
      setList(receptionists);
    }
    if (!searchTerm) {
      setList(receptionists);
    }
  }, [data, receptionists, searchTerm]);


  const searchHandler = () => {
    console.log("searchHandler DATA", data);
    setsearchTerm(searchTerm);

    // setList(searchTerm)
  };

  const showUpdateConfirmationHandler = (id) => {
    setReceptionistId(id);
    setShowUpdateConfirmation(true);
    console.log("Receptionist", id);
  };
  const hideUpdateConfirmationHandler = () => {
    setShowUpdateConfirmation(false);
  };

 

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
      <div className="flex flex-col md:flex-row">
        <div className=" md:w-1/2 p-4 w-full text-custom-blue text-xl font-bold">
          Registered Receptionists
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
      <div className="flex flex-col gap-4 p-3 bg-slate-200 rounded-lg">
        <ul>
          {list.length > 0 ? (
            list.map((receptionist) => (
            <div className="p-1 " key={receptionist.id}>
              <li>
                <div className="bg-white rounded-xl h-10 p-2 flex flex-row">
                  <div className="w-2/4 ml-5 font-bold text-custom-blue text-md">
                    {receptionist.firstname} {receptionist.lastname}
                  </div>
                  <div className="w-1/4 font-bold text-gray-500 text-md text-end">
                    <button
                      type="submit"
                      onClick={() =>
                        showUpdateConfirmationHandler(receptionist._id)
                      }
                    >
                      Edit
                    </button>
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
          )))
          : (
            <div className="p-1 flex justify-center items-center font-semibold text-red-600">
              No Receptionists found.
            </div>
            )}
        </ul>
      </div>

      {/* Render the delete confirmation pop-up if it is shown */}
      {showDeleteConfirmation && (
        <DeleteConfirmation
          onCancel={hideDeleteConfirmationHandler}
          onConfirm={deleteReceptionistHandler}
          recepId={receptionistId}
        />
      )}

      {/* Render the delete confirmation pop-up if it is shown */}
      {showUpdateConfirmation && (
        <UpdateConfirmation
          onCancel={hideUpdateConfirmationHandler}
          receptionistId={receptionistId}
          // onConfirm={UpdateDoctorHandler}
        />
      )}
    </div>
  );
};

export default ReceptionistList;
