const router = require("express").Router();
const Doctor = require("../model/Doctor");
const Patient = require("../model/Patient");
const Appointment = require("../model/Appointment");
const jwt = require("jsonwebtoken");
const Receptionist = require("../model/Receptionist");
const nodemailer = require("nodemailer");

router.post("/create", async(req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.body.doctorId);
        const patient = await Patient.findById(req.body.patientId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        const appointments = await Appointment.find({
            appointmentDate: req.body.appointmentDate,
        });
        if (appointments.length > 0)
            return res.send("Appointment already exists for this date");

        console.log(req.body.appointmentDate);
        const createApp = new Appointment({
            patientId: req.body.patientId,
            patientName: patient.firstname + " " + patient.lastname,
            doctorId: req.body.doctorId,
            docName: doctor.firstname + " " + doctor.lastname,
            reason: req.body.reason,
            notes: req.body.notes,
            procedures: req.body.procedures,
            diagnosis: req.body.diagnosis,
            // ipd: req.body.ipd,
            // opd: req.body.opd,
            patientType: req.body.patientType,
            appointmentDate: req.body.appointmentDate,
            roomNo: req.body.roomNo,
            // ipdDetails: req.body.ipdDetails,
            // opdDetails: req.body.opdDetails,
            status: req.body.status,
            recepId: req.body.recepId,
        });

        const savedDoc = await createApp.save();
        res.json(savedDoc);
    } catch (err) {
        if (err.message.startsWith("Cast to ObjectId failed")) {
            return res.status(400).json({ message: "Invalid ID" });
        }
        res.status(400).send(err.message);
    }
});




// update doctor
router.patch("/updateAppointmentStatus/:id", async(req, res) => {
            const { status, recepId, appointmentDate, patientId } = req.body;
            try {
                const updateAppointment = await Appointment.updateMany({ _id: req.params.id }, {
                    $set: {
                        status: status,
                        appointmentDate: appointmentDate,
                    },
                });
                // res.send(updateAppointment);po
                // console.log(updateAppointment);
                // console.log("the reception id", recepId);
                // console.log("status", status);
                // console.log("new Time", appointmentDate);
                // console.log("Patient ID", patientId);

                const receptionistDetails = await Receptionist.findById(recepId);
                const PatientDetails = await Patient.findById(patientId);

                if (!receptionistDetails) {
                    return res.status(404).send("Receptionist not found");
                }
                if (!PatientDetails) {
                    return res.status(404).send("Patient not found");
                }
                const receptionistEmail = receptionistDetails.email1;
                const patientEmail = PatientDetails.email;
                console.log(receptionistEmail);
                console.log(receptionistDetails);
                console.log("patientemail", patientEmail);

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: " tandukarpragyo@gmail.com",
                        pass: "yxeirihafpscekxh",
                    },
                });

                var mailList = [receptionistEmail, patientEmail];
                let message = {
                        from: '"Admin" <tandukarpragyo@gmail.com>', // sender address
                        to: mailList, // list of receivers
                        subject: "Appointment Status Updated", // Subject line
                        html: `<h4>The appointment has been updated to: </h4>
            <h3>${status}</h3>
            ${
              status !== "Cancelled"
                ? `<span> for the date:</span> <h3>${appointmentDate}</h3>`
                : ""
            }
            `,
    };

    await transporter.sendMail(message).then(() => {
      return res.json({ message: "Mail Sent" });
    });
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;