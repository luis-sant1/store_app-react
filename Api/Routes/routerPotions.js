const express = require('express');
const { upload } = require('../controllers/uploadController');
const { createPokemons,allPokemons,deletePokemon } = require('../controllers/pokemonsControllers')

const router = express.Router()


//Obtener Pociones
router.get('/pokemons', allPokemons)
// Crea una Pocion
router.post('/create-pokemons', upload.single('imagen'), createPokemons)
// Actualizar una Pocion
router.post('/update-pokemons/:pokemonID', upload.single('imagen'), createPokemons)
// Eliminar una Pocion
router.post('/delete-pokemons/:pokemonID', deletePokemon)

module.exports = router