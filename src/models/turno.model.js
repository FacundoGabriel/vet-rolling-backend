const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TurnoSchema = new Schema({
  servicio: {
    type: Schema.Types.ObjectId,
    ref: "Servicio",
    required: true,
  },
  mascota: {
    type: Schema.Types.ObjectId,
    ref: "Mascota",
    required: true,
  },
  fechaHora: {
    type: Date,
    required: true,
  },
  veterinario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    required: true,
  },
  estado: {
    type: String,
    enum: ["pendiente", "activo", "finalizado"],
    default: "pendiente",
  },
  creadoEn: {
    type: Date,
    default: Date.now,
  },
});

TurnoSchema.index({ fechaHora: 1, veterinario: 1 }, { unique: true });

const TurnoModels = model("Turno", TurnoSchema);
module.exports = TurnoModels;
