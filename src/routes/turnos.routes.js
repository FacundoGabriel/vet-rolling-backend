const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearTurno,
  cancelarTurno,
  cancelarTurnoComoVeterinario,
  obtenerTurnosVeterinario,
  obtenerTurnos,
  confirmarTurno,
} = require("../controllers/turnos.controllers");

const validarCampos = require("../middlewares/validarCampos");
const auth = require("../middlewares/auth");

const router = Router();

router.post(
  "/crear-turno",
  [
    check("mascota", "Campo MASCOTA está vacío").notEmpty(),
    check("servicio", "Campo SERVICIO está vacío").notEmpty(),
    check("veterinario", "Campo VETERINARIO está vacío").notEmpty(),
    check("fechaHora", "Campo FECHAHORA está vacío").notEmpty(),
  ],
  validarCampos,
  auth(["usuario", "admin", "veterinario"]),
  crearTurno
);

router.delete(
  "/cancelar-turno/:idTurno",
  [
    check(
      "idTurno",
      "ID incorrecto. Formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  validarCampos,
  auth(["usuario", "admin"]),
  cancelarTurno
);

router.delete(
  "/cancelar-turno-vet/:idTurno",
  [
    check(
      "idTurno",
      "ID incorrecto. Formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  validarCampos,
  auth("veterinario"),
  cancelarTurnoComoVeterinario
);

router.get(
  "/turnos-veterinario",
  auth("veterinario"),
  obtenerTurnosVeterinario
);
router.get(
  "/mis-turnos",
  auth(["usuario", "admin", "veterinario"]),
  obtenerTurnos
);
router.put("/confirmar-turno/:idTurno", confirmarTurno);
module.exports = router;
