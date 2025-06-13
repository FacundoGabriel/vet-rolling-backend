const { Router } = require("express");
const validarCampos = require("../middlewares/validarCampos");
const {
  obtenerTodosLosProductos,
  crearUnProducto,
} = require("../controllers/productos.controllers");
const { check } = require("express-validator");
const router = Router();

router.get("/", obtenerTodosLosProductos);

router.post(
  "/",
  [
    check("nombre", "ERROR. El campo NOMBRE está vacío").notEmpty(),
    check("precio", "ERROR. El campo PRECIO está vacío").notEmpty(),
    check("imagen", "ERROR. El campo IMAGEN está vacío").notEmpty(),
    check("descripcion", "ERROR. El campo DESCRIPCION está vacío").notEmpty(),
  ],
  validarCampos,
  crearUnProducto
);

module.exports = router;
