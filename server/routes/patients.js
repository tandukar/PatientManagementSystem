const router = require("express").Router();
const Patient = require("../model/Patient");
const { patientRegisterValidation } = require("../validation");

router.post("/register", async(req, res) => {
    const { error } = patientRegisterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //searching for existing number
    const numberExists = await Patient.findOne({ number: req.body.number });
    if (numberExists) return res.send("Number already exists");
    // const { firstname, lastname, age, sex, address, email, number, ipd, opd, ipdDetails, opdDetails } = req.body;

    // // Create a new patient object with the received data
    // const regPatient = new Patient({
    //     firstname,
    //     lastname,
    //     age,
    //     sex,
    //     address,
    //     email,
    //     number,
    //     ipd,
    //     opd,
    //     ipdDetails,
    //     opdDetails
    // })

    const regPatient = new Patient({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        sex: req.body.sex,
        address: req.body.address,
        email: req.body.email,
        number: req.body.number,
        ipd: req.body.ipd,
        opd: req.body.opd,
        ipdDetails: req.body.ipdDetails,
        opdDetails: req.body.opdDetails,
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