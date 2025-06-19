const {Schema, model} = require ("mongoose")

const UsuariosSchema = new Schema({
    nombreUsuario:{
        type: String,
        trim: true,
        required:true,
        unique: true,
        lowerCase:true,
        maxLength:[30, "Limite maximo 30 caracteres"],
        minLength:[3, "Limite minimo 3 caracteres"],    
    },
    emailUsuario:{
        type: String,
        match: [/^[a-z0-9!#$%&'*+/=?^_`{|}~\-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?$/, "Formato de email incorrecto"]
        
    },
    contrasenia:{
        type: String,
        minLength:[8, "Limite minimo 8 caracteres"],
        

    },
    estado:{
        type: String,
        trim:true,
        enum:["habilitado", "deshabilitado"],
        default:"deshabilitado"
    },
    telefono: {
    type: String,
    match: [/^(\+54\s?)?(\d{2,4}[-\s]?)?\d{6,8}$/, 'Número de teléfono inválido'],
    },
    rol: {
        type:String,
        enum:["usuario", "admin", "veterinario"],
        default:"usuario"
    },
    fechaReg:{
        type:Date,
        default: Date.now(),
    },
    idCarrito:{
        type: String,
        trim:true,
    },
    idFavoritos:{
        type:String,
        trim:true,
    },
    mascotas: [{
        type: Schema.Types.ObjectId,
        ref: "Mascota"
    }],

    foto: {
    type: String,
    trim: true,
    default: "url",
  },
    

    
}
)


UsuariosSchema.methods.toJSON= function(){
    const {contrasenia, ...usuario} = this.toObject()
    return usuario
}

const UsuariosModel = model("usuarios", UsuariosSchema)
module.exports = UsuariosModel