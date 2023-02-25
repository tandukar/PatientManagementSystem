const router = require("express").Router();
const Admin = require('../model/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const { loginValidation } = require('../validation');



// //Login
// router.post('/login', async(req, res) => {

//     const { error } = loginValidation(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     //checking if email exists
//     const user = await Admin.findOne({ email: req.body.email });
//     if (!user) return res.send("Email or Password is wrong");

//     const validPwd = await bcrypt.compare(req.body.password, user.password);
//     if (!validPwd) return res.send("Password is wrong");

//     //Create and assing token 
//     // const token = jwt.sign({ _id: user.id }, process.env.TOKEN);
//     // res.header('auth-token', token).send(token);
//     // res.send('login')
// })

//export this module
module.exports = router;