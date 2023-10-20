const prSchema = require('../models/products');
const { deleteImage, uploadImageEvent } = require('../utils/cloudinary');
var fs = require('fs-extra');


// All products listed

const getAll =async(req,res)=>{
    await prSchema.find({})
    .then(data => {

      res.json(data)

    });
}

// Create a item

// const postItem = async (req, res) => {
//     try {
//        if (!req.file) return res.status(404).json({messageError: 'Debes agregar una imagen del item'})
//        const { path } = req.file;
 
//        const { nombre, descripcion, imagen, precio, unidades, categoria } = req.body;
//        let item = await prSchema.findOne({ nombre });
//        console.log(item);
//        if (item) return res.status(404).json({messageError: 'Ya existe este item'});
 
//        item = new prSchema({ nombre, descripcion, imagen, precio, unidades, categoria });
//        console.log(item);
//        if (path) {
//           const result = await uploadImageEvent(path)
//           await fs.unlink(path)
//           putItem.imagen = {public_id: result.public_id, secure_url: result.secure_url}
//        }
//        await item.save()
//        return res.status(200).json({item: item._id});
//     } catch (error) {
//        return res.status(500).json({messageError: error.message});
//     }
//  }
 const postItem = async (req, res) => {
   try {
     console.log(req)
      if (!req.file) return res.status(404).json({messageError: 'Debes agregar una imagen del item'})
      const { path } = req.file;

      const { nombre, descripcion, imagen, precio, unidades, categoria } = req.body;
      let item = await prSchema.findOne({ nombre });
      console.log(item);
      if (item) return res.status(404).json({messageError: 'Ya existe este item'});

      item = new prSchema({ nombre, descripcion, imagen, precio, unidades, categoria });
      console.log(item);
      if (path) {
         const result = await uploadImageEvent(path)
         await fs.unlink(path)
         item.imagen = {public_id: result.public_id, secure_url: result.secure_url}
      }
      await item.save()
      return res.status(200).json({item: item._id});
   } catch (error) {
      // console.log(error.message);
      return res.status(500).json({messageError: error.message});
   }
}
// Update Item

const putItem = async (req, res) => {
   try {
      let path;
      if (!!req.file) {
         path = req.file.path;
      }
      const {_id} = req.params;
      console.log(_id)
      const update = req.body;

      if (path !== undefined) {
         
         let item = await prSchema.findById(_id)
         await deleteImage(item.imagen.public_id)
         const result = await uploadImageEvent(path)
         await fs.unlink(path)
         update.imagen = {public_id: result.public_id, secure_url: result.secure_url}
         item = await prSchema.findByIdAndUpdate(_id, update, {new: true})

         return res.status(200).json({item: "The item has been edited"})
      }
      const item = await prSchema.findByIdAndUpdate(_id, update, {new: true})
      return res.status(200).json({item: "The item has been edited"})

   } catch (error) {
      return res.status(500).json({messageError: error.message});
   }
}

// Delete an item by ID

const deleteItem = async (req, res) => {
   try {
      const id = req.params._id;
      const item = await prSchema.findByIdAndDelete(id)

      if (!item) return res.status(404).json({messageError: 'This item is not in the storage'})

      await deleteImage(item.imagen.public_id)
      return res.status(204).send({message: "Item has been romeved"})
   } catch (error) {
      return res.status(404).json({messageError: error.message});
   }
}

 module.exports={getAll, postItem, putItem,   deleteItem };