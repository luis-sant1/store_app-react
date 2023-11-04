const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const prSchema = new Schema({
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
   precio: {
      type: String,
      required: true
   },
   unidades: {
      type: String,
      required: true
   },
   categoria: {
      type: Array,
      default: [],
      required: true
   },
}); 


module.exports = mongoose.model('Products', prSchema);