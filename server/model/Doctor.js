const mongoose = require("mongoose");

//creating doctor schema

const doctorSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'First Name required'],

    },
    lastname: {
        type: String,
        required: [true, 'Last Name required'],

    },
    age: {
        type: Number,
        required: [true, 'age required'],

    },
    email: {
        type: String,
        required: [true, 'email required'],
        min: 9,
        max: 255,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        min: 9,
        max: 255,
    },
});
module.exports = mongoose.model("Doctor", doctorSchema);