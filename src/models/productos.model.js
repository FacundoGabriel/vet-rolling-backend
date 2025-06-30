const { Schema, model } = require("mongoose");

const ProductosSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    lowerCase: true,
    unique: true,
    maxLength: 50,
    minLength: 5,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    trim: true,
    default: "url",
  },
  descripcion: {
    type: String,
    trim: true,
    required: true,
  },
  estado: {
    type: String,
    trim: true,
    enum: ["habilitado", "deshabilitado"],
    default: "deshabilitado",
  },
});

const ProductosModel = model("productos", ProductosSchema);
module.exports = ProductosModel;
