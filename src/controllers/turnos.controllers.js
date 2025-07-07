const {
  crearTurnoBD,
  cancelarTurnoBD,
  cancelarTurnoComoVeterinarioBD,
  obtenerTurnosVeterinarioBD,
  obtenerTurnosBD,
  confirmarTurnoBD,
} = require("../services/turnos.services");

const crearTurno = async (req, res) => {
  const { msg, statusCode, error, idTurno } = await crearTurnoBD(
    req.body,
    req.idUsuario
  );

  try {
    res.status(statusCode).json({ msg, idTurno });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const cancelarTurno = async (req, res) => {
  const { msg, statusCode, error } = await cancelarTurnoBD(
    req.params.idTurno,
    req.idUsuario
  );

  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const cancelarTurnoComoVeterinario = async (req, res) => {
  const { msg, statusCode, error } = await cancelarTurnoComoVeterinarioBD(
    req.params.idTurno,
    req.idUsuario
  );

  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const obtenerTurnosVeterinario = async (req, res) => {
  const { turnos, statusCode, error } = await obtenerTurnosVeterinarioBD(
    req.idUsuario
  );

  try {
    res.status(statusCode).json({ turnos });
  } catch {
    res.status(statusCode).json({ error });
  }
};
const obtenerTurnos = async (req, res) => {
  const { turnos, statusCode, error } = await obtenerTurnosBD(req.idUsuario);

  try {
    res.status(statusCode).json({ turnos });
  } catch {
    res.status(statusCode).json({ error });
  }
};
const confirmarTurno = async (req, res) => {
  const { msg, statusCode, error } = await confirmarTurnoBD(req.params.idTurno);
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};
module.exports = {
  crearTurno,
  cancelarTurno,
  cancelarTurnoComoVeterinario,
  obtenerTurnosVeterinario,
  obtenerTurnos,
  confirmarTurno,
};
