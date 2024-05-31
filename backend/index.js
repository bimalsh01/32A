// Imporing the packages (express)
const express = require('express');
const connectDatabase = require('./database/database');
const dotenv = require('dotenv')
const cors = require('cors')
const acceptFormData = require('express-fileupload')

// Creating an express app
const app = express();

// Configure Cors Policy
const corsOptions = {
    origin : true,
    credentials : true,
    optionSuccessStatus : 200
}
app.use(cors(corsOptions))


// Express Json Config
app.use(express.json())

// Config form data
app.use(acceptFormData())

// Make a static public folder
app.use(express.static("./public"))


// dotenv Configuration
dotenv.config()

// Connecting to database
connectDatabase()

// Defining the port
const PORT = process.env.PORT; 

// Making a test endpoint
// Endpoints : POST, GET, PUT, DELETE
app.get('/test', (req,res)=>{
    res.send("Test API is Working!...")
})

// http://localhost:5000/test


// configuring Routes of User
app.use('/api/user', require('./routes/userRoutes'))

app.use('/api/product', require('./routes/productRoutes'))

// http://localhost:5000/api/user/create




// Starting the server
app.listen(PORT, ()=>{
    console.log(`Server is Running on port ${PORT}!`)
})