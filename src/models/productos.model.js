const { Schema, model } = require("mongoose");

const ProductosSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "El nombre es obligatorio"],
    minlength: [5, "El nombre debe tener al menos 5 caracteres"],
    maxlength: [50, "El nombre no puede superar los 50 caracteres"],
    match: [
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+$/,
      "El nombre solo puede contener letras, números y espacios",
    ],
  },
  precio: {
    type: Number,
    required: [true, "El precio es obligatorio"],
    min: [0, "El precio no puede ser negativo"],
  },
  imagen: {
    type: String,
    trim: true,
    default: "https://via.placeholder.com/150",
    match: [/^https?:\/\/.+/, "La URL de la imagen debe ser válida"],
  },
  descripcion: {
    type: String,
    trim: true,
    required: [true, "La descripción es obligatoria"],
    minlength: [10, "La descripción debe tener al menos 10 caracteres"],
    maxlength: [500, "La descripción no puede superar los 500 caracteres"],
  },
  estado: {
    type: String,
    trim: true,
    enum: {
      values: ["habilitado", "deshabilitado"],
      message: "El estado debe ser 'habilitado' o 'deshabilitado'",
    },
    default: "deshabilitado",
  },
});

const ProductosModel = model("productos", ProductosSchema);
module.exports = ProductosModel;
