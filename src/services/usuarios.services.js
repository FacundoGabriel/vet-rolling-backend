const UsuariosModel = require("../models/usuarios.model")
const CarritosModel = require("../models/carritos.model")
const FavoritosModel = require("../models/favoritos.model")
const argon = require("argon2")



const registrarUsuarioBD = async (body,req) =>{
    
    try {
        const nuevoUsuario = new UsuariosModel(body)
        nuevoUsuario.contrasenia = await argon.hash(body.contrasenia)
        const nuevoCarrito = new CarritosModel({idUsuario: nuevoUsuario._id})
        const nuevoFavoritos = new FavoritosModel({idUsuario: nuevoUsuario._id})

        nuevoUsuario.idCarrito = nuevoCarrito._id
        nuevoUsuario.idFavoritos = nuevoFavoritos._id

        await nuevoCarrito.save()
        await nuevoFavoritos.save()
        await nuevoUsuario.save()

        return{
            msg: "Usuario registrado con exito!",
            statusCode: 201
        }
    } catch (error) {
        return{
            error, 
            statusCode:500
        }
    }

}

module.exports = {
    registrarUsuarioBD,


}