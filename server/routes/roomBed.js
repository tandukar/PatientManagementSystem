const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();



const Bed = require("../model/Bed");
const Room = require("../model/Room");

router.post("/room", async(req, res) => {
    try {
        const room = new Room({
            name: req.body.name,
        });
        const savedRoom = await room.save();
        res.json(savedRoom);
    } catch (err) {
        console.log(err);
    }

});

router.post('/bed', async(req, res) => {
    try {
        const bed = new Bed({
            number: req.body.number,
            room: req.body.room,
        });
        const savedBed = await bed.save();
        res.json(savedBed);
    } catch (err) {
        console.log(err);
    }

})

module.exports = router;