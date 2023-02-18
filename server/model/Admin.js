const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'First Name required'],

    },
    lastname: {
        type: String,
        required: [true, 'Last Name required'],

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

});

module.exports = Admin = mongoose.model("admins", AdminSchema);