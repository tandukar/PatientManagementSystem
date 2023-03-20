const router = require("express").Router();
const Admin = require('../model/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const { loginValidation } = require('../validation');




module.exports = router;