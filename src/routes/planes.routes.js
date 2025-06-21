const { Router } = require("express");
const auth = require("../middlewares/auth");
const { aniadirPlan, cancelarPlan, cancelarPlanComoVeterinario, obtenerPlanesVeterinario } = require("../controllers/planes.controllers");
const validarCampos = require("../middlewares/validarCampos");
const { check } = require("express-validator");
const router = Router();

router.post("/aniadirPlan", [
    check("mascota", "Campo MASCOTA esta vacio").notEmpty(),
    check("veterinario", "Campo VETERINARIO esta vacio").notEmpty(),
    check("fecha", "Campo FECHA esta vacio").notEmpty(),
    check("dia", "Campo DIA esta vacio").notEmpty(),
    check("hora", "Campo HORA esta vacio").notEmpty(),
], validarCampos, auth("usuario"), aniadirPlan)
router.delete("/cancelarPlan/:idMascota",[
    check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()
], validarCampos, auth("usuario"), cancelarPlan);
router.delete("/cancelarPlanVet/:idMascota",[
    check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()
], validarCampos, auth("veterinario"), cancelarPlanComoVeterinario);
router.get("/planes-veterinario", auth("veterinario"), obtenerPlanesVeterinario);


module.exports = router;