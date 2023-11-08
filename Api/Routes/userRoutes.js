const express = require('express');
const router = express.Router();
const {createUser, loginUser, updateUser, getAllUsers, deleteUser, verify, logout, addToFav  } = require('../controllers/usersController')
const { validateRegister , validateLogin} = require('../validators/users')

router
.post('/register', validateRegister, createUser )
.post('/login', validateLogin, loginUser )

.get('/all', getAllUsers )
.put('/edit/:_id', updateUser)
.delete('/delete/:_id', deleteUser)
.get('/verify', verify)
.post('/logout', logout)
.get('/newFav/:_id', addToFav);

module.exports = router;
