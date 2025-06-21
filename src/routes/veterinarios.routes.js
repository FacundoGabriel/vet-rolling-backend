const { Router } = require("express");
const { obtenerVeterinarios, aprobarVeterinario, registrarVeterinario } = require("../controllers/veterinarios.controllers");
const router = Router();
const auth = require("../middlewares/auth");
const validarCampos = require("../middlewares/validarCampos");
const { check } = require("express-validator");

router.post("/registro",[
    check("nombreUsuario", "Campo USUARIO esta vacio").notEmpty(),
    check("emailUsuario", "Campo EMAIL vacio").notEmpty(),
    check("telefono", "Campo TELEFONO vacio").notEmpty(),
    check("especialidad", "Campo ESPECIALIDAD vacio").notEmpty(),
    check("descripcion", "Campo DESCRIPCION vacio").notEmpty(),
    check("contrasenia", "Campo CONTRASEÑA vacio").notEmpty(),
    check("contrasenia", "ERROR. caracteres soportados solo entre 8 y 40").isLength({min:8},{max:40}),
], validarCampos, registrarVeterinario)

router.get("/", obtenerVeterinarios)
router.put("/aprobar-veterinario/:idUsuario", [
    check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()
], validarCampos, auth("admin"), aprobarVeterinario);

module.exports = router;