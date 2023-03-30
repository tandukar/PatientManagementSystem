const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Receptionist = require("../model/Receptionist");
const { recepRegisterValidation, loginValidation } = require('../validation');

router.post('/register', async(req, res) => {

    const { error } = recepRegisterValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message)

    const emailExists = await Receptionist.findOne({ email: req.body.email });
    if (emailExists) return res.send("Email Already Exists");



    // hash password
    let defPwd = "receptionist123"
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(defPwd, salt);

    const postRecep = new Receptionist({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        sex: req.body.sex,
        email: req.body.email,
        password: hashPwd,
        address: req.body.address,
        number: req.body.number,
    })
    try {
        const savedRecep = await postRecep.save();
        res.json(savedRecep);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//get all Receptionists//
router.get('/', async(req, res) => {
    try {
        const getRecep = await Receptionist.find();
        res.json(getRecep);
    } catch (err) {
        res.status(400).send(err);
        // console.log(err);
    }
})


//get one Receptionist
router.get('/find/:id', async(req, res) => {
    try {
        const findRecep = await Receptionist.findById(req.params.id);
        res.json(findRecep);
    } catch (err) {
        res.status(400).send(err.message);
    }
})

// update Receptionist 
router.patch('/updateRecep/:id', async(req, res) => {
    try {
        const { error } = recepRegisterValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        const updateRecep = await Receptionist.updateMany({ _id: req.params.id }, {

            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password,
                age: req.body.age,
                email: req.body.email,
                phone: req.body.phone,
            },

        });
        res.send(updateRecep);

    } catch (err) {
        res.json(err.message);
    }
})


//delete a Receptionist
router.delete('/deleteReceptionist/:id', async(req, res) => {
    try {
        const delRecep = await Receptionist.deleteOne({ _id: req.params.id });
        res.json(delRecep);
    } catch (err) {
        res.json(err.message)
    }
})

module.exports = router;