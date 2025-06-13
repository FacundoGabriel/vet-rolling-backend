const UsuariosModel = require("../models/usuarios.model");
const CarritosModel = require("../models/carritos.model");
const FavoritosModel = require("../models/favoritos.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");

const registrarUsuarioBD = async (body, req) => {
  try {
    const nuevoUsuario = new UsuariosModel(body);
    nuevoUsuario.contrasenia = await argon.hash(body.contrasenia);
    const nuevoCarrito = new CarritosModel({ idUsuario: nuevoUsuario._id });
    const nuevoFavoritos = new FavoritosModel({ idUsuario: nuevoUsuario._id });

    nuevoUsuario.idCarrito = nuevoCarrito._id;
    nuevoUsuario.idFavoritos = nuevoFavoritos._id;

    await nuevoCarrito.save();
    await nuevoFavoritos.save();
    await nuevoUsuario.save();

    return {
      msg: "Usuario registrado con exito!",
      statusCode: 201,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

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

module.exports = {
  registrarUsuarioBD,
  iniciarSesionUsuarioDB,
};
