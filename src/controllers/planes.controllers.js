const { aniadirPlanBD, cancelarPlanBD, cancelarPlanComoVeterinarioBD, obtenerPlanesVeterinarioBD } = require("../services/planes.services")

const aniadirPlan = async (req, res) => {
  const { msg, statusCode, error } = await aniadirPlanBD(req.body, req.idUsuario);
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const cancelarPlan = async (req, res) => {
  const { msg, statusCode, error } = await cancelarPlanBD(req.params.idMascota, req.idUsuario);
 try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
 };

 const cancelarPlanComoVeterinario = async (req, res) => {
  const { msg, statusCode, error } = await cancelarPlanComoVeterinarioBD(req.params.idMascota, req.idUsuario);
 try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
 };

 const obtenerPlanesVeterinario = async (req, res) => {
  const { planes, statusCode, error } = await obtenerPlanesVeterinarioBD(req.idUsuario);

   try {
    res.status(statusCode).json({ planes });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
    aniadirPlan,
    cancelarPlan,
    cancelarPlanComoVeterinario,
    obtenerPlanesVeterinario
}