import React, { useState, useEffect } from "react";
import {
  useGetPatientQuery,
  useGetPatientAppointmentsQuery,
  useGetOpdBillQuery,
  useGetIpdPatientsQuery,
} from "./PatientApiSlice";
import { TablePagination } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import ShiftIpd from "../ipdAdmission/ShiftIpd";

const ShiftHandler = ({ onCancel, onConfirm, id, patientId, patientName }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-3 w-150">
        <div className="flex justify-end">
          <RxCross2
            onClick={onCancel}
            className="text-3xl  absoulte  text-red-400  hover:text-pink-600"
          />
        </div>
        <div className="px-6">
          <ShiftIpd id={id} patientId={patientId} patientName={patientName} />
        </div>
      </div>
    </div>
  );
};

const GetIpd = ({ recepId }) => {
  const { data: patients = [], error, isloading } = useGetPatientQuery();
  const [searchTerm, setsearchTerm] = React.useState([]);
  const { data } = useGetIpdPatientsQuery(searchTerm);
  const [list, setList] = useState([patients]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [adminId, setAdminId] = useState("63f0f521feacc4a9688b7e5b");
  const { data: opdBill = [] } = useGetOpdBillQuery(adminId);
  const [downloadPDF, setDownloadPDF] = useState(false);

  const [updateId, setUpdateId] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [patientName, setPatientName] = useState(null);
  const [showProfile, setshowProfile] = useState(false);

  const showProfileHandler = (id, patientId, patientName) => {
    console.log(id);
    console.log(patientId);
    console.log(patientName);
    setUpdateId(id);
    setPatientId(patientId);
    setPatientName(patientName);
    setshowProfile(true);
  };

  const hideProfileHandler = () => {
    setshowProfile(false);
  };
  const approveStatusHandler = () => {
    setshowProfile(false);
  };

  useEffect(() => {
    if (data) {
      const sortData = [...data];
      const sortedData = sortData.sort(
        (a, b) => new Date(b.admissionDate) - new Date(a.admissionDate)
      );
      setList(sortedData);
    } else {
      setList([]);
    }
  }, [data, patients, searchTerm]);

  const searchHandler = () => {
    setsearchTerm(searchTerm);
    console.log("searchHandler DATA", data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4 w-full text-custom-blue text-xl font-bold">
          Find In-Patients
        </div>
        <div className="md:w-1/2 p-4 ">
          <div className="relative   border border-custom-blue p-2 rounded-3xl">
            <input
              type="text"
              className="w-full pl-10 text-sm outline-none  text-gray-600"
              placeholder="Enter Patient Number..."
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
      <div className="p-1 rounded-xl h-10 flex flex-row">
        <div className="w-2/4 ml-5 font-bold text-gray-600  text-md">
          Patient Name
        </div>
        <div className="w-2/4 ml-5 font-bold text-gray-600  text-md">
          Doctor Name
        </div>
        <div className="w-2/4 ml-5 font-bold text-gray-600  text-md">
          Admission Date
        </div>
        <div className="w-2/4 ml-5 font-bold text-gray-600  text-md">
          Discharged Date
        </div>
        <div className="w-2/4 ml-5 font-bold text-gray-600  text-md">
          Action
        </div>
      </div>
      <div className="flex flex-col gap-4 p-3 bg-slate-200 shadow-md rounded-lg">
        {console.log(list)}
        <ul>
          {list.length > 0 ? (
            list.map((patient) => (
              <div className="p-1 " key={patient.id}>
                <li>
                  <div className="bg-white rounded-xl h-10 p-2 flex flex-row">
                    <div className="w-2/4 ml-5 font-bold text-custom-blue text-md">
                      {patient.patientName}
                    </div>
                    <div className="w-2/4 ml-5 font-bold text-custom-blue text-md">
                      {patient.docName}
                    </div>
                    <div className="w-2/4 ml-5 font-bold text-green-700 text-md">
                      {new Date(patient.admissionDate).toLocaleString()}
                    </div>

                    <div className="w-2/4 ml-5 font-bold text-red-500 text-md">
                      {patient.dischargeDate == null
                        ? "Not Discharged"
                        : new Date(patient.dischargeDate).toLocaleString()}
                    </div>
                    <div className="w-2/4 ml-5 font-bold text-red-500 text-md">
                      <button
                        onClick={() =>
                          showProfileHandler(
                            patient._id,
                            patient.patientName,
                            patient.patientId
                          )
                        }
                      >
                        Action{" "}
                      </button>
                    </div>
                  </div>
                </li>
              </div>
            ))
          ) : (
            <div className="p-1 flex justify-center items-center font-semibold text-red-600">
              No Admissions can be found.
            </div>
          )}
        </ul>
      </div>
      {showProfile && (
        <ShiftHandler
          onCancel={hideProfileHandler}
          onConfirm={approveStatusHandler}
          id={updateId}
          patientId={patientId}
          patientName={patientName}

          // recepId={recepId}
        />
      )}
    </>
  );
};

export default GetIpd;
