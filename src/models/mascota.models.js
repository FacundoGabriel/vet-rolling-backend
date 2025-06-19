const mongoose = require('mongoose');

const MascotaSchema = new mongoose.Schema({
  nombre: { 
        type: String,
        trim: true,
        required:true,
        unique: true,
        lowerCase:true,
        maxLength:[30, "Limite maximo 30 caracteres"],
        minLength:[3, "Limite minimo 3 caracteres"],    
    },
   especie: {
    type: String,
    enum: ['perro', 'gato'],
    required: true
  },
  raza: {
    type: String,
  },
  sexo: {
     type: String,
      enum: ['macho', 'hembra']
     },
  peso:{
    type: Number
} ,
  fechaNacimiento: {
    type:String
},

  propietario: {
    type: String,
    trim:true
  },
    foto: {
    type: String,
    trim: true,
    default: "url",
  },

  
  
  
});

const MascotaModels = mongoose.model('Mascota', MascotaSchema);
module.exports = MascotaModels
