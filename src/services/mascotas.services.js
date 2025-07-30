const MascotaModels = require("../models/mascota.models");
const UsuariosModel = require("../models/usuarios.model");
const cloudinary = require("../helpers/cloudinary.config.helpers");
const TurnoModels = require("../models/turno.model");
const PlanContratadoModel = require("../models/planContratado.model");

const obtenerTodosTusMascotasBD = async (idUsuario) => {
  try {
    const usuarioExiste = await UsuariosModel.findById(idUsuario).populate(
      "mascotas"
    );

    if (!usuarioExiste) {
      return {
        msg: "No puedes ver las mascotas de un usuario que no existe",
        statusCode: 404,
      };
    }

    return {
      mascotas: usuarioExiste.mascotas,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};
const aniadirUnaMascotaBD = async (body, idUsuario) => {
  try {
    const nuevaMascota = new MascotaModels(body);
    const nuevoUsuario = await UsuariosModel.findOne({ _id: idUsuario });

    nuevaMascota.propietario = idUsuario;

    await nuevaMascota.save();

    nuevoUsuario.mascotas.push(nuevaMascota._id);

    await nuevoUsuario.save();

    return {
      msg: "Mascota añadida con exito",
      statusCode: 200,
      idMascota: nuevaMascota._id,
    };
  } catch (error) {
    if (error.code === 11000) {
      return {
        msg: `No puedes tener dos mascotas con el mismo nombre.`,
        statusCode: 409,
      };
    }

    return {
      msg: "Error en el servidor",
      error,
      statusCode: 500,
    };
  }
};

const agregarImagenMascotaArray = async (idPlan, file) => {
  const mascota = await MascotaModels.findOne({ _id: idPlan });
  const imagen = await cloudinary.uploader.upload(file.path);
  mascota.foto = imagen.secure_url;
  await mascota.save();

  return {
    msg: "Imagen agregada a la mascota",
    statusCode: 200,
  };
};
const actualizarUnaMascotaBD = async (idMascota, body) => {
  try {
    const mascota = await MascotaModels.findByIdAndUpdate(
      { _id: idMascota },
      body
    );
    if (!mascota) {
      return {
        msg: "Mascota no encontrada",
        statusCode: 404,
      };
    }

    return {
      msg: "Mascota Editada con exito",
      statusCode: 200,
    };
  } catch (error) {
    if (error.code === 11000) {
      return {
        msg: `No puedes tener dos mascotas con el mismo nombre.`,
        statusCode: 409,
      };
    }
    return {
      error,
      statusCode: 500,
    };
  }
};

const eliminarUnaMascotaBD = async (idMascota, idUsuario) => {
  try {
    const mascotaExiste = await MascotaModels.findOne({ _id: idMascota });
    const turnoMascota = await TurnoModels.findOne({ mascota: idMascota });
    const planMascota = await PlanContratadoModel.findOne({
      mascota: idMascota,
    });
    if (turnoMascota) {
      return {
        msg: "No se puede eliminar la mascota porque tiene un turno asociado.",
        statusCode: 400,
      };
    }
    if (planMascota) {
      return {
        msg: "No se puede eliminar la mascota porque tiene un plan contratado.",
        statusCode: 400,
      };
    }

    if (!mascotaExiste) {
      return {
        msg: "La mascota que intentás eliminar no existe.",
        statusCode: 404,
      };
    }

    if (mascotaExiste.propietario.toString() !== idUsuario) {
      return {
        msg: "No tenés permiso para eliminar esta mascota.",
        statusCode: 403,
      };
    }

    await MascotaModels.findByIdAndDelete(idMascota);

    await UsuariosModel.findByIdAndUpdate(idUsuario, {
      $pull: { mascotas: idMascota },
    });

    return {
      msg: "Mascota eliminada con éxito.",
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
  obtenerTodosTusMascotasBD,
  aniadirUnaMascotaBD,
  agregarImagenMascotaArray,
  actualizarUnaMascotaBD,
  eliminarUnaMascotaBD,
};
