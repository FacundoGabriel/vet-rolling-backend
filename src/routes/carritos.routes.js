const { Router } = require("express");
const {
  obtenerProductosDelCarrito,
  agregarProductoCarrito,
  eliminarProductoCarrito,
} = require("../controllers/carritos.controllers");
const router = Router();

router.get("/obtenerProductos", obtenerProductosDelCarrito);

router.put("/agregarProducto/:idProducto", agregarProductoCarrito);

router.put("/eliminarProducto/:idProducto", eliminarProductoCarrito);

module.exports = router;
