const { Router } = require("express");
const router = Router();

const carritosRoutes = require("./carritos.routes");
const productosRoutes = require("./productos.routes");
const usuariosRoutes = require("./usuarios.routes");
const serviciosRoutes = require("./servicios.routes");
const favoritosRoutes = require("./favoritos.routes");
const mascotasRoutes = require("./mascotas.routes");
const planesRoutes = require("./planes.routes");
const veterinariosRoutes = require("./veterinarios.routes");
const turnosRoutes = require("./turnos.routes");
const mercadopagoRoutes = require("./mercadopago.routes");
const contactoRoutes = require("./contacto.routes");

router.use("/carritos", carritosRoutes);
router.use("/favoritos", favoritosRoutes);
router.use("/productos", productosRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/servicios", serviciosRoutes);
router.use("/mascotas", mascotasRoutes);
router.use("/planes", planesRoutes);
router.use("/veterinarios", veterinariosRoutes);
router.use("/turnos", turnosRoutes);
router.use("/mercadopago", mercadopagoRoutes);
router.use("/contacto", contactoRoutes);

module.exports = router;
