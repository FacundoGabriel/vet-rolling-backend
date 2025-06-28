const CarritosModel = require("../models/carritos.model");
const FavoritosModel = require("../models/favoritos.model");
const UsuariosModel = require("../models/usuarios.model");
const {
  cuentaHabilitadaVeterinario,
} = require("../utils/mensajes.nodemailer.utils");
const argon = require("argon2");

const registrarVeterinarioBD = async (body) => {
  try {
    const { contrasenia, especialidad, descripcion, ...resto } = body;

    const nuevoUsuario = new UsuariosModel({
      ...resto,
      rol: "usuario",
      estado: "deshabilitado",
      solicitoVeterinario: true,
      especialidad,
      descripcion,
      contrasenia: await argon.hash(contrasenia),
    });

    const nuevoCarrito = new CarritosModel({ idUsuario: nuevoUsuario._id });
    const nuevoFavoritos = new FavoritosModel({ idUsuario: nuevoUsuario._id });

    nuevoUsuario.idCarrito = nuevoCarrito._id;
    nuevoUsuario.idFavoritos = nuevoFavoritos._id;

    await nuevoCarrito.save();
    await nuevoFavoritos.save();
    await nuevoUsuario.save();

    return {
      msg: "Registro enviado. Esperá a que el administrador habilite tu cuenta.",
      statusCode: 201,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

const obtenerVeterinariosBD = async () => {
  try {
    const veterinarios = await UsuariosModel.find({
      rol: "veterinario",
      estado: "habilitado",
    }).select(
      "nombreUsuario telefono descripcion especialidad foto emailUsuario"
    );

    return {
      veterinarios,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const aprobarVeterinarioBD = async (idUsuario) => {
  try {
    const usuario = await UsuariosModel.findById(idUsuario);

    if (!usuario) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
      };
    }

    if (!usuario.solicitoVeterinario) {
      return {
        msg: "Este usuario no solicitó ser veterinario",
        statusCode: 400,
      };
    }

    usuario.estado = "habilitado";
    usuario.rol = "veterinario";

    await usuario.save();

    await cuentaHabilitadaVeterinario(
      usuario.emailUsuario,
      usuario.nombreUsuario
    );

    return {
      msg: "Veterinario aprobado correctamente y correo enviado",
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

const deshabilitarVeterinarioBD = async (idUsuario) => {
  try {
    const usuario = await UsuariosModel.findById(idUsuario);

    if (!usuario) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
      };
    }

    if (!usuario.solicitoVeterinario) {
      return {
        msg: "Este usuario no solicitó ser veterinario",
        statusCode: 400,
      };
    }

    usuario.estado = "deshabilitado";
    usuario.rol = "usuario";

    await usuario.save();

    return {
      msg: "Veterinario deshabilitado correctamente",
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
  registrarVeterinarioBD,
  obtenerVeterinariosBD,
  aprobarVeterinarioBD,
  deshabilitarVeterinarioBD,
};
