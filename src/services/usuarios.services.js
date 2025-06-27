const UsuariosModel = require("../models/usuarios.model");
const CarritosModel = require("../models/carritos.model");
const FavoritosModel = require("../models/favoritos.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const { registroExitoso } = require("../utils/mensajes.nodemailer.utils");

const registrarUsuarioBD = async (body) => {
  try {
    const nuevoUsuario = new UsuariosModel(body);
    nuevoUsuario.contrasenia = await argon.hash(body.contrasenia);
    const nuevoCarrito = new CarritosModel({ idUsuario: nuevoUsuario._id });
    const nuevoFavoritos = new FavoritosModel({ idUsuario: nuevoUsuario._id });

    nuevoUsuario.idCarrito = nuevoCarrito._id;
    nuevoUsuario.idFavoritos = nuevoFavoritos._id;

    const { info, rejected } = await registroExitoso(
      nuevoUsuario.emailUsuario,
      nuevoUsuario.nombreUsuario
    );
    if (info && !rejected.length) {
      await nuevoCarrito.save();
      await nuevoFavoritos.save();
      await nuevoUsuario.save();
      return {
        msg: "Usuario registrado con exito",
        statusCode: 201,
      };
    } else {
      return {
        msg: "ERROR al intentar crear el usuario",
      };
    }
  } catch (error) {
    console.log(error);
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
        idCarrito: usuarioExiste.idCarrito,
        idFavoritos: usuarioExiste.idFavoritos,
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

const altaLogicaUsuarioPorIdBD = async (idUsuario) => {
  try {
    const usuarioExiste = await UsuariosModel.findOne({ _id: idUsuario });
    if (!usuarioExiste) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
      };
    }
    usuarioExiste.estado = "habilitado";
    await usuarioExiste.save();

    return {
      msg: "Usuario habilitado",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

const bajaLogicaUsuarioPorIdBD = async (idUsuario) => {
  try {
    const usuarioExiste = await UsuariosModel.findOne({ _id: idUsuario });
    if (!usuarioExiste) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
      };
    }
    usuarioExiste.estado = "deshabilitado";
    await usuarioExiste.save();

    return {
      msg: "Usuario deshabilitado",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const bajaFisicaUsuarioPorIdBD = async (idUsuario) => {
  try {
    const usuarioExiste = await UsuariosModel.findOne({ _id: idUsuario });

    if (!usuarioExiste) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
      };
    }

    await CarritosModel.findByIdAndDelete(usuarioExiste.idCarrito);
    await FavoritosModel.findByIdAndDelete(usuarioExiste.idFavoritos);
    await UsuariosModel.findByIdAndDelete({ _id: idUsuario });

    return {
      msg: "Usuario borrado con exito!",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

const editarInfoUsuarioPorIdBD = async (idUsuario, body) => {
  try {
    if (body.contrasenia) {
      delete body.contrasenia;
    }

    const usuarioExiste = await UsuariosModel.findByIdAndUpdate(
      { _id: idUsuario },
      body
    );

    if (!usuarioExiste) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
      };
    }

    return {
      msg: "Usuario editado con exito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const cambiarContraseniaUsuarioBD = async (idUsuario, body) => {
  try {
    const usuarioExiste = await UsuariosModel.findById({ _id: idUsuario });
    if (!usuarioExiste) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
      };
    }

    const esCorrecta = await argon.verify(
      usuarioExiste.contrasenia,
      body.actual
    );
    if (!esCorrecta) {
      return {
        msg: "Contraseña actual incorrecta",
        statusCode: 401,
      };
    }

    const esIgual = await argon.verify(usuarioExiste.contrasenia, body.nueva);
    if (esIgual) {
      return {
        msg: "La nueva contraseña no puede ser igual a la actual!",
        statusCode: 400,
      };
    }

    usuarioExiste.contrasenia = await argon.hash(body.nueva);
    await usuarioExiste.save();
    return {
      msg: "Contraseña actualizada con exito",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

const obtenerTodosLosUsuariosDB = async () => {
  try {
    const usuarios = await UsuariosModel.find().select("-contrasenia");
    console.log(usuarios);
    return {
      usuarios,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const obtenerUnUsuarioPorIdBD = async (idUsuario) => {
  try {
    const usuario = await UsuariosModel.findOne({ _id: idUsuario });
    return {
      usuario,
      statusCode: 200,
    };
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
  editarInfoUsuarioPorIdBD,
  cambiarContraseniaUsuarioBD,
  altaLogicaUsuarioPorIdBD,
  bajaLogicaUsuarioPorIdBD,
  bajaFisicaUsuarioPorIdBD,
  obtenerTodosLosUsuariosDB,
  obtenerUnUsuarioPorIdBD,
};
