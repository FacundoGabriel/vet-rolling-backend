const {
  obtenerTodosLosServiciosBD,
  agregarUnServicioBD,
  obtenerServicioByIdBD,
  actualizarUnServicioBD,
  eliminarUnServicioBD,
  agregarImagenServicioArray,
} = require("../services/servicios.services");

const obtenerTodosLosServicios = async (req, res) => {
  const { statusCode, servicios, msg } = await obtenerTodosLosServiciosBD();
  try {
    res.status(statusCode).json({ servicios });
  } catch (error) {
    res.status(statusCode).json({ msg });
  }
};

const agregarUnServicio = async (req, res) => {
  try {
    const { statusCode, msg, msgError, idServicio } = await agregarUnServicioBD(
      req.body
    );
    return res.status(statusCode).json({ msg, idServicio });
  } catch {
    return res.status(500).json({ msgError });
  }
};
const agregarImagenServicio = async (req, res) => {
  const { statusCode, msg } = await agregarImagenServicioArray(
    req.params.id,
    req.file
  );
  res.status(statusCode).json({ msg });
};

const obtenerServicioById = async (req, res) => {
  const { statusCode, servicio, msg } = await obtenerServicioByIdBD(
    req.params.id
  );
  try {
    if (statusCode === 404) {
      return res.status(statusCode).json({ msg });
    }
    res.status(statusCode).json({ servicio });
  } catch {
    res.status(statusCode).json({ msg });
  }
};

const actualizarUnServicio = async (req, res) => {
  const { statusCode, servicioActualizado, msg } = await actualizarUnServicioBD(
    req.params.id,
    req.body
  );

  try {
    if (statusCode === 404) {
      res.status(statusCode).json({ msg });
    }
    res.status(statusCode).json({ servicioActualizado });
  } catch {
    res.status(statusCode).json(error);
  }
};

const eliminarUnServicio = async (req, res) => {
  const { statusCode, msg, error } = await eliminarUnServicioBD(req.params.id);
  try {
    if (statusCode === 404) {
      res.status(statusCode).json({ msg });
    }
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  obtenerTodosLosServicios,
  agregarUnServicio,
  obtenerServicioById,
  actualizarUnServicio,
  eliminarUnServicio,
  agregarImagenServicio,
};
