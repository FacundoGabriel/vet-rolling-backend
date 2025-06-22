const MascotaModels = require("../models/mascota.models");
const PlanContratadoModel = require("../models/planContratado.model");
const UsuariosModel = require("../models/usuarios.model");

const aniadirPlanBD = async (body, idUsuario) => {
  try {
    const { mascota: idMascota, plan, ...resto } = body;

    const usuarioExiste = await UsuariosModel.findById(idUsuario);
    const mascotaExiste = await MascotaModels.findById(idMascota);

    if (!usuarioExiste || !mascotaExiste) {
      return {
        msg: "Usuario o mascota no encontrado",
        statusCode: 404
      };
    }
    if(mascotaExiste.plan !== "Sin plan"){
        return{
            msg:"No puedes contratar 2 planes para una misma mascota",
            statusCode: 403
        }
    }

    const nuevoPlan = new PlanContratadoModel({
      ...resto,
      plan,
      usuario: idUsuario,
      mascota: idMascota
    });

    await nuevoPlan.save();

    mascotaExiste.plan = plan;
    await mascotaExiste.save();

    return {
      msg: "Plan añadido correctamente",
      statusCode: 201
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500
    };
  }
};

const cancelarPlanBD = async (idMascota, idUsuario) => {
  try {
    const mascotaExiste = await MascotaModels.findOne({ _id: idMascota, propietario: idUsuario });

    if (!mascotaExiste) {
      return {
        msg: "Mascota no encontrada o no te pertenece.",
        statusCode: 404
      };
    }

    if (mascotaExiste.plan === "sin plan") {
      return {
        msg: "La mascota no tiene ningún plan activo.",
        statusCode: 400
      };
    }

   
    await PlanContratadoModel.findOneAndDelete({ mascota: idMascota });

  
    mascotaExiste.plan = "Sin plan";
    await mascotaExiste.save();

    return {
      msg: "Plan cancelado correctamente.",
      statusCode: 200
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500
    };
  }
};

const cancelarPlanComoVeterinarioBD = async (idMascota, idUsuario) => {
  try {
    const planExiste = await PlanContratadoModel.findOne({ mascota: idMascota });

    if (!planExiste) {
      return {
        msg: "No se encontró un plan activo para esta mascota.",
        statusCode: 404
      };
    }

    if (String(planExiste.veterinario) !== String(idUsuario)) {
      return {
        msg: "No estás autorizado para cancelar este plan.",
        statusCode: 403
      };
    }

    await PlanContratadoModel.findByIdAndDelete(planExiste._id);

    const mascota = await MascotaModels.findById(idMascota);
    if (mascota) {
      mascota.plan = "Sin plan";
      await mascota.save();
    }

    return {
      msg: "Plan cancelado por el veterinario.",
      statusCode: 200
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500
    };
  }
};

const obtenerPlanesVeterinarioBD = async (idUsuario) => {
  try {
    const planes = await PlanContratadoModel.find({ veterinario: idUsuario })
      .populate("mascota")       
      .populate("usuario")       
      .exec();

    return {
      planes,
      statusCode: 200
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500
    };
  }
};



module.exports = { 
    aniadirPlanBD,
    cancelarPlanBD,
    cancelarPlanComoVeterinarioBD,
    obtenerPlanesVeterinarioBD
 };