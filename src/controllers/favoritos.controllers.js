const { obtenerProductoDeFavoritosBD, agregarProductoFavoritosBD, eliminarProductoFavoritosBD } = require("../services/favoritos.services")

const obtenerProductoDeFavoritos = async (req, res) =>{
    const {productos, statusCode, error} = await obtenerProductoDeFavoritosBD(req.idFavoritos)
    try {
        res.status(statusCode).json({productos})
    } catch  {
         res.status(statusCode).json({error})
    }
}

const agregarProductoFavoritos = async (req, res) =>{
    const {msg, statusCode, error} = await agregarProductoFavoritosBD(req.idFavoritos, req.params.idProducto)
    try {
        res.status(statusCode).json({msg})
    } catch  {
        res.status(statusCode).json({error})
    }
}

const eliminarProductoFavoritos = async (req, res) =>{
    const {msg, statusCode, error} = await eliminarProductoFavoritosBD(req.idFavoritos, req.params.idProducto)
    try {
        res.status(statusCode).json({msg})
    } catch {
        res.status(statusCode).json({error})
    }
}


module.exports = {
    obtenerProductoDeFavoritos,
    agregarProductoFavoritos,
    eliminarProductoFavoritos,
}