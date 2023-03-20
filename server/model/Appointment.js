const mongoose = require("mongoose");

//creating appointment schema

const appointmentSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: [true, "Patient Id required"],
    },

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: [true, "Doctor required"],
    },

    reason: {
        type: [String],
        required: [true, "Reason required"],
    },
    notes: {
        type: [String],
        required: [true, "Reason required"],
    },
    procedures: {
        type: [String],
        required: [true, "procedures required"],
    },
    diagnosis: {
        type: String,
        required: [true, "diagnosis required"],
    },
    ipd: {
        type: Boolean,
        default: false,
    },
    opd: {
        type: Boolean,
        default: false,
    },
    ipdDetails: {
        roomNo: {
            type: String,
        },
        admittedDate: {
            type: Date,
        },
        dischargedDate: {
            type: Date,
        },
    },
    opdDetails: {
        appointmentDate: {
            type: Date,
            required: [true, "Appointment Date required"],
        },
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending",
    },
});

module.exports = mongoose.model("Appointment", appointmentSchema);