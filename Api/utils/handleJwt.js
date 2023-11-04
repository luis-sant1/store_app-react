const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

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
        return jwt.verify(tokenJWT, jwtSecret)      // Verifica el token de sesión con la clave maestra. JWT SECRET
    } catch (error) {
        return null
    }
}

module.exports = { tokenSign, verifyToken }