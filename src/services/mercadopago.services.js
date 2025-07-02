const { Preference, default: MercadoPagoConfig } = require("mercadopago");
const ServiciosModel = require("../models/servicios.model.js");
const PlanModels = require("../models/plan.model.js");
const mercadoPagoServicesServicio = async (idServicio) => {
  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_API_TOKEN,
    });

    const servicio = await ServiciosModel.findById(idServicio);

    if (!servicio) {
      return {
        msg: "Servicio no encontrado",
        statusCode: 404,
      };
    }

    const preference = new Preference(client);

    const res = await preference.create({
      body: {
        items: [
          {
            id: servicio._id.toString(),
            title: servicio.nombre,
            description: servicio.descripcion,
            quantity: 1,
            currency_id: "ARS",
            unit_price: servicio.precio,
          },
        ],
        back_urls: {
          success: `${process.env.FRONT_URL}/confirmar-turno?status=success`,
          pending: `${process.env.FRONT_URL}/confirmar-turno?status=pending`,
          failure: `${process.env.FRONT_URL}/confirmar-turno?status=failure`,
        },
        auto_return: "approved",
      },
    });

    return {
      msg: "Preferencia de pago creada con éxito",
      responseMp: {
        id: res.id,
        init_point: res.init_point,
      },
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error en MercadoPago:", error);
    return {
      error,
      statusCode: 500,
    };
  }
};
const mercadoPagoServicesPlanes = async (idPlan) => {
  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_API_TOKEN,
    });

    const plan = await PlanModels.findById(idPlan);

    if (!plan) {
      return {
        msg: "Plan no encontrado",
        statusCode: 404,
      };
    }

    const preference = new Preference(client);

    const res = await preference.create({
      body: {
        items: [
          {
            id: plan._id.toString(),
            title: plan.nombre,
            description: plan.descripcion,
            quantity: 1,
            currency_id: "ARS",
            unit_price: plan.precio,
          },
        ],
        back_urls: {
          success: `${process.env.FRONT_URL}/confirmar-pago?success`,
          pending: `${process.env.FRONT_URL}/confirmar-pago?pending`,
          failure: `${process.env.FRONT_URL}/confirmar-pago?failure`,
        },
      },
    });

    return {
      msg: "Preferencia de pago creada con éxito",
      responseMp: {
        id: res.id,
        init_point: res.init_point,
      },
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error en MercadoPago:", error);
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  mercadoPagoServicesServicio,
  mercadoPagoServicesPlanes,
};
