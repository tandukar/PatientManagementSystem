const mongoose = require("mongoose");

//creating patient schema

const patientSchema = mongoose.Schema({
    // regdNo: {
    //     type: Number,

    // },
    firstname: {
        type: String,
        required: [true, "First Name required"],
    },
    lastname: {
        type: String,
        required: [true, "Last Name required"],
    },
    age: {
        type: Number,
        required: [true, "age required"],
    },
    sex: {
        type: String,
        required: [true, "Please enter sex field"],
    },
    address: {
        type: String,
        required: [true, "Last Name required"],
    },
    email: {
        type: String,
        min: 9,
        max: 255,
    },
    number: {
        type: String,
        required: true,
        match: /^\d{10}$/
    }
}, {
    timestamps: true,
    get: time => time.toDateString()
});
module.exports = mongoose.model("Patient", patientSchema);