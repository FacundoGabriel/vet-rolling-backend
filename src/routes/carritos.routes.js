const { Router } = require("express");
const {
  obtenerProductosDelCarrito,
  agregarProductoCarrito,
} = require("../controllers/carritos.controllers");
const router = Router();

router.get("/obtenerProductos", obtenerProductosDelCarrito);

router.put("/agregarProducto/:idProducto", agregarProductoCarrito);

module.exports = router;
