const cron = require("node-cron");
const PlanContratadoModel = require("../models/planContratado.model");
const TurnoModel = require("../models/turno.model");

const iniciarLimpiezasAutomáticas = () => {
  cron.schedule("*/10 * * * *", async () => {
    const hace15Min = new Date(Date.now() - 15 * 60 * 1000);
    try {
      const resultado = await PlanContratadoModel.deleteMany({
        estado: "pendiente",
        creadoEn: { $lt: hace15Min },
      });
      if (resultado.deletedCount > 0) {
        console.log(
          `🗑️ ${resultado.deletedCount} planes pendientes eliminados`
        );
      }
    } catch (error) {
      console.error("❌ Error al limpiar planes:", error.message);
    }
  });

  cron.schedule("*/10 * * * *", async () => {
    const hace15Min = new Date(Date.now() - 15 * 60 * 1000);
    try {
      const resultado = await TurnoModel.deleteMany({
        estado: "pendiente",
        creadoEn: { $lt: hace15Min },
      });
      if (resultado.deletedCount > 0) {
        console.log(
          `🧼 ${resultado.deletedCount} turnos pendientes eliminados`
        );
      }
    } catch (error) {
      console.error("❌ Error al limpiar turnos:", error.message);
    }
  });

  console.log("🕒 Limpiezas automáticas programadas cada 10 minutos");
};
const actualizarTurnosFinalizados = () => {
  cron.schedule("*/10 * * * *", async () => {
    const ahora = new Date();

    try {
      const resultado = await TurnoModel.updateMany(
        {
          estado: "activo",
          fechaHora: { $lt: ahora },
        },
        {
          $set: { estado: "finalizado" },
        }
      );

      if (resultado.modifiedCount > 0) {
        console.log(
          `✅ ${resultado.modifiedCount} turnos marcados como finalizados.`
        );
      }
    } catch (error) {
      console.error("❌ Error al actualizar turnos:", error.message);
    }
  });
};

module.exports = { iniciarLimpiezasAutomáticas, actualizarTurnosFinalizados };
