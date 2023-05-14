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


// update AdminPassword
router.patch("/updatePasswordAdmin/:id", async(req, res) => {
    try {
        const user = await Admin.findById(req.params.id);
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
        const updateAdminPass = await Admin.updateOne({ _id: req.params.id }, {
            $set: {
                password: hashPwd,
            },
        });
        // res.send(updateAdminPass);
        res.status(200).send({ data: { message: "Password updated successfully" } });

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