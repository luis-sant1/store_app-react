/**
 * Array con roles permitidos.
 * @param {*} rol 
 * @returns 
 */
const checkRol = (rol) => (req, res, next) => {
    try {
        const { user } = req
        const userRole = user.role

        const checkRolValue = rol.some((roleSingle) => userRole.includes(roleSingle)) // Nos devuelve true o false si en el primer array incluye los mismos valores que el segundo.
        if(!checkRolValue){
            return res.status(403).json({ error: "Usuario no tiene permisos" })
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: "Error con los permisos." })
    }
}

module.exports = { checkRol }