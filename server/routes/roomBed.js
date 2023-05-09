const express = require("express");
const router = express.Router();
const Bed = require("../model/Bed");
const Room = require("../model/Room");

router.post("/room", async(req, res) => {
    const roomExists = await Room.findOne({ name: req.body.name });
    if (roomExists) { return res.status(400).json({ message: "Room already exists" }) }
    const room = new Room({
        name: req.body.name,
        category: req.body.category,
        isAvailable: req.body.isAvailable,
    });
    try {
        const savedRoom = await room.save();
        res.json(savedRoom);
    } catch (err) {
        console.log(err);
    }
});

router.post('/bed', async(req, res) => {
    const roomExists = await Room.findOne({ name: req.body.roomName })
    if (!roomExists) {
        return res.status(404).json({ message: "Room not found" })
    }
    const bed = new Bed({
        number: req.body.number,
        roomName: req.body.roomName,
        patient: req.body.patient,
        isAvailable: req.body.isAvailable,
    });
    try {
        const savedBed = await bed.save();
        res.json(savedBed);
    } catch (err) {
        console.log(err);
    }
});

router.get('/beds/:name', async(req, res) => {
    try {
        const beds = await Bed.find({ roomName: req.params.name });
        res.json(beds);
    } catch (err) {
        console.log(err);
    }
});

router.get('/room', async(req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;