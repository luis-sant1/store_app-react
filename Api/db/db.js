require('dotenv').config();
const mongoose = require('mongoose');
const prSchema = require('../models/products');
const addDocuments = require('./dbInsert'); // Agrega las Pociones

mongoose.set('strictQuery', false)

mongoose.connect(process.env.URI) 
   .then(async()=> {
      const items = await prSchema.find().limit(1).lean();
      if (items.length === 0) {
         addDocuments()
         console.log('Items correctly added');
      }
      console.log('Database succesfully connected')
   })
   .catch((e) => console.log("Fallo de Conexion " + e));