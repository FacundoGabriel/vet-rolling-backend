const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  nombre: {
    type: String,
    enum: {
      values: ["Primeros pasos", "Madurando", "Adultos"],
      message: "El nombre debe ser 'Primeros pasos', 'Madurando' o 'Adultos'",
    },
    required: [true, "El nombre del plan es obligatorio"],
    unique: true,
  },
  descripcion: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    trim: true,
    minLength: [10, "La descripción debe tener al menos 10 caracteres"],
    maxLength: [300, "La descripción no debe superar los 300 caracteres"],
  },
  precio: {
    type: Number,
    required: [true, "El precio es obligatorio"],
    min: [0, "El precio no puede ser negativo"],
  },
  servicios: {
    type: [String],
    validate: {
      validator: function (arr) {
        return arr.every((s) => typeof s === "string" && s.trim() !== "");
      },
      message: "Todos los servicios deben ser cadenas de texto válidas",
    },
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  imagen: {
    type: String,
    default: "url",
  },
});

const PlanModels = mongoose.model("Planes", PlanSchema);
module.exports = PlanModels;
