const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const pokemonsSchema = new Schema({
   nombre: {
      type: String,
      required: true
   },
   descripcion: {
      type: String,
      required: true
   },
   imagen: {
      type: Object,
      public_id: String,
      secure_url: String,
      default: null
   },
   generacion: {
      type: String,
      required: true
   },
   habilidad: {
      type: String,
      required: true
   },
   categoria: {
      type: Array,
      default: [],
      required: true
   },
});

const Pokemons = mongoose.model('Pokemons', pokemonsSchema);
module.exports = Pokemons