const { Router } = require("express");
const {
  pagarServiciosMP,
  pagarPlanesMP,
  pagarProductosCarrito,
} = require("../controllers/mercadopago.controllers");
const auth = require("../middlewares/auth");
const router = Router();

router.post("/pagoMercadoPagoServicio/:idServicio", pagarServiciosMP);
router.post("/pagoMercadoPagoPlan/:idPlan", pagarPlanesMP);
router.post(
  "/pagoMercadoPagoCarrito",
  auth(["usuario", "admin"]),
  pagarProductosCarrito
);

module.exports = router;
