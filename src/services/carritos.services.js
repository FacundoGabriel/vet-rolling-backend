const CarritosModel = require("../models/carritos.model");
const ProductosModel = require("../models/productos.model");

const obtenerProductosDelCarritoBD = async (idCarrito) => {
  try {
    const carrito = await CarritosModel.findById({ idCarrito });
    return {
      productos: carrito.productos,
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
  obtenerProductosDelCarritoBD,
};
