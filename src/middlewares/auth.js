 const jwt = require("jsonwebtoken")

 module.exports = (rolRuta) => (req, res, next) => {
    const token = req.header("auth")
    const verificarToken = jwt.verify(token, process.env.JWT_SECRET)
    
    if(verificarToken.rolUsuario === rolRuta || rolRuta.includes(verificarToken.rolUsuario )){
        req.idCarrito = verificarToken.idCarrito
        req.idUsuario = verificarToken.idUsuario
        req.idFavoritos = verificarToken.idFavoritos
        next()

    } else {
        res.status(401).json("No estas autorizado para recibir esta informacion")
    }
    
 }