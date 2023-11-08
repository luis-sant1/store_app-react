const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const UserSchema = require('../models/users')

/**
 * Objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user) => {
    const sign =  jwt.sign({            // Usa método sign
        _id: user._id,                  // Payload
        role: user.role
    },
        jwtSecret                       // Nuestro secret
    )
    return sign                         //Retorna el token.
}
/**
 * Debemos pasar el token JWT.
 * @param {*} tokenJWT 
 * @returns 
 */
const verifyToken = async (tokenJWT) => {           // Recibe el token de sesión
    try {
        return jwt.verify(tokenJWT, jwtSecret, async(err, user) =>{
            if(err)return res.status(401).json({
                error: "Unauthorized"
            });
            const userFound = await UserSchema.findById(user.id)
            if(!userFound) return res.status(401).json({
                error: "Unauthorized"
            })
            return res.json({
                id: userFound._id,
                name:  userFound.name,
                lastNam: userFound.lastName,
                email: userFound.email
            })
        })      // Verifica el token de sesión con la clave maestra. JWT SECRET
    } catch (error) {
        return null
    }
}

module.exports = { tokenSign, verifyToken }