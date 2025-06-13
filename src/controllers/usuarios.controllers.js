const { registrarUsuarioBD, iniciarSesionUsuarioDB } = require("../services/usuarios.services")

const registrarUsuario = async (req,res) =>{
    const {msg, statusCode, error} = await registrarUsuarioBD (req.body,req)

    try {
        res.status(statusCode).json({msg, statusCode})
    } catch  {
        res.status(statusCode).json(error)
    }
}

const iniciarSesionUsuario = async(req, res) =>{
    const { msg, statusCode, token, error} = await iniciarSesionUsuarioDB(req.body)
    try {
        res.status(statusCode).json({msg, statusCode, token})
    } catch {
        res.status(statusCode).json(error)
    }
}

module.exports = {
    registrarUsuario,
    iniciarSesionUsuario
}