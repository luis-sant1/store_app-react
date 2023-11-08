const express = require('express');
const { upload } = require('../controllers/uploadController');
const { getAll, postItem, putItem, deleteItem  } = require('../controllers/controllers')
const {authMidd } = require('../middleware/session')
const {checkRol} = require('../middleware/rol')

const router = express.Router()

// ALL ITEMS
router.get('/products',  getAll) // PARA TESTEO SE ESTÁN USANDO LOS MIDDLEWARE DE AUTENTICACIÓN Y VERIFICACIÓN DE ROL.

// CREATE AN ITEM
router.post('/createProduct', upload.single('imagen'), postItem)

// UPDATE AN ITEM
router.put('/updateProduct/:_id', upload.single('imagen'), putItem)

// DELETE AN ITEM
router.delete('/deleteProduct/:_id', deleteItem)

module.exports = router;