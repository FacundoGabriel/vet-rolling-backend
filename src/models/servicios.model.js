const mongoose = require("mongoose");

const ServicioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del servicio es obligatorio"],
      trim: true,
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [50, "El nombre no debe superar los 50 caracteres"],
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
        "El nombre solo puede contener letras y espacios",
      ],
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
      minlength: [10, "La descripción debe tener al menos 10 caracteres"],
      maxlength: [300, "La descripción no debe superar los 300 caracteres"],
    },
    precio: {
      type: Number,
      required: [true, "El precio del servicio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    duracion: {
      type: String,
      default: "30 minutos",
      match: [
        /^[0-9]{1,2} (minutos|horas)$/,
        "La duración debe tener el formato '30 minutos' o '2 horas'",
      ],
    },
    disponible: {
      type: Boolean,
      default: true,
    },
    categoria: {
      type: String,
      enum: {
        values: ["Medicina", "Estética", "Estudios", "Guardería", "Vacunacion"],
        message:
          "La categoría debe ser una de: Medicina, Estética, Estudios, Guardería, Vacunacion",
      },
      required: [true, "La categoría es obligatoria"],
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
