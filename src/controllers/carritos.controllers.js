const {
  obtenerProductosDelCarritoBD,
  agregarProductoCarritoBD,
  eliminarProductoCarritoBD,
} = require("../services/carritos.services");

const obtenerProductosDelCarrito = async (req, res) => {
  const { statusCode, productos, error } = await obtenerProductosDelCarritoBD(
    req.idCarrito
  );
  try {
    res.status(statusCode).json({ productos });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const agregarProductoCarrito = async (req, res) => {
  const { statusCode, msg, error } = await agregarProductoCarritoBD(
    req.idCarrito,
    req.params.idProducto
  );
  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const eliminarProductoCarrito = async (req, res) => {
  const { statusCode, msg, error } = await eliminarProductoCarritoBD(
    req.idCarrito,
    req.params.idProducto
  );
  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  obtenerProductosDelCarrito,
  agregarProductoCarrito,
  eliminarProductoCarrito,
};
