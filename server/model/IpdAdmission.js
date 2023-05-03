const mongoose = require("mongoose");

const ipdAdmissionSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: [true, "Patient ID required"],
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
    admissionDate: {
        type: Date,
        default: Date.now,
        required: [true, "Admission Date required"],
    },
    dischargeDate: {
        type: Date,
    },
    roomNumber: {
        type: String,
        required: [true, "Room Number required"],
    },
    bedNumber: {
        type: String,
        required: [true, "Bed Number required"],
    },

    diagnosis: {
        type: String,
    },
    treatment: {
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

module.exports = mongoose.model("IPDAdmission", ipdAdmissionSchema);