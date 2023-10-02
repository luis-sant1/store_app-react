const Pokemons = require('../models/pokemons');
require('dotenv').config()

function addPokemons() {
   Pokemons.insertMany([
      {
         nombre: 'Pikachu',
         descripcion: "Pikachu es un pequeño Pokémon cuya morfología se encuentra basada en un roedor. Aunque su nombre y su categoría hagan alusión a un ratón, según su diseñadora, sus mejillas están basadas en las de una ardilla.",
         imagen: {
            public_id: 'PokemonsImage/1696238512742-Pikachu',
            secure_url:
               'https://res.cloudinary.com/dtne2vbok/image/upload/v1696231341/PokemonsImage/1696238512742-Pikachu.png'
         },
         generacion: '1',
         habilidad: 'Electricidad estática.',
         categoria: ['Ratón'],
      }, {
         nombre: 'Charmander',
         descripcion: "Charmander es un pequeño monstruo bípedo parecido a un lagarto. Sus características de fuego son resaltadas por su color de piel anaranjado y su cola, cuya punta está envuelta en llamas. Charmander y sus evoluciones, Charmeleon y Charizard, tienen una pequeña llama en la punta de sus colas desde que nacen. La intensidad con la que ésta arde es un indicador del estado de salud y emocional de este Pokémon: si la llama arde con mucha fuerza, indica que está completamente sano, y si arde muy levemente, significa que se encuentra débil. El Pokémon podría morir si la llama de su cola se apaga. Cuando son bebés aún no están familiarizados con el fuego, pudiendo llegar a quemarse a sí mismos.",
         imagen: {
            public_id: 'PokemonsImage/1696238476135-Charmander',
            secure_url:
               'https://res.cloudinary.com/dtne2vbok/image/upload/v1696231318/PokemonsImage/1696238476135-Charmander.png'
         },
         generacion: '1',
         habilidad: 'Mar llamas',
         categoria: ['Lagartija'],
      }, {
         nombre: 'Squirtle',
         descripcion: "Squirtle tiene forma de una tortuga semiacuática de una tonalidad azulada, su caparazón es color café, las placas periféricas de color blanco y finalmente su plastrón de una tonalidad crema, posee una cola con la punta enrollada, además de tres dedos en cada una de sus extremidades, una boca con una punta en forma de pico característico de las tortugas y unos grandes ojos de tonalidad rojiza.",
         imagen: {
            public_id: 'PokemonsImage/1696238536040-Squirtle',
            secure_url:
               'https://res.cloudinary.com/dtne2vbok/image/upload/v1696231359/PokemonsImage/1696238536040-Squirtle.png'
         },
         generacion: '1',
         habilidad: 'Torrente.',
         categoria: ['Tortuguita'],
      }, {
         nombre: 'Bulbasaur',
         descripcion: "Bulbasaur es un Pokémon cuadrúpedo de color verde, posee manchas de una tonalidad más oscura del mismo color con distintas formas geométricas. Su cabeza representa cerca de un tercio de su cuerpo",
         imagen: {
            public_id: 'PokemonsImage/1696238489010-Bulbasaur',
            secure_url:
               'https://res.cloudinary.com/dtne2vbok/image/upload/v1696231342/PokemonsImage/1696238489010-Bulbasaur.png'
         },
         generacion: '1',
         habilidad: 'Espesura',
         categoria: ['Semilla'],
      }

   ])
}

module.exports = addPokemons
