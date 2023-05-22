import React, { useState, useEffect } from "react";
import {
  useGetPatientQuery,
  useGetPatientAppointmentsQuery,
  useGetOpdBillQuery,
} from "./PatientApiSlice";
import { TablePagination } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  PDFViewer,
  View,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const GetPatientAppointment = ({ recepId }) => {
  const { data: patients = [], error, isloading } = useGetPatientQuery();
  const [searchTerm, setsearchTerm] = React.useState([]);
  const { data } = useGetPatientAppointmentsQuery(searchTerm);
  const [list, setList] = useState([patients]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [adminId, setAdminId] = useState("63f0f521feacc4a9688b7e5b");
  const { data: opdBill = [] } = useGetOpdBillQuery(adminId);
  const [downloadPDF, setDownloadPDF] = useState(false);
  useEffect(() => {
    if (data) {
      const sortData = [...data];
      const sortedData = sortData.sort(
        (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
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

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      padding: 20,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    table: {
      display: 'table',
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000',
      marginTop: 20,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000000',
      borderBottomStyle: 'solid',
      height: 30,
    },
    tableCell: {
      width: '50%',
      borderRightWidth: 1,
      borderRightColor: '#000000',
      borderRightStyle: 'solid',
      justifyContent: 'center',
      alignItems: 'center',
    },
    lastTableCell: {
      borderRightWidth: 0,
    },
    descriptionText: {
      fontSize: 12,
      textAlign: 'center',
    },
    amountText: {
      fontSize: 12,
      textAlign: 'center',
    },
    totalPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
      textAlign: 'center',
    },
  });
  

  const pdfHandler = (charge, consultCharge, hName) => (
    <Document>
    <Page style={styles.page}>
      <Text style={styles.heading}>{hName}</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.descriptionText}>Description</Text>
          </View>
          <View style={[styles.tableCell, styles.lastTableCell]}>
            <Text style={styles.amountText}>Amount</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.descriptionText}>Registration Charges</Text>
          </View>
          <View style={[styles.tableCell, styles.lastTableCell]}>
            <Text style={styles.amountText}>{charge}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.descriptionText}>Consultation Charges</Text>
          </View>
          <View style={[styles.tableCell, styles.lastTableCell]}>
            <Text style={styles.amountText}>{consultCharge}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.totalPrice}>
        Total Price: {consultCharge + charge}
      </Text>
    </Page>
  </Document>
  );

  const handleDownloadPDF = () => {
    setDownloadPDF(true);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4 w-full text-custom-blue text-xl font-bold">
          Find Appointments
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
      <div className="p-1 rounded-xl h-10 flex flex-row">
        <div className="w-2/4 ml-5 font-bold text-gray-600  text-md">
          Patient Name
        </div>
        <div className="w-2/4 ml-5 font-bold text-gray-600  text-md">
          Doctor Name
        </div>
        <div className="w-2/4 ml-5 font-bold text-gray-600  text-md">
          Appointment Date
        </div>
        <div className="w-1/4 font-bold text-gray-600  text-md text-end mr-5">
          Actions
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
                    <div className="w-2/4 ml-5 font-bold text-custom-blue text-md">
                      {new Date(patient.appointmentDate).toLocaleString()}
                    </div>
                    <div className="w-1/4 font-bold text-red-700 text-md text-end mr-5">
                      <PDFDownloadLink
                        document={pdfHandler(
                          parseInt(opdBill.regCharge),
                          parseInt(opdBill.consultCharge),
                          opdBill.hName
                        )}
                        fileName="billing.pdf"
                        className="text-red-700"
                      >
                        {({ blob, url, loading, error }) =>
                          loading ? "Creating Billing..." : "Create Billing"
                        }
                      </PDFDownloadLink>
                    </div>
                  </div>
                </li>
              </div>
            ))
          ) : (
            <div className="p-1 flex justify-center items-center font-semibold text-red-600">
              No Appointments can be found.
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default GetPatientAppointment;
