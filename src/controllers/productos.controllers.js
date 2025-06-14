const {
  crearUnProductoBD,
  obtenerTodosLosProductosBD,
  obtenerUnProductoPorIdBD,
} = require("../services/productos.services");

const crearUnProducto = async (req, res) => {
  const { statusCode, msg, error } = await crearUnProductoBD(req.body);

  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const obtenerTodosLosProductos = async (req, res) => {
  const { statusCode, productos, error } = await obtenerTodosLosProductosBD();
  try {
    res.status(statusCode).json({ productos });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const obtenerUnProductoPorId = async (req, res) => {
  const { statusCode, producto, msg } = await obtenerUnProductoPorIdBD(
    req.params.id
  );
  try {
    res.status(statusCode).json(producto ? { producto } : { msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  crearUnProducto,
  obtenerTodosLosProductos,
  obtenerUnProductoPorId,
};
