const UsuariosModel = require("../models/usuarios.model")
const CarritosModel = require("../models/carritos.model")
const FavoritosModel = require("../models/favoritos.model")
const argon = require("argon2")
const jwt = require("jsonwebtoken");



const registrarUsuarioBD = async (body) =>{
    
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
const iniciarSesionUsuarioDB = async (body) => {
  try {
    const usuarioExiste = await UsuariosModel.findOne({
      emailUsuario: body.emailUsuario,
    });

    if (!usuarioExiste) {
      return {
        msg: "ERROR. El usuario y/o contraseña incorrectas.",
        statusCode: 401,
      };
    }

    if (!usuarioExiste.estado) {
      return {
        msg: "ERROR. Su cuenta está deshabilitada",
        statusCode: 403,
      };
    }
    
     const verificarContrasenia = await argon.verify(
      usuarioExiste.contrasenia,
      body.contrasenia
    );

    if (verificarContrasenia) {
      const payload = {
        idUsuario: usuarioExiste._id,
        rolUsuario: usuarioExiste.rol,
      };


      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return {
        msg: "Usuario logueado correctamente",
        token,
        statusCode: 200,
      };
    } else {
      return {
        msg: "ERROR. El usuario y/o contraseña incorrectas.",
        statusCode: 401,
      };
    }
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};



const altaLogicaUsuarioPorIdBD = async (idUsuario) =>{
    
    try {
        const usuario = await UsuariosModel.findOne({_id: idUsuario})
         if (!usuario) {
           return {
             msg: "Usuario no encontrado",
              statusCode: 404,
            };
         }
        usuario.estado = "habilitado"
        await usuario.save()

        return{
            msg:"Usuario habilitado",
            statusCode:200,         
        }
    } catch (error) {
        return{
            error,
            statusCode: 500
        }
    }
}

const bajaLogicaUsuarioPorIdBD = async (idUsuario) =>{
    
    try {
        const usuario = await UsuariosModel.findOne({_id: idUsuario})
        if (!usuario) {
           return {
             msg: "Usuario no encontrado",
              statusCode: 404,
            };
         }
        usuario.estado = "deshabilitado"
        await usuario.save()

        return{
            msg:"Usuario deshabilitado",
            statusCode:200,         
        }
    } catch (error) {
        return{
            error,
            statusCode: 500
        }
    }
}

const bajaFisicaUsuarioPorIdBD = async (idUsuario) =>{
    
    try {

        const usuario = await UsuariosModel.findOne({_id: idUsuario})


        if(!usuario){
            return{
                msg:"Usuario no encontrado",
                statusCode: 404,
            }
        }

         await CarritosModel.findByIdAndDelete(usuario.idCarrito);
         await FavoritosModel.findByIdAndDelete(usuario.idFavoritos);
         await UsuariosModel.findByIdAndDelete({_id: idUsuario})
        

        return{
            msg:"Usuario borrado con exito!",
            statusCode:200,         
        }
    } catch (error) {
        console.log(error)
        return{
            error,
            statusCode: 500
        }
    }
}

module.exports = {
    registrarUsuarioBD,
    iniciarSesionUsuarioDB,
    altaLogicaUsuarioPorIdBD,
    bajaLogicaUsuarioPorIdBD,
    bajaFisicaUsuarioPorIdBD,
  }

