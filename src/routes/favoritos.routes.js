const { Router } = require("express");
const { obtenerProductoDeFavoritos, agregarProductoFavoritos, eliminarProductoFavoritos } = require("../controllers/favoritos.controllers");
const router = Router();
const auth = require("../middlewares/auth");
const validarCampos = require("../middlewares/validarCampos");
const { check } = require("express-validator");

router.get("/", auth("usuario"), obtenerProductoDeFavoritos)

router.put("/agregarProducto/:idProducto",
    [check("idProducto", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()]
    ,auth("usuario"), validarCampos,  agregarProductoFavoritos)
router.put("/eliminarProducto/:idProducto", 
    [check("idProducto", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()],
auth("usuario"), validarCampos,  eliminarProductoFavoritos)



module.exports = router;
