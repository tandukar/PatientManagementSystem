const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true
    },

});




module.exports = mongoose.model("Room", roomSchema);