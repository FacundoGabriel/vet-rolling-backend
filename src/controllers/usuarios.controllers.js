const { registrarUsuarioBD, altaLogicaUsuarioPorIdBD, bajaLogicaUsuarioPorIdBD, bajaFisicaUsuarioPorIdBD } = require("../services/usuarios.services")

const registrarUsuario = async (req,res) =>{
    const {msg, statusCode, error} = await registrarUsuarioBD (req.body)

    try {
        res.status(statusCode).json({msg, statusCode})
    } catch  {
        res.status(statusCode).json(error)
    }
}

const altaLogicaUsuarioPorId = async(req,res) =>{
    const {msg, statusCode, error} = await altaLogicaUsuarioPorIdBD(req.params.id)
    try {
        res.status(statusCode).json({ msg })
    } catch  {
        res.status(statusCode).json({ error })
    }
}
const bajaLogicaUsuarioPorId = async(req,res) =>{
    const {msg, statusCode, error} = await bajaLogicaUsuarioPorIdBD(req.params.id)
    try {
        res.status(statusCode).json({ msg })
    } catch  {
        res.status(statusCode).json({ error })
    }
}
const bajaFisicaUsuarioPorId = async(req,res) =>{
    const {msg, statusCode, error} = await bajaFisicaUsuarioPorIdBD(req.params.id)
    try {
        res.status(statusCode).json({ msg })
    } catch  {
        res.status(statusCode).json({ error })
    }
}


module.exports = {
    registrarUsuario,
    altaLogicaUsuarioPorId,
    bajaLogicaUsuarioPorId,
    bajaFisicaUsuarioPorId,

}