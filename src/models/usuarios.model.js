const { Schema, model } = require("mongoose");

const validarNombreUsuario = (nombreUsuario) => {
  const regex = /^[A-ZÁÉÍÓÚÑa-záéíóúñ0-9_\- ]+$/;
  return regex.test(nombreUsuario);
};

const validarTelefono = (telefono) => {
  const regex = /^(\+54\s?)?(\d{2,4}[-\s]?)?\d{6,8}$/;
  return regex.test(telefono);
};

const validarPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

const UsuariosSchema = new Schema({
  nombreUsuario: {
    type: String,
    trim: true,
    required: [true, "El nombre de usuario es obligatorio"],
    unique: true,
    lowercase: true,
    maxLength: [30, "El nombre de usuario no puede tener más de 30 caracteres"],
    minLength: [3, "El nombre de usuario debe tener al menos 3 caracteres"],
    validate: {
      validator: validarNombreUsuario,
      message:
        "Solo se permiten letras, números, espacios, guiones y guiones bajos.",
    },
  },

  emailUsuario: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "El formato del email no es válido. Ejemplo: usuario@ejemplo.com",
    ],
    validate: {
      validator: function (email) {
        const dominiosComunes = [
          "gmail.com",
          "yahoo.com",
          "hotmail.com",
          "outlook.com",
        ];
        const domain = email.split("@")[1];
        return domain && domain.length > 0;
      },
      message: "El dominio del email no es válido",
    },
  },

  contrasenia: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minLength: [8, "La contraseña debe tener al menos 8 caracteres"],
    validate: {
      validator: validarPassword,
      message:
        "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número",
    },
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

  telefono: {
    type: String,
    trim: true,
    required: [true, "El teléfono es obligatorio"],
    validate: {
      validator: validarTelefono,
      message:
        "Formato de teléfono inválido. Ejemplos: +54 11 1234-5678, 011 1234-5678, 1234-5678",
    },
  },

  rol: {
    type: String,
    enum: {
      values: ["usuario", "admin", "veterinario"],
      message: "El rol debe ser 'usuario', 'admin' o 'veterinario'",
    },
    default: "usuario",
  },

  fechaReg: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function (fecha) {
        return fecha <= new Date();
      },
      message: "La fecha de registro no puede ser futura",
    },
  },

  idCarrito: {
    type: String,
    trim: true,
  },

  idFavoritos: {
    type: String,
    trim: true,
  },

  mascotas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Mascota",
    },
  ],

  foto: {
    type: String,
    trim: true,
    default:
      "https://res.cloudinary.com/dk3h8a3x4/image/upload/v1751675221/ChatGPT_Image_4_jul_2025_21_24_52_qz2dh6.png",
  },

  solicitoVeterinario: {
    type: Boolean,
    default: false,
  },

  especialidad: {
    type: String,
    trim: true,
    maxLength: [100, "La especialidad no puede tener más de 100 caracteres"],
  },

  descripcion: {
    type: String,
    trim: true,
    maxLength: [200, "La descripción no puede tener más de 200 caracteres"],
    validate: {
      validator: function (descripcion) {
        return !descripcion || descripcion.length >= 10;
      },
      message: "La descripción debe tener al menos 10 caracteres",
    },
  },
});

UsuariosSchema.methods.validarCompleto = function () {
  return this.validateSync();
};

UsuariosSchema.methods.toJSON = function () {
  const { contrasenia, __v, ...usuario } = this.toObject();
  return usuario;
};

const UsuariosModel = model("usuarios", UsuariosSchema);
module.exports = UsuariosModel;
