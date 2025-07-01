const serviciosModel = require("../models/servicios.model.js");
const cloudinary = require("../helpers/cloudinary.config.helpers.js");

const obtenerTodosLosServiciosBD = async () => {
  try {
    const servicios = await serviciosModel.find();

    if (!servicios) {
      return {
        msg: "no hay servicios en esta clinica",
        statusCode: 404,
      };
    }
    return {
      servicios,
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: error.message,
      statusCode: 500,
    };
  }
};

const agregarUnServicioBD = async (body) => {
  try {
    const nuevoServicio = new serviciosModel(body);
    await nuevoServicio.save();
    return {
      msg: "El producto fue creado con exito",
      idServicio: nuevoServicio._id,
      statusCode: 201,
    };
  } catch (error) {
    return {
      msgError: error.message,
      statusCode: 500,
    };
  }
};
const agregarImagenServicioArray = async (idServicio, file) => {
  const servicio = await serviciosModel.findOne({ _id: idServicio });
  const imagen = await cloudinary.uploader.upload(file.path);
  servicio.imagen = imagen.secure_url;
  await servicio.save();

  return {
    msg: "Imagen agregada al servicio",
    statusCode: 200,
  };
};

const obtenerServicioByIdBD = async (idServicio) => {
  try {
    const servicio = await serviciosModel.findOne({ _id: idServicio });

    if (!servicio) {
      return {
        msg: "el servicio que deseas ver no existe",
        statusCode: 404,
      };
    }
    return {
      servicio,
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: error,
      statusCode: 500,
    };
  }
};

const actualizarUnServicioBD = async (idServicio, body) => {
  try {
    const servicioActualizado = await serviciosModel.findByIdAndUpdate(
      { _id: idServicio },
      body,
      { new: true }
    );
    if (!servicioActualizado) {
      return {
        msg: "el servicio que deseas editar no existe",
        statusCode: 404,
      };
    }
    return {
      servicioActualizado,
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: error,
      statusCode: 500,
    };
  }
};

const eliminarUnServicioBD = async (idServicio) => {
  try {
    const servicioEliminado = await serviciosModel.findByIdAndDelete({
      _id: idServicio,
    });

    if (!servicioEliminado) {
      return {
        msg: "el servicio que deseas eliminar no existe",
        statusCode: 404,
      };
    }
    return {
      msg: "El servicio fue eliminado correctamente",
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
  obtenerTodosLosServiciosBD,
  agregarUnServicioBD,
  obtenerServicioByIdBD,
  actualizarUnServicioBD,
  eliminarUnServicioBD,
  agregarImagenServicioArray,
};
