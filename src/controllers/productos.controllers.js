const {
  crearUnProductoBD,
  obtenerTodosLosProductosBD,
  obtenerUnProductoPorIdBD,
  actualizarUnProductoBD,
  borrarUnProductoBD,
  agregarImagenProductoArray,
} = require("../services/productos.services");

const crearUnProducto = async (req, res) => {
  const { statusCode, msg, error } = await crearUnProductoBD(req.body);

  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const agregarImagenProducto = async (req,res) =>{
    const {statusCode, msg} = await agregarImagenProductoArray(req.params.id, req.file)
    res.status(statusCode).json({msg})
}

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

const actualizarUnProducto = async (req, res) => {
  const { statusCode, msg, error } = await actualizarUnProductoBD(
    req.params.id,
    req.body
  );
  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const borrarUnProducto = async (req, res) => {
  const { statusCode, msg, error } = await borrarUnProductoBD(req.params.id);
  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  crearUnProducto,
  agregarImagenProducto,
  obtenerTodosLosProductos,
  obtenerUnProductoPorId,
  actualizarUnProducto,
  borrarUnProducto,
};
