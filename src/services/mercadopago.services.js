const { Preference, default: MercadoPagoConfig } = require("mercadopago");
const ServiciosModel = require("../models/servicios.model.js");
const PlanModels = require("../models/plan.model.js");
const CarritosModel = require("../models/carritos.model.js");
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
          success: `${process.env.FRONT_URL}/user/mis-mascotas?success`,
          pending: `${process.env.FRONT_URL}/user/mis-mascotas?pending`,
          failure: `${process.env.FRONT_URL}/user/mis-mascotas?failure`,
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

const mercadoPagoServicesCarrito = async (idCarrito) => {
  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_API_TOKEN,
    });

    const carrito = await CarritosModel.findById(idCarrito);

    if (!carrito || carrito.productos.length === 0) {
      return {
        msg: "Carrito vacío o no encontrado",
        statusCode: 404,
      };
    }

    const items = carrito.productos.map((prod) => ({
      id: prod._id.toString(),
      title: prod.nombre,
      description: prod.descripcion,
      quantity: 1,
      currency_id: "ARS",
      unit_price: prod.precio,
    }));

    const preference = new Preference(client);

    const res = await preference.create({
      body: {
        items,
        back_urls: {
          success: `${process.env.FRONT_URL}/user/carrito?status=success`,
          pending: `${process.env.FRONT_URL}/user/carrito?status=pending`,
          failure: `${process.env.FRONT_URL}/user/carrito?status=failure`,
        },
      },
    });

    return {
      msg: "El link de pago para el carrito fue generado correctamente",
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
  mercadoPagoServicesCarrito,
};
