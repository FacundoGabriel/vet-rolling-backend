const { Router } = require("express");
const {
  obtenerProductosDelCarrito,
  agregarProductoCarrito,
  eliminarProductoCarrito,
  vaciarCarrito,
} = require("../controllers/carritos.controllers");
const validarCampos = require("../middlewares/validarCampos");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");
const router = Router();

router.get(
  "/obtenerProductos",
  auth(["usuario", "admin"]),
  obtenerProductosDelCarrito
);

router.put(
  "/agregarProducto/:idProducto",
  [
    check(
      "idProducto",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  auth(["usuario", "admin"]),
  validarCampos,
  agregarProductoCarrito
);

router.put(
  "/eliminarProducto/:idProducto",
  [
    check(
      "idProducto",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  auth(["usuario", "admin"]),
  validarCampos,
  eliminarProductoCarrito
);

router.put(
  "/vaciarCarrito",
  auth(["usuario", "admin"]),
  validarCampos,
  vaciarCarrito
);

module.exports = router;
