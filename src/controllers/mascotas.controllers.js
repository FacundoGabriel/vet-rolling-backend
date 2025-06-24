const { aniadirUnaMascotaBD, actualizarUnaMascotaBD, obtenerTodosTusMascotasBD, eliminarUnaMascotaBD } = require("../services/mascotas.services")

const obtenerTodosTusMascotas = async (req,res) =>{
    const {mascotas, statusCode, error} = await obtenerTodosTusMascotasBD(req.idUsuario)
    try {
        res.status(statusCode).json({mascotas})
    } catch {
        res.status(statusCode).json(error)
    }
}

const aniadirUnaMascota = async (req,res) =>{
    const {msg, statusCode, error} = await aniadirUnaMascotaBD(req.body, req.idUsuario)
    try {
        res.status(statusCode).json({msg})
    } catch  {
        res.status(statusCode).json({error})
    }
}
const actualizarUnaMascota = async (req,res) =>{
    const {msg, statusCode, error} = await actualizarUnaMascotaBD(req.params.idMascota, req.body)
    try {
        res.status(statusCode).json({msg})
    } catch {
        res.status(statusCode).json({error})
    }
}

const eliminarUnaMascota = async (req,res) =>{
   const {msg, statusCode, error} = await eliminarUnaMascotaBD(req.params.idMascota, req.idUsuario)
   try {
        res.status(statusCode).json({msg})
    } catch {
        res.status(statusCode).json({error})
    }
}


module.exports = {
    obtenerTodosTusMascotas,
    aniadirUnaMascota,
    actualizarUnaMascota,
    eliminarUnaMascota
    
}