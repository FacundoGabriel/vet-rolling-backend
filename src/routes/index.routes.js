const { Router } = require("express");
const router = Router();

const carritosRoutes = require("./carritos.routes");
const productosRoutes = require("./productos.routes");
const usuariosRoutes = require("./usuarios.routes");
const serviciosRoutes = require("./servicios.routes");
const favoritosRoutes = require("./favoritos.routes");
const mascotasRoutes = require("./mascotas.routes")

router.use("/carritos", carritosRoutes);
router.use("/favoritos", favoritosRoutes);
router.use("/productos", productosRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/servicios", serviciosRoutes);
router.use("/mascotas", mascotasRoutes )

module.exports = router;
