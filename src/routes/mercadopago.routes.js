const { Router } = require("express");
const {
  pagarServiciosMP,
  pagarPlanesMP,
} = require("../controllers/mercadopago.controllers");
const router = Router();

router.post("/pagoMercadoPagoServicio/:idServicio", pagarServiciosMP);
router.post("/pagoMercadoPagoPlan/:idPlan", pagarPlanesMP);

module.exports = router;
