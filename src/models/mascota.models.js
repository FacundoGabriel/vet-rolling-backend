const mongoose = require("mongoose");

const MascotaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    maxLength: [30, "Límite máximo 30 caracteres"],
    minLength: [3, "Límite mínimo 3 caracteres"],
    match: [
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El nombre solo puede contener letras y espacios",
    ],
  },
  especie: {
    type: String,
    enum: ["perro", "gato"],
    required: true,
  },
  raza: {
    type: String,
    trim: true,
    required: [true, "La raza es obligatoria"],
    minLength: [2, "La raza debe tener al menos 2 caracteres"],
    maxLength: [30, "La raza no puede superar los 30 caracteres"],
    match: [
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/,
      "La raza solo puede contener letras, espacios, guiones y apóstrofes",
    ],
  },
  sexo: {
    type: String,
    enum: ["macho", "hembra"],
  },
  peso: {
    type: Number,
    required: [true, "El peso es obligatorio"],
    min: [0.1, "El peso debe ser mayor"],
    validate: {
      validator: function (value) {
        if (this.especie === "gato" && value > 15) return false;
        if (this.especie === "perro" && value > 100) return false;
        return true;
      },
      message: function () {
        if (this.especie === "gato")
          return "El peso de un gato no puede superar los 15 kg";
        if (this.especie === "perro")
          return "El peso de un perro no puede superar los 100 kg";
        return "Peso inválido";
      },
    },
  },
  fechaNacimiento: {
    type: Date,
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: "La fecha de nacimiento no puede ser futura",
    },
  },
  propietario: {
    type: String,
    trim: true,
  },
  foto: {
    type: String,
    trim: true,
    default: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  },
  plan: {
    type: String,
    trim: true,
    enum: ["Primeros pasos", "Madurando", "Adultos", "Sin plan"],
    default: "Sin plan",
  },
});

MascotaSchema.index({ nombre: 1, propietario: 1 }, { unique: true });

const MascotaModels = mongoose.model("Mascota", MascotaSchema);
module.exports = MascotaModels;
