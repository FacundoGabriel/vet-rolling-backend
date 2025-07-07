const {
  mercadoPagoServicesServicio,
  mercadoPagoServicesPlanes,
  mercadoPagoServicesCarrito,
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

const pagarProductosCarrito = async (req, res) => {
  const { statusCode, msg, responseMp, error } =
    await mercadoPagoServicesCarrito(req.idCarrito);

  try {
    res.status(statusCode).json({ msg, responseMp });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  pagarServiciosMP,
  pagarPlanesMP,
  pagarProductosCarrito,
};
