const express = require('express');
const { upload } = require('../controllers/uploadController');
const { getAll, postItem, putItem,   deleteItem  } = require('../controllers/controllers')

const router = express.Router()

// ALL ITEMS
router.get('/products', getAll)

// CREATE AN ITEM
router.post('/createProduct', upload.single('imagen'), postItem)

// UPDATE AN ITEM
router.put('/updateProduct/:_id', upload.single('imagen'), putItem)

// DELETE AN ITEM
router.delete('/deleteProduct/:_id', deleteItem)

module.exports = router