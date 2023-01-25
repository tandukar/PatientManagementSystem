const router = require("express").Router();
const { findOne } = require("../model/Patient");
const Patient = require("../model/Patient");

router.post("/register", async(req, res) => {

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
    });
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