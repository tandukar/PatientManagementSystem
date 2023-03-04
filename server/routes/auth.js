const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
// const cookieParser = require("cookie-parser");

const Admin = require("../model/Admin");
const Doctor = require("../model/Doctor");
const Receptionist = require("../model/Receptionist");

const { loginValidation } = require("../validation");


//YO EKAI XIN MA HERNU PARXA SESSION ID VALIDATE GARNA LAI YO CHAINXA

// function validateCookie(req, res, next) {
//     const { cookies } = req;

//     if ("session_id" in cookies) {
//         console.log("cookie found");
//         if (cookies.session_id === token) {
//             next();
//         } else res.status(400).send({ msg: "Authentication Failed" });
//     } else res.status(400).send({ msg: "Authentication Failed" });
//     console.log(cookies);
//     next();
// }

router.post("/login", async(req, res) => {
    let model;

    // const email = req.body.email;
    const { email } = req.body; // destructuring the email from req.body

    if (email.endsWith("@admin.com")) {
        model = Admin;
    } else if (email.endsWith("@doctor.com")) {
        model = Doctor;
    } else if (email.endsWith("@receptionist.com")) {
        model = Receptionist;
    } else {
        res.send("Invalid Email");
    }
    console.log(model);

    const { error } = loginValidation(req.body);
    if (error) return res.status(401).send(error.details[0].message);

    //checking if email exists
    const user = await model.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("Email or Password is wrong");

    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd) return res.status(401).send("Password is wrong");

    // Create and assign token
    const token = jwt.sign({ _id: user.id }, process.env.TOKEN, {
        expiresIn: "1h",
    });

    //store cookie in browser
    // res.cookie("session_id", token, {
    //     httpOnly: true,
    //     maxAge: 60 * 60 * 1000, // 1 hour
    // })
    res.status(200).json({ msg: token });

    // res.status(200).json({ msg: "Login Successfull" });

    // res.header("auth-token", token).send(token);
    // console.log(token)
    // res.send('login')
});

module.exports = router;