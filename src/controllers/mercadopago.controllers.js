const {
  mercadoPagoServicesServicio,
  mercadoPagoServicesPlanes,
} = require("../services/mercadopago.services");

const pagarServiciosMP = async (req, res) => {
  const { statusCode, msg, responseMp } = await mercadoPagoServicesServicio(
    req.params.idServicio
  );
  res.status(statusCode).json({ msg, responseMp });
};
const pagarPlanesMP = async (req, res) => {
  const { statusCode, msg, responseMp } = await mercadoPagoServicesPlanes(
    req.params.idPlan
  );
  res.status(statusCode).json({ msg, responseMp });
};
module.exports = {
  pagarServiciosMP,
  pagarPlanesMP,
};
