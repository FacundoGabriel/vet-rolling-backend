const { registrarUsuarioBD } = require("../services/usuarios.services")

const registrarUsuario = async (req,res) =>{
    const {msg, statusCode, error} = await registrarUsuarioBD (req.body,req)

    try {
        res.status(statusCode).json({msg, statusCode})
    } catch  {
        res.status(statusCode).json(error)
    }
}

module.exports = {
    registrarUsuario,
}