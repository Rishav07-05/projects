const express = require('express');
const connectDB = require('./config/db');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes')





app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.use(bodyParser.json());
app.use(cors())
app.use('/auth' , authRoutes)




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});