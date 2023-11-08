
const { verifyToken } = require('../utils/handleJwt')
const UserModel = require('../models/users')
const authMidd = async (req, res, next) => {
    try {
        if(!req.cookies.token){                                                         // Buscamos en lso headers el Bearer token
            return res.status(401).json({ error: "Necesitas iniciar sesión para continuar." })  // SI NO EXISTE.
        }
        // const token = req.headers.authorization.split(' ').pop();                           // Sacmos el token separandolo de Bearer
        const token = req.cookies.token;                               // Sacmos el token separandolo de Bearer
        const dataToken = await verifyToken(token);                                             // Verificamos el token-

        if(!dataToken._id){                                                                     // Comprobamos si hay un id en el payload.
            return res.status(401).json({ error: "Token no contiene ID." })
        }
        const user = await UserModel.findById(                                                  // Encontramos el user correspondiente al id del payload.
            dataToken._id
        )
        req.user = user
     
                                                            // Inyectamos la propiedad user al req que es igual al user retornado por la DB. 
                                                                                       // Ya en cualquier otro controlador podemos saber qué usuario está accediendo a ese endpoint (user = req.user)
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: "Error al verificar sesión." })
    }
}
// const authMidd = async (req, res, next) => {
//     try {
//         if(!req.cookies.token){                                                         // Buscamos en lso headers el Bearer token
//             return res.status(401).json({ error: "Necesitas iniciar sesión para continuar." })  // SI NO EXISTE.
//         }
//         // const token = req.headers.authorization.split(' ').pop();                           // Sacmos el token separandolo de Bearer
//         const token = req.cookies.token;                               // Sacmos el token separandolo de Bearer
//         const dataToken = await verifyToken(token);                                             // Verificamos el token-

//         if(!dataToken._id){                                                                     // Comprobamos si hay un id en el payload.
//             return res.status(401).json({ error: "Token no contiene ID." })
//         }
//         const user = await UserModel.findById(                                                  // Encontramos el user correspondiente al id del payload.
//             dataToken._id
//         )
//         req.user = user
//         res.status(200).json({
//             user: "Paso validación"
//         })                                                                         // Inyectamos la propiedad user al req que es igual al user retornado por la DB. 
//                                                                                        // Ya en cualquier otro controlador podemos saber qué usuario está accediendo a ese endpoint (user = req.user)
//     } catch (error) {
//         console.log(error)
//         res.status(401).json({ error: "Error al verificar sesión." })
//     }
// }

module.exports= {authMidd }