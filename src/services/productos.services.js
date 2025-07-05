const ProductosModel = require("../models/productos.model");
const cloudinary = require("../helpers/cloudinary.config.helpers");

const obtenerTodosLosProductosBD = async () => {
  try {
    const productos = await ProductosModel.find();
    return {
      productos,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const obtenerUnProductoPorIdBD = async (idProducto) => {
  try {
    const producto = await ProductosModel.findOne({ _id: idProducto });
    if (!producto) {
      return {
        msg: "ERROR. El producto no existe",
        statusCode: 404,
      };
    }
    return {
      producto,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const crearUnProductoBD = async (body) => {
  try {
    const nuevoProducto = new ProductosModel(body);
    await nuevoProducto.save();

    return {
      msg: "El producto fue creado con exito",
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

const agregarImagenProductoArray = async (idProducto, file) => {
  const producto = await ProductosModel.findOne({ _id: idProducto });
  const imagen = await cloudinary.uploader.upload(file.path);
  producto.imagen = imagen.secure_url;
  await producto.save();

  return {
    mensaje: "Imagen agregada al producto",
    statusCode: 200,
  };
};

const actualizarUnProductoBD = async (idProducto, body) => {
  try {
    await ProductosModel.findByIdAndUpdate({ _id: idProducto }, body);
    return {
      msg: "El producto se actualizó correctamente",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const borrarUnProductoBD = async (idProducto) => {
  try {
    const producto = await ProductosModel.findOne({ _id: idProducto });
    if (!producto) {
      return {
        msg: "ERROR. El producto no existe",
        statusCode: 404,
      };
    }

    await ProductosModel.findByIdAndDelete({ _id: idProducto });
    return {
      msg: "El producto se eliminó correctamente",
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
  crearUnProductoBD,
  agregarImagenProductoArray,
  obtenerTodosLosProductosBD,
  obtenerUnProductoPorIdBD,
  actualizarUnProductoBD,
  borrarUnProductoBD,
};
