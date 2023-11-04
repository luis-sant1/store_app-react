const bcryptjs = require('bcryptjs')
/**
 * Pasa contraseña sin encriptar
 * @param {*} passwordPlain 
 * @returns  Retorna contraseña encriptada.
 */
const encrypt = async (passwordPlain) => { // passwordPlain contraseña sin encriptar
    return hash = await bcryptjs.hash(passwordPlain, 10) // Encripta el texto plano con una salt de 10. (aleatoriedad)
}
/**
 * Contraseña plana y contraseña encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword) // Compara 
}

module.exports = {encrypt, compare  }