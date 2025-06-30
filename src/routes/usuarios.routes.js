const { Router } = require("express");
const {
  registrarUsuario,
  iniciarSesionUsuario,
  altaLogicaUsuarioPorId,
  bajaLogicaUsuarioPorId,
  bajaFisicaUsuarioPorId,
  editarInfoUsuarioPorId,
  cambiarContraseniaUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  agregarImagenUsuario,
  recuperarContraseniaUsuario,
  cambiarContraseniaRecuperacion,
} = require("../controllers/usuarios.controllers");
const router = Router();
const { check } = require("express-validator");
const validarCampos = require("../middlewares/validarCampos");
const auth = require("../middlewares/auth");
const multerMiddlewares = require("../middlewares/multer.middlewares");

router.post(
  "/registro",
  [
    check("nombreUsuario", "Campo USUARIO esta vacio").notEmpty(),
    check("emailUsuario", "Campo EMAIL vacio").notEmpty(),
    check("telefono", "Campo TELEFONO vacio").notEmpty(),
    check("contrasenia", "Campo CONTRASEÑA vacio").notEmpty(),
    check(
      "contrasenia",
      "ERROR. caracteres soportados solo entre 8 y 40"
    ).isLength({ min: 8 }, { max: 40 }),
  ],
  validarCampos,
  registrarUsuario
);

router.post(
  "/inicio-sesion",
  [
    check("emailUsuario", "Campo EMAIL vacio").notEmpty(),
    check("contrasenia", "Campo CONTRASEÑA vacio").notEmpty(),
    check(
      "contrasenia",
      "ERROR. caracteres soportados solo entre 8 y 40"
    ).isLength({ min: 8 }, { max: 40 }),
  ],
  validarCampos,
  iniciarSesionUsuario
);
router.put(
  "/agregarImagen/:id",
  multerMiddlewares.single("foto"),
  agregarImagenUsuario
);
router.put(
  "/habilitar/:id",
  [check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()],
  validarCampos,
  altaLogicaUsuarioPorId
);
router.put(
  "/deshabilitar/:id",
  [check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()],
  validarCampos,
  bajaLogicaUsuarioPorId
);
router.delete(
  "/:id",
  [check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()],
  validarCampos,
  bajaFisicaUsuarioPorId
);

router.put(
  "/editar-usuario/:id",
  [
    check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId(),
    check("nombreUsuario", "Campo USUARIO esta vacio").notEmpty(),
    check("emailUsuario", "Campo EMAIL vacio").notEmpty(),
    check("telefono", "Campo TELEFONO vacio").notEmpty(),
  ],
  validarCampos,
  auth(["usuario", "admin", "veterinario"]),
  editarInfoUsuarioPorId
);

router.put(
  "/cambiar-contrasenia/:id",
  [
    check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId(),
    check("actual", "Campo CONTRASEÑA vacio").notEmpty(),
    check("nueva", "ERROR. caracteres soportados solo entre 8 y 40").isLength(
      { min: 8 },
      { max: 40 }
    ),
  ],
  validarCampos,
  auth(["usuario", "admin", "veterinario"]),
  cambiarContraseniaUsuario
);

router.get("/admin", [], validarCampos, auth("admin"), obtenerTodosLosUsuarios);
router.get(
  "/:id",
  [check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()],
  auth(["usuario", "admin", "veterinario"]),
  obtenerUnUsuarioPorId
);

router.post("/recoveryPass", recuperarContraseniaUsuario);
router.put("/changePassUser", cambiarContraseniaRecuperacion);

module.exports = router;
