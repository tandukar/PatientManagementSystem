const router = require("express").Router();
const Patient = require('../model/Patient');

router.post('/register', async(req, res) => {



    const regPatient = new Patient({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        sex: req.body.sex,
        address: req.body.address,
        consultant: req.body.consultant,
    })
    try {
        const savedPatient = await regPatient.save();
        res.json(savedPatient);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//get all Doctors//
router.get('/', async(req, res) => {
    try {
        const getPatients = await Patient.find();
        res.json(getPatients);
    } catch (err) {
        // res.status(400).send(err);
        console.log(err);
    }
})