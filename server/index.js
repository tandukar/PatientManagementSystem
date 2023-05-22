const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv/config");


const docRoute = require("./routes/doctors");
const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");
const patientRoute = require("./routes/patients");
const appointmentRoute = require("./routes/appointment");
const roomBedRoute = require("./routes/roomBed")
const ipdRoute = require("./routes/ipdAdmission");

const initializeAdmin = require("./initializeAdmin");


const corsOptions = {
    origin: true,
    credentials: true,
    exposedHeaders: 'Authorization'
};
const recepRoute = require('./routes/receptionists');

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("home");
});



app.use("/api/auth", authRoute);

// middleware to set the current user on the request object
const setCurrentUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.TOKEN, (err, decodedToken) => {
            if (err) {
                return res.status(401).send("Invalid Token");
            } else {
                req.currentUser = decodedToken._id;
                next();
            }
        });
    } else {
        return res.status(401).send("Authorization header not found");
    }
};


//routes middlewares
app.use(setCurrentUser);
app.use("/api/doctors", docRoute);
app.use('/api/receptionists', recepRoute);
app.use("/api/admin", adminRoute);
app.use("/api/patients", patientRoute);
app.use("/api/appointments", appointmentRoute);
app.use("/api/roomBed", roomBedRoute);
app.use("/api/ipd", ipdRoute);

app.listen(5000, () => {
    console.log("port running in 5000");
});
mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser: true },
    async() => {
        console.log("db connected");
        await initializeAdmin();
    }
);