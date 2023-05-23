const mongoose = require("mongoose");

//creating appointment schema

const appointmentSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: [true, "Patient Id required"],
    },
    patientName: {
        type: String,
        required: [true, "Patient Name required"],
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: [true, "Doctor required"],
    },
    docName: {
        type: String,
        required: [true, "Doctor Name required"],
    },

    reason: {
        type: [String],
        required: [true, "Reason required"],
    },
    notes: {
        type: [String],
    },
    procedures: {
        type: [String],
    },
    diagnosis: {
        type: String,
    },

    patientType: {
        type: String,
        enum: ["ipd", "opd"],
        default: "opd",
        required: [true, "Patient Type required"],
    },
    appointmentDate: {
        type: Date,
    },
    roomNo: {
        type: String,
    },

    status: {
        type: String,
        enum: ["Pending", "Approved", "Cancelled", "Completed"],
        default: "Pending",
    },
    recepId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receptionist",
    },
});

module.exports = mongoose.model("Appointment", appointmentSchema);