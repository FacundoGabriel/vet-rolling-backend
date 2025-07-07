const CarritosModel = require("../models/carritos.model");
const ProductosModel = require("../models/productos.model");

const obtenerProductosDelCarritoBD = async (idCarrito) => {
  try {
    const carrito = await CarritosModel.findOne({ _id: idCarrito });
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

const eliminarProductoCarritoBD = async (idCarrito, idProducto) => {
  try {
    const carrito = await CarritosModel.findOne({ _id: idCarrito });
    const productoIndex = carrito.productos.findIndex(
      (prod) => prod._id.toString() === idProducto.toString()
    );
    if (productoIndex < 0) {
      return {
        msg: "ERROR. El producto que intenta eliminar no existe",
        statusCode: 404,
      };
    }
    carrito.productos.splice(productoIndex, 1);
    await carrito.save();
    return {
      msg: "Producto eliminado del carrito correctamente",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const vaciarCarritoBD = async (idUsuario) => {
  try {
    await Carrito.updateOne(
      { usuario: idUsuario },
      { $set: { productos: [] } }
    );
    return {
      statusCode: 200,
      msg: "Carrito vaciado correctamente",
    };
  } catch (error) {
    return {
      statusCode: 500,
      error,
    };
  }
};

module.exports = {
  obtenerProductosDelCarritoBD,
  agregarProductoCarritoBD,
  eliminarProductoCarritoBD,
  vaciarCarritoBD,
};
