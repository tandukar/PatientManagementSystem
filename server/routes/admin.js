const router = require("express").Router();
const Admin = require("../model/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { loginValidation } = require("../validation");

router.get("/:id", async(req, res) => {
    try {
        const findAdmin = await Admin.findById(req.params.id);
        res.json(findAdmin);
    } catch (err) {
        res.status(400).send(err.message);
    }
});


router.post("/register", async(req, res) => {
    try {

    } catch {

    }

});
module.exports = router;