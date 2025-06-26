const {
  obtenerVeterinariosBD,
  aprobarVeterinarioBD,
  registrarVeterinarioBD,
  deshabilitarVeterinarioBD,
} = require("../services/veterinarios.services");

const registrarVeterinario = async (req, res) => {
  const { msg, statusCode, error } = await registrarVeterinarioBD(req.body);

  try {
    res.status(statusCode).json({ msg, statusCode });
  } catch {
    res.status(statusCode).json(error);
  }
};

const obtenerVeterinarios = async (req, res) => {
  const { veterinarios, statusCode, error } = await obtenerVeterinariosBD();
  try {
    res.status(statusCode).json({ veterinarios });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const aprobarVeterinario = async (req, res) => {
  const { msg, statusCode, error } = await aprobarVeterinarioBD(
    req.params.idUsuario
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};
const deshabilitarVeterinario = async (req, res) => {
  const { msg, statusCode, error } = await deshabilitarVeterinarioBD(
    req.params.idUsuario
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  registrarVeterinario,
  obtenerVeterinarios,
  aprobarVeterinario,
  deshabilitarVeterinario,
};
