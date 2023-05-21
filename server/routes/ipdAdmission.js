const router = require("express").Router();
const Doctor = require("../model/Doctor");
const Patient = require("../model/Patient");
// const Ipd = require("../model/IpdAdmission");
const Bed = require("../model/Bed");
const Room = require("../model/Room");
const Appointment = require("../model/Appointment");
const IpdAdmission = require("../model/IpdAdmission");
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
        const bedExists = await Bed.findOne({ number: req.body.bedNumber });
        if (!bedExists) {
            return res.status(400).json({ message: "Bed doesnt exists" });
        }
        if (bedExists.patient) {
            return res.status(400).json({ message: "Bed is already occupied" });
        }

        //get patient name from the id
        // let name = await Patient.findById(req.body.patient);
        // name = name.firstname + " " + name.lastname;
        // const ipd = await IpdAdmission.find({
        //     admissionDate: req.body.admissionDate,
        // });
        // if (ipd.length > 0)
        //     return res.send("Ipd already exists for this date");

        console.log(req.body.appointmentDate);
        const createIpd = new IpdAdmission({
            patientId: req.body.patientId,
            patientName: patient.firstname + " " + patient.lastname,
            doctorId: req.body.doctorId,
            docName: doctor.firstname + " " + doctor.lastname,
            admissionDate: req.body.admissionDate,
            dischargeDate: req.body.dischargeDate,
            roomNumber: req.body.roomNumber,
            bedNumber: req.body.bedNumber,
            diagnosis: req.body.diagnosis,
            treatment: req.body.treatment,
            status: req.body.status,
            recepId: req.body.recepId,
        });

        const savedIpd = await createIpd.save();
        // Update the bed associated with the IPD record
        const bed = await Bed.findOne({ number: req.body.bedNumber });
        if (bed) {
            bed.patient = req.body.patientId;
            bed.patientName = patient.firstname + " " + patient.lastname;
            bed.isAvailable = false;
            await bed.save();
        }

        res.json(savedIpd);
    } catch (err) {
        if (err.message.startsWith("Cast to ObjectId failed")) {
            return res.status(400).json({ message: "Invalid ID" });
        }
        res.status(400).send(err.message);
    }
});

// update doctor
router.patch("/updateIpdStatus/:id", async(req, res) => {
    const { status, recepId, patientId } = req.body;
    try {
        const updateIpdAdmission = await IpdAdmission.updateMany({ _id: req.params.id }, {
            $set: {
                status: status,
            },
        });
        // res.send(updateIpdAdmission);po
        // console.log(updateIpdAdmission);
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
            <h4>Thank you for your patience</h4>`,
        };

        await transporter.sendMail(message).then(() => {
            return res.json({ message: "Mail Sent" });
        });
    } catch (err) {
        res.json(err.message);
    }
});

module.exports = router;