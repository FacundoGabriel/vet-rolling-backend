const { Router } = require("express");
const auth = require("../middlewares/auth");
const { aniadirPlan, cancelarPlan, cancelarPlanComoVeterinario, obtenerPlanesVeterinario } = require("../controllers/planes.controllers");
const router = Router();

router.post("/aniadirPlan", auth("usuario"), aniadirPlan)
router.delete("/cancelarPlan/:idMascota", auth("usuario"), cancelarPlan);
router.delete("/cancelarPlanVet/:idMascota", auth("veterinario"), cancelarPlanComoVeterinario);
router.get("/planes-veterinario", auth("veterinario"), obtenerPlanesVeterinario);


module.exports = router;