const { aniadirPlanBD, cancelarPlanBD, cancelarPlanComoVeterinarioBD, obtenerPlanesVeterinarioBD, crearPlanBD, obtenerPlanesBD, obtenerUnPlanBD, editarPlanBD, eliminarPlanBD, agregarImagenPlanArray } = require("../services/planes.services")

const crearPlan = async (req, res) => {
  const { msg, statusCode, error } = await crearPlanBD(req.body, req.idUsuario);
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const agregarImagenPlan = async (req,res) =>{
    const {statusCode, msg} = await agregarImagenPlanArray(req.params.id, req.file)
    res.status(statusCode).json({msg})
}

const obtenerPlanes = async (req, res) => {
  const { planes, statusCode, error } = await obtenerPlanesBD();

   try {
    res.status(statusCode).json({ planes });
  } catch {
    res.status(statusCode).json({ error });
  }
};
const obtenerUnPlan = async (req, res) => {
  const { plan, statusCode, error } = await obtenerUnPlanBD(req.params.idPlan);

   try {
    res.status(statusCode).json({ plan });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const editarPlan = async(req, res) => {
const {msg, statusCode, error} = await editarPlanBD(req.params.idPlan)
 try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
}
const eliminarPlan = async(req, res) => {
const {msg, statusCode, error} = await eliminarPlanBD(req.params.idPlan)
 try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
}
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
    crearPlan,
    agregarImagenPlan,
    obtenerPlanes,
    obtenerUnPlan,
    editarPlan,
    eliminarPlan,
    aniadirPlan,
    cancelarPlan,
    cancelarPlanComoVeterinario,
    obtenerPlanesVeterinario,
    
}