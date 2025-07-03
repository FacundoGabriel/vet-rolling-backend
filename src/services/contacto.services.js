const { contactoFormulario } = require("../utils/mensajes.nodemailer.utils");

const procesarConsultaBD = async (nombre, email, mensaje) => {
  try {
    await contactoFormulario(nombre, email, mensaje);
    return {
      msg: "Consulta enviada con éxito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  procesarConsultaBD,
};
