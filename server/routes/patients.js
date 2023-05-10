const router = require("express").Router();
const Patient = require("../model/Patient");
const Appointment = require("../model/Appointment");
const { patientRegisterValidation } = require("../validation");

router.post("/register", async(req, res) => {
    const { error } = patientRegisterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //searching for existing number
    const numberExists = await Patient.findOne({ number: req.body.number });
    if (numberExists) return res.send("Number already exists");

    const regPatient = new Patient({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        sex: req.body.sex,
        address: req.body.address,
        email: req.body.email,
        number: req.body.number,
        // ipd: req.body.ipd,
        // opd: req.body.opd,
        // ipdDetails: req.body.ipdDetails,
        // opdDetails: req.body.opdDetails,
    });

    console.log(regPatient.ipdDetails);
    console.log(regPatient.opdDetails);
    console.log(regPatient.opd);
    console.log(regPatient.ipd);
    try {
        const savedPatient = await regPatient.save();
        res.json(savedPatient);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//get all patients//
router.get("/", async(req, res) => {
    try {
        const getPatients = await Patient.find();
        res.json(getPatients);
        // res.send("hello");
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});

//get one patient
router.get("/find/:patiendID", async(req, res) => {
    try {
        const findPatient = await Patient.findById(req.params.patiendID);
        res.json(findPatient);
    } catch (err) {
        // res.status(400).send(err.message);
        res.status(400).send("Could not find patient");
    }
});

router.get("/appointment/search/:number", async(req, res) => {
    try {
        const findPatient = await Patient.find({ number: req.params.number });
        const patientId = findPatient[0]._id;
        console.log(patientId);

        const appointments = await Appointment.find({ patientId: patientId });
        console.log(appointments);

        res.json(appointments);
    } catch (err) {
        // res.status(400).send(err.message);
        res.status(400).send("Could not find patient");
    }
});

//delete a patient
router.delete("/deletePatient/:patientId", async(req, res) => {
    try {
        const delPatient = await Patient.remove({ _id: req.params.patientId });
        res.json(delPatient);
    } catch (err) {
        res.json(err.message);
    }
});

//update patient
router.patch("/updatePatient/:patientId", async(req, res) => {
    try {
        const updatePatient = await Patient.updateMany({ _id: req.params.patientId }, {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age,
                sex: req.body.sex,
                address: req.body.address,
                email: req.body.email,
                number: req.body.number,
            },
        });
        res.send(updatePatient);
    } catch (err) {
        res.json(err.message);
    }
});

module.exports = router;