const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config');


const docRoute = require('./routes/doctors');

//middlewares
app.use(express.json());

app.get('/', (req, res) => {
    res.send("home")
})


//routes middlewares
app.use('/api/doctors', docRoute);

app.listen(5000, () => {
    console.log("port running in 5000")
})
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("db connected");
});