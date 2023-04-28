const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Receptionist = require("../model/Receptionist");
const { recepRegisterValidation, loginValidation } = require("../validation");
const nodemailer = require("nodemailer");

router.post("/register", async(req, res) => {
    const { error } = recepRegisterValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const emailExists = await Receptionist.findOne({ email: req.body.email1 });
    if (emailExists) return res.send("Email Already Exists");

    // hash password
    let defPwd = "receptionist123";
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(defPwd, salt);

    const postRecep = new Receptionist({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        sex: req.body.sex,
        email: req.body.email,
        email1: req.body.email1,
        password: hashPwd,
        address: req.body.address,
        number: req.body.number,
    });
    try {
        const savedRecep = await postRecep.save();
        // res.json(savedRecep);

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
            to: `${savedRecep.email1}`, // list of receivers
            subject: "Receptionist Registration", // Subject line
            html: `
            <div style="background-color: #f4f4f4; padding: 20px;">
                <h2 style="color: #333;">Hello, ${
                  savedRecep.firstname + " " + savedRecep.lastname
                }</h2>
                <p style="color: #333;">You have been registered to Remedial.<br>Please use the credentials provided below to login to the system:</p>
        <div style="background-color: #fff; padding: 20px; margin-bottom: 20px;">
               
                <ul style="list-style-type:none; padding-left:0">
                <li style=" padding: 10px; margin-bottom: 5px;">
                  <span style="display: inline-block; width: 120px;">Email:</span>
                  <span>${savedRecep.email}</span>
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
                return res.send("Mail Sent");
            })
        ).catch((err) => {
            return res.send(err.message);
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//get all Receptionists//
router.get("/", async(req, res) => {
    try {
        const getRecep = await Receptionist.find();
        res.json(getRecep);
    } catch (err) {
        res.status(400).send(err);
        // console.log(err);
    }
});

//get one Receptionist
router.get("/find/:id", async(req, res) => {
    try {
        const findRecep = await Receptionist.findById(req.params.id);
        res.json(findRecep);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// update Receptionist
router.patch("/updateRecep/:id", async(req, res) => {
    try {
        const { error } = recepRegisterValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const updateRecep = await Receptionist.updateMany({ _id: req.params.id }, {
            $set: {


                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age,
                sex: req.body.sex,
                email: req.body.email,
                email1: req.body.email1,
                address: req.body.address,
                number: req.body.number,

            },
        });
        res.send(updateRecep);
    } catch (err) {
        res.json(err.message);
    }
});


//search doctor by firstname
router.get("/search/:firstname", async(req, res) => {
    try {
        const regex = new RegExp(req.params.firstname, 'i');
        const findRecep = await Receptionist.find({ "firstname": regex });
        res.json(findRecep);
    } catch (err) {
        res.status(400).send(err.message);
    }
});


//delete a Receptionist
router.delete("/deleteReceptionist/:id", async(req, res) => {
    try {
        const delRecep = await Receptionist.deleteOne({ _id: req.params.id });
        res.json(delRecep);
    } catch (err) {
        res.json(err.message);
    }
});

module.exports = router;