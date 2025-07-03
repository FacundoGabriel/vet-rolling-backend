const { procesarConsultaBD } = require("../services/contacto.services");

const procesarConsulta = async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  try {
    const { statusCode, msg } = await procesarConsultaBD(
      nombre,
      email,
      mensaje
    );

    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  procesarConsulta,
};
