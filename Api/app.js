const express = require('express')
const routes = require("./Routes/routes");
const userRoutes = require('./Routes/userRoutes')
const morgan = require('morgan') // See https request
const cors=require('cors')
const cookieParser = require('cookie-parser')

//Config 
require('dotenv').config();

// MongoDB Connection
require('./db/db');

// Settings
const app = express();

//Parse to JSON
app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json()); 
app.use(cookieParser())

// FIX CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

// Routes
app.use("/", routes);
app.use('/user', userRoutes)


module.exports = app;