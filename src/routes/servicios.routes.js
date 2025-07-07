const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validarCampos = require("../middlewares/validarCampos.js");
const {
  obtenerTodosLosServicios,
  agregarUnServicio,
  obtenerServicioById,
  actualizarUnServicio,
  eliminarUnServicio,
  agregarImagenServicio,
} = require("../controllers/servicios.controllers");
const multerMiddlewares = require("../middlewares/multer.middlewares.js");

router.get("/", obtenerTodosLosServicios);

router.get("/:id", [
  check(
    "id",
    "ERROR. ID incorrecto. El formato no corresponde a mongoose"
  ).isMongoId(),
  validarCampos,
  obtenerServicioById,
]);

router.post(
  "/",
  [
    check("nombre", "ERROR. El campo NOMBRE está vacío").notEmpty(),
    check("precio", "ERROR. El campo PRECIO está vacío").notEmpty(),
    check("descripcion", "ERROR. El campo DESCRIPCION está vacío").notEmpty(),
  ],
  validarCampos,
  auth("admin"),
  agregarUnServicio
);
router.put(
  "/agregarImagen/:id",
  multerMiddlewares.single("foto"),
  agregarImagenServicio
);

router.put(
  "/:id",
  check(
    "id",
    "ERROR. ID incorrecto. El formato no corresponde a mongoose"
  ).isMongoId(),
  validarCampos,
  auth("admin"),
  actualizarUnServicio
);

router.delete("/:id", [
  check(
    "id",
    "ERROR. ID incorrecto. El formato no corresponde a mongoose"
  ).isMongoId(),
  validarCampos,
  auth("admin"),
  eliminarUnServicio,
]);

module.exports = router;
