const router = require("express").Router();
const Doctor = require('../model/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async(req, res) => {

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const emailExists = await Doctor.findOne({ email: req.body.email });
    if (emailExists) return res.send("Email Already Exists");

    //hash password
    let defPwd = "doctor123"
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(defPwd, salt);

    const postDoc = new Doctor({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        sex: req.body.sex,
        email: req.body.email,
        password: hashPwd,
        address: req.body.address,
        number: req.body.number,
        qualification: req.body.qualification,
        specialization: req.body.specialization,
    })
    try {
        const savedDoc = await postDoc.save();
        res.json(savedDoc);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//get all Doctors//
router.get('/', async(req, res) => {
    try {
        const getDocs = await Doctor.find();
        res.json(getDocs);
    } catch (err) {
        // res.status(400).send(err);
        console.log(err);
    }
})


//get one doctor
router.get('/find/:doctorId', async(req, res) => {
    try {
        const findDoc = await Doctor.findById(req.params.doctorId);
        res.json(findDoc);
    } catch (err) {
        res.status(400).send(err.message);
    }
})

// update doctor 
router.patch('/updateDoc/:doctorId', async(req, res) => {
    try {
        const updateDoc = await Doctor.updateMany({ _id: req.params.doctorId }, {
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
})


//delete a doctor
router.delete('/deleteDoc/:doctorId', async(req, res) => {
    try {
        const delDoc = await Doctor.deleteOne({ _id: req.params.doctorId });
        res.json(delDoc);
    } catch (err) {
        res.json(err.message)
    }
})


//Login

//password is doctor123
// router.post('/login', async(req, res) => {

//     const { error } = loginValidation(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     //checking if email exists
//     const user = await Doctor.findOne({ email: req.body.email });
//     if (!user) return res.send("Email or Password is wrong");
//     //res.send(user.password)

//     const validPwd = await bcrypt.compare(req.body.password, user.password);
//     if (!validPwd) return res.send("Email or Password is wrong");

//     //Create and assing token 
//     const token = jwt.sign({ _id: user.id }, process.env.TOKEN);
//     res.header('auth-token', token).send(token);
//     res.send('login')
// })
module.exports = router;