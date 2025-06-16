const {
  obtenerProductosDelCarritoBD,
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

module.exports = {
  obtenerProductosDelCarrito,
};
