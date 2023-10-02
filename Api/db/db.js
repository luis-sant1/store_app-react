require('dotenv').config();
const mongoose = require('mongoose');
const Pokemons = require('../models/pokemons');
const addPokemons = require('./dbPokemons'); // Agrega las Pociones

mongoose.set('strictQuery', false)

mongoose.connect(process.env.URI) 
   .then(async()=> {
      const pokemons = await Pokemons.find().limit(1).lean();
      if (pokemons.length === 0) {
         addPokemons()
         console.log('Pokemons correctly added');
      }
      console.log('Database succesfully connected')
   })
   .catch((e) => console.log("Fallo de Conexion " + e));