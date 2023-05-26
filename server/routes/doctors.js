const router = require("express").Router();
const Doctor = require("../model/Doctor");
const Patient = require("../model/Patient");
const Appointment = require("../model/Appointment");
const Ipd = require("../model/IpdAdmission");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { docRegisterValidation, loginValidation } = require("../validation");
const nodemailer = require("nodemailer");

router.post("/register", async(req, res) => {
    const { error } = docRegisterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (!req.body.email.endsWith("@doctor.com")) {
        return res.status(400).send("Invalid Email Format. Primary Email should end with @doctor.com");
    }


    const emailExists = await Doctor.findOne({ email: req.body.email });
    if (emailExists) return res.send("Email Already Exists");

    //hash password
    let defPwd = "doctor123";
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(defPwd, salt);

    const postDoc = new Doctor({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        sex: req.body.sex,
        email1: req.body.email1,
        email: req.body.email,
        password: hashPwd,
        address: req.body.address,
        number: req.body.number,
        qualification: req.body.qualification,
        specialization: req.body.specialization,
    });
    try {
        const savedDoc = await postDoc.save();
        // create reusable transporter object using the default SMTP transport
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
            to: `${savedDoc.email1}`, // list of receivers
            subject: "Receptionist Registration", // Subject line
            html: `
            <div style="background-color: #f4f4f4; padding: 20px;">
                <h2 style="color: #333;">Hello, ${
                  savedDoc.firstname + " " + savedDoc.lastname
                }</h2>
                <p style="color: #333;">You have been registered to Remedial.<br>Please use the credentials provided below to login to the system:</p>
            <div style="background-color: #fff; padding: 20px; margin-bottom: 20px;">          
                <ul style="list-style-type:none; padding-left:0">
                <li style=" padding: 10px; margin-bottom: 5px;">
                  <span style="display: inline-block; width: 120px;">Email:</span>
                  <span>${savedDoc.email}</span>
                </li>
                <li style=" padding: 10px; margin-bottom: 5px;">
                  <span style="display: inline-block; width: 120px;">Password:</span>
                  <span>${defPwd}</span>
                </li>
              </ul>
            </div>
                <p style="color: #777;">Thank you for using our service!</p>
            </div>
        `,
        };

        (
            await transporter.sendMail(message).then(() => {
                return res.status(200).json("Doctor Registered Successfully");
                // return res.end();
            })
        ).catch((err) => {
            return res.send(err.message);
        });
    } catch (err) {
        return res.send(err.message);
    }
});

//get all Doctors//
router.get("/", async(req, res) => {
    try {
        const getDocs = await Doctor.find();
        res.json(getDocs);
    } catch (err) {
        // res.status(400).send(err);
        console.log(err);
    }
});

//get one doctor
router.get("/find/:id", async(req, res) => {
    try {
        const findDoc = await Doctor.findById(req.params.id);
        res.json(findDoc);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// update DoctorPassword
router.patch("/updatePassword/:id", async(req, res) => {
    try {
        const user = await Doctor.findById(req.params.id);
        if (!user) return res.status(404).send("User not found");
        const { oldPassword, newPassword } = req.body;
        const salt = await bcrypt.genSalt(10);
        const validPwd = await bcrypt.compare(req.body.oldPassword, user.password);
        // const validPwd = await bcrypt.compare(oldPasswordhashPwd, user.password);
        console.log(validPwd);
        console.log(user.password)
        console.log("old", oldPassword)

        // if (!validPwd) return res.status(400).send("Old password is incorrect");
        if (!validPwd) return res.status(400).send({ message: "Old password is incorrect" });

        const hashPwd = await bcrypt.hash(newPassword, salt);

        console.log('sdf')
        const updateDoctorPass = await Doctor.updateOne({ _id: req.params.id }, {
            $set: {
                password: hashPwd,
            },
        });
        // res.send(updateDoctorPass);
        res.status(200).send({ data: { message: "Password updated successfully" } });

    } catch (err) {
        res.status(400).send(err.message);
    }
});

//search doctor by firstname
router.get("/search/:firstname", async(req, res) => {
    try {
        const regex = new RegExp(req.params.firstname, 'i');
        const findDoc = await Doctor.find({ "firstname": regex });
        res.json(findDoc);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// update doctor
router.patch("/updateDoc/:id", async(req, res) => {
    console.log("asdfsaaaaaa", req.params.id)
    console.log(req.body)
    try {

        const updateDoc = await Doctor.updateMany({ _id: req.params.id }, {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age,
                sex: req.body.sex,
                email1: req.body.email1,
                email: req.body.email,
                address: req.body.address,
                number: req.body.number,
                qualification: req.body.qualification,
                specialization: req.body.specialization,
            },
        });
        res.send(updateDoc);
    } catch (err) {
        res.json(err.message);
    }
});

//delete a doctor
router.delete("/deleteDoc/:id", async(req, res) => {
    try {
        const delDoc = await Doctor.deleteOne({ _id: req.params.id });
        res.json(delDoc);
    } catch (err) {
        res.json(err.message);
    }
});

//get appointments
router.get("/appointments/:id", async(req, res) => {
    try {
        const getAppointment = await Appointment.find({ doctorId: req.params.id });
        res.json(getAppointment);
    } catch (err) {
        res.json(err.message);
    }
});

//get ipd
router.get("/ipd/:id", async(req, res) => {
    try {
        const getIpd = await Ipd.find({ doctorId: req.params.id });
        res.json(getIpd);
    } catch (err) {
        res.json(err.message);
    }
});

router.get("/patient/search/:number", async(req, res) => {
    try {
        const findPatient = await Patient.find({ number: req.params.number });
        const patientId = findPatient[0]._id;
        console.log(patientId);
        res.json(findPatient);
    } catch (err) {
        // res.status(400).send(err.message);
        res.status(400).send("Could not find patient");
    }
});


module.exports = router;