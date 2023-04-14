const router = require("express").Router();
const Doctor = require("../model/Doctor");
const Patient = require("../model/Patient");
const Appointment = require("../model/Appointment");

router.post("/create", async(req, res, next) => {


    const doctor = await Doctor.findById(req.body.doctorId);
    const patient = await Patient.findById(req.body.patientId);
    if (!doctor || !patient) {
        return res.status(404).json({ message: "Doctor or Patient not found" });
    }

    const createApp = new Appointment({
        patientId: req.body.patientId,
        patientName: patient.firstname + " " + patient.lastname,
        doctorId: req.body.doctorId,
        docName: doctor.firstname + " " + doctor.lastname,
        reason: req.body.reason,
        // notes: req.body.notes,
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
    });
    try {
        const savedDoc = await createApp.save();
        res.json(savedDoc);

    } catch (err) {
        res.status(400).send(err.message);
    }
});


// update doctor
router.patch("/updateAppointmentStatus/:id", async(req, res) => {
    try {
        const updateAppointment = await Appointment.updateOne({ _id: req.params.id }, {
            $set: {
                status: req.body.status
            },
        });
        res.send(updateAppointment);
    } catch (err) {
        res.json(err.message);
    }
});

module.exports = router;