const mongoose = require("mongoose");

const PlanContratadoSchema = new mongoose.Schema({
  mascota: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mascota",
    required: true
  },
  plan: {
    type: String,
    enum: ["Primeros pasos", "Madurando", "Adultos"],
    required: true
  },
  fecha: {
    type: Date, 
    required: true
  },
  horario: {
    type: String, 
    required: true
  },
  veterinario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios", 
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",
    required: true
  },
  estado: {
    type: String,
    default: "activo"
  },
  creadoEn: {
    type: Date,
    default: Date.now
  }
});

const PlanContratadoModel = mongoose.model("PlanContratado", PlanContratadoSchema);

module.exports = PlanContratadoModel