const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
// const cookieParser = require("cookie-parser");

const Admin = require("../model/Admin");
const Doctor = require("../model/Doctor");
const Receptionist = require("../model/Receptionist");

const { loginValidation } = require("../validation");
const { Model } = require("mongoose");

router.post("/login", async(req, res) => {
    try {
        let model;
        let role;

        // const email = req.body.email;
        const { email } = req.body; // destructuring the email from req.body

        if (typeof email === "string" && email.endsWith("@admin.com")) {
            model = Admin;
            role = "Admin";
        } else if (typeof email === "string" && email.endsWith("@doctor.com")) {
            model = Doctor;
            role = "Doctor";
        } else if (
            typeof email === "string" &&
            email.endsWith("@receptionist.com")
        ) {
            model = Receptionist;
            role = "Receptionist";
        } else {
            return res.status(401).send("Invalid Email");
        }
        console.log(model);

        const { error } = loginValidation(req.body);
        if (error) return res.status(401).send(error.details[0].message);

        //checking if email exists
        const user = await model.findOne({ email: req.body.email });
        if (!user) return res.status(401).send("Email or Password is wrong");

        const validPwd = await bcrypt.compare(req.body.password, user.password);
        if (!validPwd) return res.status(401).send("Email or Password is wrong");

        // Create and assign token
        const token = jwt.sign({ _id: user.id }, process.env.TOKEN, {
            expiresIn: "1h",
        });

        res.setHeader("Authorization", `Bearer ${token}`);

        console.log(`Authorization header value: Bearer ${token}`);

        res.status(200).json({ token: token, role: role });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;