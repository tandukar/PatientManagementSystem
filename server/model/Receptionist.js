const mongoose = require("mongoose");

//creating receptionist schema

const receptionistSchema = mongoose.Schema({
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
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter  password'],
        min: 9,
        max: 255,
    },


}, {
    timestamps: true
}, );
module.exports = mongoose.model("Receptionist", receptionistSchema);