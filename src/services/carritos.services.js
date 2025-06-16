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

const agregarProductoCarritoBD = async (idCarrito, idProducto) => {
  try {
    const carrito = await CarritosModel.findOne({ _id: idCarrito });
    const producto = await ProductosModel.findOne({ _id: idProducto });

    const productoExisteCarrito = carrito.productos.find(
      (prod) => prod._id.toString() === idProducto.toString()
    );
    if (productoExisteCarrito) {
      return {
        msg: "ERROR. El producto ya existe en el carrito",
        statusCode: 400,
      };
    }
    carrito.productos.push(producto);
    await carrito.save();
    return {
      msg: "El producto fue agregado correctamente",
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
  agregarProductoCarritoBD,
};
