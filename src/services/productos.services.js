const ProductosModel = require("../models/productos.model");

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

const crearUnProductoBD = async (body) => {
  try {
    const nuevoProducto = new ProductosModel(body);
    await nuevoProducto.save();

    return {
      msg: "El producto fue creado con exito",
      statusCode: 201,
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
  obtenerTodosLosProductosBD,
};
