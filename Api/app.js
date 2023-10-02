const express = require('express')
const routerPotions = require("./Routes/routerPotions");
const morgan = require('morgan') // See https request
const cors=require('cors')
//Config 
require('dotenv').config();

// MongoDB Connection
require('./db/db');

// Settings
const app = express();


app.use(cors())
// Routes
app.use("/", routerPotions);

module.exports = app;