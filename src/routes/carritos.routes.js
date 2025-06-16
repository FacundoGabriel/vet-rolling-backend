const { Router } = require("express");
const {
  obtenerProductosDelCarrito,
} = require("../controllers/carritos.controllers");
const router = Router();

router.get("/obtenerProductos", obtenerProductosDelCarrito);

module.exports = router;
