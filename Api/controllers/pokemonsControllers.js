const Pokemons = require('../models/pokemons');
const { deleteImage, uploadImageEvent } = require('../utils/cloudinary');
var fs = require('fs-extra');


// All pokemons listed

const allPokemons=async(req,res)=>{
    await Pokemons.find({})
    .then(data => {

      res.json(data)

    });
}

// Create a new pokemon

const createPokemons = async (req, res) => {
    try {
      console.log(req)
       if (!req.file) return res.status(404).json({messageError: 'Debes agregar una imagen de la pocion'})
       const { path } = req.file;
 
       const { nombre, descripcion, imagen, generacion, habilidad, categoria } = req.body;
       let pokemon = await Pokemons.findOne({ nombre });
       console.log(pokemon);
       if (pokemon) return res.status(404).json({messageError: 'Ya existe esta pocion'});
 
       pokemon = new Pokemons({ nombre, descripcion, imagen, generacion, habilidad, categoria });
       console.log(pokemon);
       if (path) {
          const result = await uploadImageEvent(path)
          await fs.unlink(path)
          pokemon.imagen = {public_id: result.public_id, secure_url: result.secure_url}
       }
       await pokemon.save()
       return res.status(200).json({pokemon: pokemon._id});
    } catch (error) {
       return res.status(500).json({messageError: error.message});
    }
 }
 
// Update a existing pokemon

const updatePokemon = async (req, res) => {
   try {
      let path;
      if (!!req.file) {
         // console.log(`Se guardara el archivo: ${req.file.path}`);
         path = req.file.path;
      }
   
      const { pokemonID } = req.params;
      const update = req.body;

      if (path !== undefined) {
         let pokemon = await Pokemons.findById(pokemonID)
         await deleteImage(pokemon.imagen.public_id)
         const result = await uploadImageEvent(path)
         await fs.unlink(path)
         update.imagen = {public_id: result.public_id, secure_url: result.secure_url}
         pokemon = await Pokemons.findByIdAndUpdate(pokemonID, update, {new: true})
         return res.status(200).json({pokemon: pokemon._id})
      }
      const pokemon = await Pokemons.findByIdAndUpdate(pokemonID, update, {new: true})
      return res.status(200).json({pokemon: pokemon._id})
   } catch (error) {
      return res.status(500).json({messageError: error.message});
   }
}

// Delete a pokemon by ID

const deletePokemon = async (req, res) => {
   try {
      const pokemonID = req.params.pokemonID;
      const pokemon = await Pokemons.findByIdAndDelete(pokemonID)

      if (!pokemon) return res.status(404).json({messageError: 'Esta pocion no existe'})

      await deleteImage(pokemon.imagen.public_id)
      return res.status(204).send()
   } catch (error) {
      return res.status(404).json({messageError: error.message});
   }
}

 module.exports={
    createPokemons,
    allPokemons,
    updatePokemon,
    deletePokemon
 }