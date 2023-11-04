const UserSchema = require('../models/users');
const { matchedData } = require('express-validator')
const { encrypt, compare } = require('../utils/handlePassword')
const { tokenSign } = require('../utils/handleJwt')

const createUser = async (req, res) => {
    try {
        req = matchedData(req)                                  // DATA Validada con express-validator.
        const passwordHash = await encrypt(req.password)        // Password encriptada
        const body = { ...req, password: passwordHash }         // Password reemplaza en copia de req
        const newUser = await UserSchema.create(body)           // Crear
        newUser.set('password', undefined, { strict: false })   // Setea el password, ya que create no admite filtrar desde el model.

        const data = {
            token: await tokenSign(newUser),                    // Generar un token con la data del user.
            user: newUser                                       // User
        }
        console.log(await tokenSign(newUser))
        res.json({ user: data });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "hubo un error al craear usuario" })
    }
}

const loginUser = async (req, res) => {
    try {
        req = matchedData(req)                                              // Datos curados
        const user = await UserSchema.findOne({
            email: req.email                                                // Buscamo en la base de datos donde el email sea igual al que se está pasando.
        }).select('password name role email');                              // Aplicamos el filtro select para poder ver estos datos

        if (!user) {                                                        // Comprobamos que haya un usuario con ese email.
            return res.status(400).json({ error: 'Usuario no encontrado.' });
        }

        const hashPassword = user.get('password');                           // Obtener password.
        const check = await compare(req.password, hashPassword)             // Comparar ambas contraseñas la que viene del req y la hash de la bse de datos.

        if (!check) {                                                       // Si la comprobación de contraseñas es <false>
            return res.status(401).json({ error: 'Contraseña invalida.' });
        }

        const data = {                                                      // Manda token y user.
            token: await tokenSign(user),                   
            user
        }
        user.set('password', undefined, {strict: false});                  // Vuelve a setear la password para que no pase al front.
        console.log(await tokenSign(user));
        res.status(500).json({
            user: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "hubo un error al iniciar sesion" })
    }
}

module.exports = { createUser, loginUser };