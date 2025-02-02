const express = require('express');
const connectDB = require('./config/db');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes')



app.use(bodyParser.json());
app.use(cors())



app.get('/', (req, res) => {
    res.json({message: "Welcome to the Postify" });
});



app.use('/auth' , authRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});