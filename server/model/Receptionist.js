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
    sex: {
        type: String,
        required: [true, 'sex required'],

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
    address: {
        type: String,
        required: [true, "Last Name required"],
    },
    number: {
        type: String,
        required: true,
        match: /^\d{10}$/
    }
}, {
    timestamps: true
}, );
module.exports = mongoose.model("Receptionist", receptionistSchema);