const prSchema = require('../models/products');
require('dotenv').config()

function addDocument() {
   prSchema.insertMany([
      {
         nombre: 'Dell Optiplex',
         descripcion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type`,
         imagen: {
            public_id: 'PokemonsImage/1696238512742-Pikachu',
            secure_url:
               'https://res.cloudinary.com/dtne2vbok/image/upload/v1696231341/PokemonsImage/1696238512742-Pikachu.png'
         },
         precio: '1',
         unidades: 'Electricidad estática.',
         categoria: ['Ratón'],
      }, {
         nombre: 'Dell Optiplex',
         descripcion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type`,
         imagen: {
            public_id: 'PokemonsImage/1696238512742-Pikachu',
            secure_url:
               'https://res.cloudinary.com/dtne2vbok/image/upload/v1696231341/PokemonsImage/1696238512742-Pikachu.png'
         },
         precio: '1',
         unidades: 'Electricidad estática.',
         categoria: ['Ratón'],
      }, {
         nombre: 'Dell Optiplex',
         descripcion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type`,
         imagen: {
            public_id: 'PokemonsImage/1696238512742-Pikachu',
            secure_url:
               'https://res.cloudinary.com/dtne2vbok/image/upload/v1696231341/PokemonsImage/1696238512742-Pikachu.png'
         },
         precio: '1',
         unidades: 'Electricidad estática.',
         categoria: ['Ratón'],
      }, {
         nombre: 'Dell Optiplex',
         descripcion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type`,
         imagen: {
            public_id: 'PokemonsImage/1696238512742-Pikachu',
            secure_url:
               'https://res.cloudinary.com/dtne2vbok/image/upload/v1696231341/PokemonsImage/1696238512742-Pikachu.png'
         },
         precio: '1',
         unidades: 'Electricidad estática.',
         categoria: ['Ratón'],
      }
      
   ])
}

module.exports = addDocument
