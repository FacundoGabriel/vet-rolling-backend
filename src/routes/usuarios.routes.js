const { Router } = require("express");
const { registrarUsuario, altaLogicaUsuarioPorId, bajaLogicaUsuarioPorId, bajaFisicaUsuarioPorId } = require("../controllers/usuarios.controllers");
const router = Router();
const { check } = require("express-validator")
const validarCampos = require("../middlewares/validarCampos");

router.post("/registro",[
    check("nombreUsuario", "Campo USUARIO esta vacio").notEmpty(),
    check("emailUsuario", "Campo EMAIL vacio").notEmpty(),
    check("telefono", "Campo TELEFONO vacio").notEmpty(),
    check("contrasenia", "Campo CONTRASEÑA vacio").notEmpty(),
    check("contrasenia", "ERROR. caracteres soportados solo entre 8 y 40").isLength({min:8},{max:40}),
], validarCampos, registrarUsuario)

router.put("/habilitar/:id",  [
    check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()
], validarCampos, altaLogicaUsuarioPorId)
router.put("/deshabilitar/:id",[
    check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()
], validarCampos, bajaLogicaUsuarioPorId)
router.delete("/:id",[
    check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()
], validarCampos, bajaFisicaUsuarioPorId)

module.exports = router;
