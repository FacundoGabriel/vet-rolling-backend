const mongoose = require("mongoose");

const ServicioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del servicio es obligatorio"],
      trim: true,
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, "El precio del servicio es obligatorio"],
      min: 0,
    },
    duracion: {
      type: String,
      default: "30 minutos",
    },
    disponible: {
      type: Boolean,
      default: true,
    },
    categoria: {
      type: String,
      enum: ["Medicina", "Estética", "Estudios", "Guardería", "Vacunacion"],
      required: true,
    },
    imagen: {
      type: String,
      trim: true,
      default: "url",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Servicio", ServicioSchema);
