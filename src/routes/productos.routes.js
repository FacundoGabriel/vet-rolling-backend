const { Router } = require("express");
const validarCampos = require("../middlewares/validarCampos");
const {
  obtenerTodosLosProductos,
  crearUnProducto,
  obtenerUnProductoPorId,
  actualizarUnProducto,
  borrarUnProducto,
  agregarImagenProducto,
} = require("../controllers/productos.controllers");
const { check } = require("express-validator");
const router = Router();
const auth = require("../middlewares/auth");
const multerMiddlewares = require("../middlewares/multer.middlewares");


router.get("/", obtenerTodosLosProductos);

router.get(
  "/:id",
  [
    check(
      "id",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  validarCampos,
  obtenerUnProductoPorId
);

router.post(
  "/",
  [
    check("nombre", "ERROR. El campo NOMBRE está vacío").notEmpty(),
    check("precio", "ERROR. El campo PRECIO está vacío").notEmpty(),
    check("imagen", "ERROR. El campo IMAGEN está vacío").notEmpty(),
    check("descripcion", "ERROR. El campo DESCRIPCION está vacío").notEmpty(),
  ],
  validarCampos,
  auth("admin"),
  crearUnProducto
);

 router.put("/agregarImagen/:id",
     multerMiddlewares.single("imagen"), auth("admin"), agregarImagenProducto)


router.put(
  "/:id",
  [
    check(
      "id",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  validarCampos,
  auth("admin"),
  actualizarUnProducto
);

router.delete(
  "/:id",
  [
    check(
      "id",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  validarCampos,
  auth("admin"),
  borrarUnProducto
);

module.exports = router;
