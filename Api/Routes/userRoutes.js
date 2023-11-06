const express = require('express');
const router = express.Router();
const {createUser, loginUser, updateUser, getAllUsers, deleteUser  } = require('../controllers/usersController')
const { validateRegister , validateLogin} = require('../validators/users')

router
.post('/register',  createUser )
.post('/login', validateLogin, loginUser )

.get('/all', getAllUsers )
.put('/edit/:_id', updateUser)
.delete('/delete/:_id', deleteUser)

module.exports = router