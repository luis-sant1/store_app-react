
/// MANAGE FILES

const cloudinary = require('cloudinary').v2
require('dotenv').config();

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_API_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
   secure: true
});

const options = {
   use_filename: true,
   unique_filename: false,
   overwrite: true,
};
 
const pokemonsFolder = 'PokemonsImage';
 
const uploadImage = async (imagePath, folder) => {
   const optionsWithFolder = { ...options, folder };
   return await cloudinary.uploader.upload(imagePath, optionsWithFolder);
};

const uploadImageEvent = async (imagePath) => {
   return await uploadImage(imagePath, pokemonsFolder);
};
 

const deleteImage = async (public_id) => {
   return await cloudinary.uploader.destroy(public_id);
}

module.exports = {
   uploadImageEvent,
   deleteImage
};