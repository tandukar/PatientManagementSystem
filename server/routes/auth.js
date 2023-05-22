const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const nodemailer = require("nodemailer");
// const cookieParser = require("cookie-parser");
const session = require("express-session");
// db mai roles halne ani tyo return garni

const Admin = require("../model/Admin");
const Doctor = require("../model/Doctor");
const Receptionist = require("../model/Receptionist");

const { loginValidation } = require("../validation");

//send email to the user

var generateOtp = "";
router.post("/forgotpassword", async(req, res) => {
    try {
        console.log("sdfsdsafasd", req.body.email);

        const email = req.body.email;
        //generate 4 digit random number
        generateOtp = Math.floor(1000 + Math.random() * 9000);
        console.log(generateOtp);
        res.json({ generateOtp: generateOtp });

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: " tandukarpragyo@gmail.com",
                pass: "yxeirihafpscekxh",
            },
        });

        // send mail with defined transport object
        let message = {
            from: '"Admin" <tandukarpragyo@gmail.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "Receptionist Registration", // Subject line
            html: `
                <div style="background-color: #f4f4f4; padding: 20px;">
                    <h2 style="color: #333;">Hello, </h2>
                    
                     <div style="background-color: #fff; padding: 20px; margin-bottom: 20px;">
                     <h4 style="color: #333 ;">Your Verification OTP: ${generateOtp}</h4>
                    </div>
                    <p style="color: #777;">Thank you for using our service!</p>
                 </div>
            `,
        };
        (
            await transporter.sendMail(message).then(() => {
                return res.status(200).send("Mail Sent");
            })
        )
    } catch (err) {
        console.log(err);
        // return res.send(err.message);

    }
});

//verify otp
router.post("/verify-otp", async(req, res) => {
    try {
        console.log(req.body);
        const otp = req.body.otp;

        console.log(otp);
        console.log("ge", generateOtp);
        if (otp == generateOtp) {
            return res.status(200).send("OTP verified");
        } else {
            return res.status(401).send("Invalid OTP");
        }
    } catch (err) {
        console.log(err);
        return res.status(401).send("Invalid OTP");
    }
});

router.patch("/reset-password", async(req, res) => {
    console.log("reset password");
    try {
        let model;
        let role;

        // const email = req.body.email;
        const { email, password, password1 } = req.body; // destructuring the email from req.body

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

        // const { error } = loginValidation(req.body);
        // if (error) return res.status(401).send(error.details[0].message);
        //checking if email exists
        console.log(req.body.email);
        const user = await model.findOne({ email: req.body.email });
        console.log(user);

        //cehcking if password and confirm password matches
        if (password !== password1) {
            return res.status(401).send("Password and Confirm Password does not match");
        }
        console.log(password);
        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);

        //updating the password
        const resetPass = await model.updateOne({ email: req.body.email }, {
            $set: {
                password: hashedPassword,
            },
        });
        // res.send(updateRecepPass);
        res.status(200).send("Password updated successfully");



    } catch (err) {
        console.log(err);


    }
});


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
        console.log(req.body.email);
        const user = await model.findOne({ email: req.body.email });
        console.log(user);
        if (!user) return res.status(401).send("Email or Password is wrong");

        const validPwd = await bcrypt.compare(req.body.password, user.password);
        if (!validPwd) return res.status(401).send("Email or Password is wrong");

        // Create and assign token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN, {
            expiresIn: "24h",
        });

        res.setHeader("Authorization", `Bearer ${token}`);

        console.log(`Authorization header value: Bearer ${token}`);

        res.status(200).json({ token: token, role: role });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;