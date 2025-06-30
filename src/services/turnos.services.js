const TurnoModels = require("../models/turno.model");
const UsuariosModel = require("../models/usuarios.model");
const MascotaModels = require("../models/mascota.models");

const crearTurnoBD = async (body, idUsuario) => {
  try {
    const { mascota: idMascota, servicio, veterinario, fechaHora } = body;

    const usuarioExiste = await UsuariosModel.findById(idUsuario);
    const mascotaExiste = await MascotaModels.findById(idMascota);

    if (!usuarioExiste || !mascotaExiste) {
      return {
        msg: "Usuario o mascota no encontrada",
        statusCode: 404,
      };
    }

    const turnoVeterinarioExistente = await TurnoModels.findOne({
      fechaHora,
      veterinario,
    });

    if (turnoVeterinarioExistente) {
      return {
        msg: "Ya hay un turno reservado con ese veterinario en ese horario.",
        statusCode: 409,
      };
    }

    const turnoUsuarioExistente = await TurnoModels.findOne({
      fechaHora,
      usuario: idUsuario,
    });

    if (turnoUsuarioExistente) {
      return {
        msg: "Ya tenés otro turno agendado en ese horario.",
        statusCode: 409,
      };
    }

    const nuevoTurno = new TurnoModels({
      usuario: idUsuario,
      mascota: idMascota,
      servicio,
      veterinario,
      fechaHora,
    });

    await nuevoTurno.save();

    return {
      msg: "Turno reservado correctamente.",
      statusCode: 201,
    };
  } catch (error) {
    if (error.code === 11000) {
      return {
        msg: "Ese turno ya está ocupado para el veterinario.",
        statusCode: 409,
      };
    }
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};
const cancelarTurnoBD = async (idTurno, idUsuario) => {
  try {
    const turno = await TurnoModels.findById(idTurno).populate("mascota");

    if (!turno || String(turno.usuario) !== String(idUsuario)) {
      return {
        msg: "Turno no encontrado o no te pertenece.",
        statusCode: 404,
      };
    }

    await TurnoModels.findByIdAndDelete(idTurno);

    return {
      msg: "Turno cancelado correctamente.",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

const cancelarTurnoComoVeterinarioBD = async (idTurno, idVeterinario) => {
  try {
    const turno = await TurnoModels.findById(idTurno);

    if (!turno) {
      return {
        msg: "No se encontró el turno.",
        statusCode: 404,
      };
    }

    if (String(turno.veterinario) !== String(idVeterinario)) {
      return {
        msg: "No estás autorizado para cancelar este turno.",
        statusCode: 403,
      };
    }

    await TurnoModels.findByIdAndDelete(idTurno);

    return {
      msg: "Turno cancelado por el veterinario.",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

const obtenerTurnosVeterinarioBD = async (idVeterinario) => {
  try {
    const turnos = await TurnoModels.find({ veterinario: idVeterinario })
      .populate("mascota")
      .populate("usuario")
      .populate("servicio")
      .sort({ fechaHora: 1 })
      .exec();

    return {
      turnos,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};
const obtenerTurnosBD = async (idUsuario) => {
  try {
    const turnos = await TurnoModels.find({ usuario: idUsuario })
      .populate("mascota")
      .populate("veterinario")
      .populate("servicio")
      .sort({ fechaHora: 1 })
      .exec();

    return {
      turnos,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  crearTurnoBD,
  cancelarTurnoBD,
  cancelarTurnoComoVeterinarioBD,
  obtenerTurnosVeterinarioBD,
  obtenerTurnosBD,
};
