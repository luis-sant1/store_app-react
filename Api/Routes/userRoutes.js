const express = require('express');
const router = express.Router();
const {createUser, loginUser } = require('../controllers/usersController')
const { validateRegister , validateLogin} = require('../validators/users')

router
.post('/register', validateRegister , createUser )
.post('/login', validateLogin, loginUser )

.get('/all',  )
.put('/edit')
.delete('/delete')

module.exports = router