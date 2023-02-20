const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

const Admin = require("../model/Admin");
const Doctor = require("../model/Doctor");

const { loginValidation } = require("../validation");

router.post("/", async(req, res) => {
    let model;

    const email = req.body.email;
    // const { email, password } = req.body;

    if (email.endsWith("@admin.com")) {
        model = Admin;

    } else if (email.endsWith("@doctor.com")) {
        model = Doctor;
    } else if (email.endsWith("@receptionist.com")) {
        model = "Receptionist";
    } else {
        res.send("Invalid Email");
    }
    console.log(model);

    // console.log(model);
    // res.send(model);

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if email exists
    const user = await model.findOne({ email: req.body.email });
    // res.send(user);
    if (!user) return res.send("Email or Password is wrong");

    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd) return res.send("Password is wrong");

    // Create and assign token
    const token = jwt.sign({ _id: user.id }, process.env.TOKEN);

    res.header("auth-token", token).send(token);
    // res.send('login')
});

module.exports = router;