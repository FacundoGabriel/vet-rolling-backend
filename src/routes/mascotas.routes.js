const { Router } = require("express");
const {
  aniadirUnaMascota,
  actualizarUnaMascota,
  obtenerTodosTusMascotas,
  eliminarUnaMascota,
  agregarImagenMascota,
} = require("../controllers/mascotas.controllers");
const router = Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validarCampos = require("../middlewares/validarCampos");
const multerMiddlewares = require("../middlewares/multer.middlewares");

router.get(
  "/tus-mascotas",
  auth(["usuario", "admin", "veterinario"]),
  obtenerTodosTusMascotas
);
router.post(
  "/aniadirMascota",
  auth(["usuario", "admin", "veterinario"]),
  [
    check("nombre", "Campo NOMBRE esta vacio").notEmpty(),
    check("raza", "Campo RAZA esta vacio").notEmpty(),
    check("sexo", "Campo SEXO vacio").notEmpty(),
    check("peso", "Campo PESO vacio").notEmpty(),
    check("fechaNacimiento", "Campo Fecha de nacimiento vacio").notEmpty(),
  ],
  validarCampos,
  aniadirUnaMascota
);
router.put(
  "/agregarImagen/:id",
  multerMiddlewares.single("foto"),
  agregarImagenMascota
);

router.put(
  "/:idMascota",
  [
    check(
      "idMascota",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  auth(["usuario", "admin", "veterinario"]),
  validarCampos,
  actualizarUnaMascota
);
router.delete(
  "/:idMascota",
  [
    check(
      "idMascota",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  validarCampos,
  auth("usuario"),
  eliminarUnaMascota
);

module.exports = router;
