import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDoctorDetailQuery, useAppointmentsQuery } from "../DoctorApiSlice";
import { getIdFromLocalStorage } from "../../../pages/utlis";
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

const AppointmentList = () => {
  const [deleteDoctorId, setDeleteDoctorId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userId, setUserId] = useState(null);
  const {
    data: appointments = [],
    error,
    isLoading,
  } = useAppointmentsQuery("6412a1d534c014547230ae68");

  console.log("from get==", appointments);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = getIdFromLocalStorage(token);

    setUserId(id);

    console.log("ID =", userId);
  }, []);

  return (
    <div>
      <ToastContainer />
      <ul>
        {appointments &&
          appointments.map((appointment) => {
            const appointmentDate = new Date(
              appointment.appointmentDate
            ).toLocaleDateString();

            return (
              <div className="p-1 " key={appointment.id}>
                <li>
                  <div className="bg-white rounded-xl h-10 p-2 flex flex-row">
                    <div className="w-2/4 ml-5 font-bold text-custom-blue text-md">
                      {appointment.patientName}
                    </div>
                    <div className="w-1/4 font-bold text-green-800 text-md text-end">
                      {appointmentDate }
                    </div>
                    {/* <div className="w-1/4 font-bold text-red-700 text-md text-end mr-5">
                  <button
                    type="submit"
                  >
                    Delete
                  </button>
                </div> */}
                  </div>
                </li>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default AppointmentList;
