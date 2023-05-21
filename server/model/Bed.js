const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    roomName: {
        type: String,
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    patientName: {
        type: String,
        default: ""
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
});



module.exports = mongoose.model("Bed", bedSchema);