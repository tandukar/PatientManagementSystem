const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
require('dotenv/config');


const docRoute = require('./routes/doctors');
const adminRoute = require('./routes/admin');
const authRoute = require('./routes/auth');

const initializeAdmin = require('./initializeAdmin');

//middlewares
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("home")
})


//routes middlewares
app.use('/api/doctors', docRoute);
app.use('/api/admin', adminRoute);
app.use('/api/auth', authRoute);

app.listen(5000, () => {
    console.log("port running in 5000")
})
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, async() => {
    console.log("db connected");
    await initializeAdmin();
});