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

//get all Doctors//
router.get("/", async(req, res) => {
    try {
        const getDocs = await Doctor.find();
        res.json(getDocs);
    } catch (err) {
        // res.status(400).send(err);
        console.log(err);
    }
});

//get one doctor
router.get("/find/:doctorId", async(req, res) => {
    try {
        const findDoc = await Doctor.findById(req.params.doctorId);
        res.json(findDoc);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// update doctor
router.patch("/updateDoc/:id", async(req, res) => {
    try {
        const updateDoc = await Doctor.updateMany({ _id: req.params.id }, {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password,
                age: req.body.age,
                email: req.body.email,
            },
        });
        res.send(updateDoc);
    } catch (err) {
        res.json(err.message);
    }
});

//delete a doctor
router.delete("/deleteDoc/:id", async(req, res) => {
    try {
        const delDoc = await Doctor.deleteOne({ _id: req.params.id });
        res.json(delDoc);
    } catch (err) {
        res.json(err.message);
    }
});

module.exports = router;