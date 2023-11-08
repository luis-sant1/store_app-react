const UserSchema = require('../models/users');
const { matchedData } = require('express-validator')
const { encrypt, compare } = require('../utils/handlePassword')
const { tokenSign, verifyToken } = require('../utils/handleJwt')
const createUser = async (req, res) => {
    try {
        req = matchedData(req)                                  // DATA Validada con express-validator.
        const passwordHash = await encrypt(req.body.password)        // Password encriptada
        const body = { ...req.body, password: passwordHash }         // Password reemplaza en copia de req
        const existingUser = await UserSchema.findOne({
            email: body.email
        })
        if (existingUser) {
            return res.status(400).json({ error: ['Ya existe un usuario con ese email.'] })
        }

        const { name, lastName, email, password, address, phone } = body
        const newUser = new UserSchema({
            name,
            lastName,
            email,
            password,
            address,
            phone
        })           // Crear
        const userSaved = await newUser.save()
        newUser.set('password', undefined, { strict: false })   // Setea el password, ya que create no admite filtrar desde el model.
        console.log({ body: JSON.stringify(req.body) });
        console.log({ document: newUser.toJSON() });
        const token = await tokenSign(newUser);
        const data = {
            token: token,                    // Generar un token con la data del user.
            user: userSaved                                       // User
        }
        console.log(token)
        res.cookie("token", token)                                       // Guardar token como un a cookie
        res.json({ user: data });
        // res.send("registrando")
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: ["Hubo un error al crear usuario"] })
    }
}

const loginUser = async (req, res) => {
    try {
        req = matchedData(req)                                              // Datos curados
        const user = await UserSchema.findOne({
            email: req.email                                                // Buscamo en la base de datos donde el email sea igual al que se está pasando.
        }).select('password name role email');                              // Aplicamos el filtro select para poder ver estos datos

        if (!user) {                                                        // Comprobamos que haya un usuario con ese email.
            return res.status(400).json({ error: ['Usuario no encontrado.'] });
        }

        const hashPassword = user.get('password');                           // Obtener password.
        const check = await compare(req.password, hashPassword)             // Comparar ambas contraseñas la que viene del req y la hash de la bse de datos.

        if (!check) {                                                       // Si la comprobación de contraseñas es <false>
            return res.status(401).json({ error: ['Contraseña invalida.'] });
        }
        const token = await tokenSign(user)
        const data = {                                                      // Manda token y user.
            token: token,
            user
        }
        user.set('password', undefined, { strict: false });                  // Vuelve a setear la password para que no pase al front.
        console.log(token);
        res.cookie("token", token)                                       // Guardar token como un a cookie

        res.status(200).json({
            user: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: ["Hubo un error al iniciar sesión."] })
    }
}

const updateUser = async (req, res) => {
    try {
        const { _id } = req.params                                                           // Sacamos el ID que nos llega en la URL.

        const existingUser = await UserSchema.findOne({                                    // Preguntamos si existe este usuario (por email)
            email: req.body.email
        })

        if (existingUser) {
            return res.status(400).json({ error: ['Ya existe un usuario con ese email.'] })
        }

        const user = await UserSchema.findByIdAndUpdate(_id, req.body, { new: true })      // Buscamos y actualizamos con la nueva data.
        return res.status(200).json({ user: "Usuario actualizado correctamente." })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: ["Hubo un error al editar un usuario."] })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserSchema.find({})
        return res.status(200).json({ users: allUsers })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Hubo un error al buscar usuarios." })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { _id } = req.params
        if (!_id.match(/^[0-9a-fA-F]{24}$/)) {                                                     // Validamos el formato del id.
            return res.status(500).json({ error: "Formato de id inválido" })
        }
        const existingUser = await UserSchema.findById({
            _id
        })
        if (!existingUser) {
            return res.status(500).json({ error: 'No se puede encontrar usuario especificado.' })    // Validamos si existe usuario con ese id.
        }
        const deleteUser = await UserSchema.findByIdAndDelete({
            _id
        })

        res.status(200).json({
            user: "Usuario eliminado correctamente."
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Hubo un error al intentar eliminar usuario." })
    }
}

const verify = async (req, res) => {
    const { token } = req.cookies['token'];
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);

        const userFound = await User.findById(user.id);
        if (!userFound) return res.sendStatus(401);

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });

}

module.exports = { createUser, loginUser, updateUser, getAllUsers, deleteUser, verify };