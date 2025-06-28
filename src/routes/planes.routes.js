const { Router } = require("express");
const auth = require("../middlewares/auth");
const {
  aniadirPlan,
  cancelarPlan,
  cancelarPlanComoVeterinario,
  obtenerPlanesVeterinario,
  crearPlan,
  obtenerPlanes,
  obtenerUnPlan,
  editarPlan,
  eliminarPlan,
  agregarImagenPlan,
} = require("../controllers/planes.controllers");
const validarCampos = require("../middlewares/validarCampos");
const { check } = require("express-validator");
const router = Router();
const multerMiddlewares = require("../middlewares/multer.middlewares");

router.post(
  "/crearPlan",
  [
    check("nombre", "Campo NOMBRE esta vacio").notEmpty(),
    check("descripcion", "Campo DESCRIPCION esta vacio").notEmpty(),
    check("precio", "Campo PRECIO esta vacio").notEmpty(),
    check("servicios", "Campo SERVICIOS vacio").isArray({ min: 1 }),
  ],
  validarCampos,
  auth("admin"),
  crearPlan
);
router.put(
  "/agregarImagen/:id",
  multerMiddlewares.single("imagen"),
  auth("admin"),
  agregarImagenPlan
);

router.get("/", obtenerPlanes);
router.get(
  "/obtener-un-plan/:idPlan",
  [
    check(
      "idPlan",
      "ID incorrecto. Formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  validarCampos,
  obtenerUnPlan
);
router.put(
  "/editarPlan/:idPlan",
  [
    check("nombre", "Campo NOMBRE esta vacio").notEmpty(),
    check("descripcion", "Campo DESCRIPCION esta vacio").notEmpty(),
    check("precio", "Campo PRECIO esta vacio").notEmpty(),
    check("servicios", "Campo SERVICIOS vacio").isArray({ min: 1 }),
    check(
      "idPlan",
      "ID incorrecto. Formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  validarCampos,
  auth("admin"),
  editarPlan
);
router.delete(
  "/eliminarPlan/:idPlan",
  [
    check(
      "idPlan",
      "ID incorrecto. Formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  validarCampos,
  auth("admin"),
  eliminarPlan
);

router.post(
  "/aniadirPlan",
  [
    check("mascota", "Campo MASCOTA esta vacio").notEmpty(),
    check("veterinario", "Campo VETERINARIO esta vacio").notEmpty(),
    check("fecha", "Campo FECHA esta vacio").notEmpty(),
    check("horario", "Campo HORA esta vacio").notEmpty(),
  ],
  validarCampos,
  auth(["usuario", "admin", "veterinario"]),
  aniadirPlan
);
router.delete(
  "/cancelarPlan/:idMascota",
  [
    check(
      "idMascota",
      "ID incorrecto. Formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  validarCampos,
  auth("usuario"),
  cancelarPlan
);
router.delete(
  "/cancelarPlanVet/:idMascota",
  [
    check(
      "idMascota",
      "ID incorrecto. Formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  validarCampos,
  auth("veterinario"),
  cancelarPlanComoVeterinario
);
router.get(
  "/planes-veterinario",
  auth("veterinario"),
  obtenerPlanesVeterinario
);

module.exports = router;
