const Admin = require("./model/Admin");

const bcrypt = require("bcryptjs");


const initializeAdmin = async() => {
    Admin.findOne({}, (err, admin) => {
        if (admin) return console.log("exists");
        if (err) return console.log(err);
    });

    password = "admin123";

    //hash password 
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, salt);
    const postAdmin = new Admin({
        firstname: "admin",
        lastname: "admin",
        email: "admin@admin.com",
        password: hashPwd,
    });
    try {
        const savedAdmin = await postAdmin.save();
        console.log(savedAdmin);
    } catch (err) {
        // res.status(400).send(err.message);
        console.log(err.message);
    }
}

module.exports = initializeAdmin;