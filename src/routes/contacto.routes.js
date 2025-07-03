const { Router } = require("express");
const { check } = require("express-validator");
const validarCampos = require("../middlewares/validarCampos");
const { procesarConsulta } = require("../controllers/contacto.controllers");
const router = Router();

router.post(
  "/enviar",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("mensaje", "El mensaje no puede estar vacío").notEmpty(),
    validarCampos,
  ],
  procesarConsulta
);

module.exports = router;
