const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
});


module.exports = mongoose.model("Bed", bedSchema);