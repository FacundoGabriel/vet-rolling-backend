const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  nombre: {
    type: String,
    enum: ["Primeros pasos", "Madurando", "Adultos"],
    required: true,
    unique: true
  },
  descripcion: {
    type: String
},
    
  precio: {
    type: Number
},
  servicios: [String], 
  disponible: {
    type: Boolean,
    default: true
  },
  imagen:{
    type:String,
    default: "url"
  }

  
});

const PlanModels = mongoose.model("Planes", PlanSchema);
module.exports = PlanModels