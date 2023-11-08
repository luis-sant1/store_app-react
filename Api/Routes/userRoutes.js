const express = require('express');
const router = express.Router();
const { createUser, loginUser, updateUser, getAllUsers, deleteUser, addToFav } = require('../controllers/usersController');
const { validateRegister, validateLogin } = require('../validators/users');

// Ruta para registrar un usuario
router.post('/register', validateRegister, createUser);

// Ruta para iniciar sesión
router.post('/login', validateLogin, loginUser);

// Ruta para obtener todos los usuarios
router.get('/all', getAllUsers);

// Ruta para actualizar un usuario por su ID
router.put('/edit/:_id', updateUser);

// Ruta para eliminar un usuario por su ID
router.delete('/delete/:_id', deleteUser);
router.get('/newFav/:_id', addToFav);

module.exports = router;