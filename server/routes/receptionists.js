const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Receptionist = require("../model/Receptionist");
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async(req, res) => {

    const { error } = registerValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message)

    const emailExists = await Receptionist.findOne({ email: req.body.email });
    if (emailExists) return res.send("Email Already Exists");



    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(req.body.password, salt);

    const postRecep = new Receptionist({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        email: req.body.email,
        password: hashPwd,
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
router.get('/find/:ReceptionistId', async(req, res) => {
    try {
        const findRecep = await Receptionist.findById(req.params.ReceptionistId);
        res.json(findRecep);
    } catch (err) {
        res.status(400).send(err.message);
    }
})

// update Receptionist 
router.patch('/updateRecep/:ReceptionistId', async(req, res) => {
    try {
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        const updateRecep = await Receptionist.updateMany({ _id: req.params.ReceptionistId }, {

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
router.delete('/deleteReceptionist/:ReceptionistId', async(req, res) => {
    try {
        const delRecep = await Receptionist.deleteOne({ _id: req.params.ReceptionistId });
        res.json(delRecep);
    } catch (err) {
        res.json(err.message)
    }
})


//Login
// router.post('/login', async(req, res) => {

//     const { error } = loginValidation(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     //checking if email exists
//     const user = await Receptionist.findOne({ email: req.body.email });
//     if (!user) return res.send("Email or Password is wrong");

//     const validPwd = await bcrypt.compare(req.body.password, user.password);
//     if (!validPwd) return res.send("Email or Password is wrong");

//     //Create and assing token 
//     const token = jwt.sign({ _id: user.id }, process.env.TOKEN);
//     res.header('auth-token', token).send(token);
//     res.send('login')
// })
module.exports = router;