const express = require('express')
const routes = require("./Routes/routes");
const morgan = require('morgan') // See https request
const cors=require('cors')
//Config 
require('dotenv').config();

// MongoDB Connection
require('./db/db');

// Settings
const app = express();

//Parse to JSON
app.use(express.json()); 

// FIX CORS
app.use(cors())

// Routes
app.use("/", routes);

module.exports = app;