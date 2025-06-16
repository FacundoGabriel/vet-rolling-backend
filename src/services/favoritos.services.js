const FavoritosModel = require("../models/favoritos.model")
const ProductosModel = require("../models/productos.model")

const obtenerProductoDeFavoritosBD = async (idFavoritos) =>{
   try {
     const favoritos = await FavoritosModel.findById(idFavoritos)
    return{
        productos: favoritos.productos,
        statusCode: 200
    }
   } catch (error) {
    return{
        error,
        statusCode:500
    }
   }
}

const agregarProductoFavoritosBD = async(idFavoritos, idProducto) =>{
    try {
         const favoritos = await FavoritosModel.findOne({_id: idFavoritos})
         const producto = await ProductosModel.findOne({_id: idProducto})
         if(!producto) {
            return{
                msg: "El producto que intentas agregar ya no existe",
                statusCode:404
            }
         }

         const productoExisteFavoritos = favoritos.productos.find((prod)=> prod._id.toString() === idProducto.toString())

         if(productoExisteFavoritos){
            return{
                msg:"Producto ya existe en favoritos",
                statusCode: 400,
            }
         }

         favoritos.productos.push(producto)
         await favoritos.save()

         return{
            msg:"Producto agregado correctamente",
            statusCode: 200,
         }

    } catch (error) {
        return{
            error,
            statusCode:500,
        }
        
    }
}

const eliminarProductoFavoritosBD = async(idFavoritos, idProducto) =>{
    try {
         const favoritos = await FavoritosModel.findOne({_id: idFavoritos})
         
         const productoIndex = favoritos.productos.findIndex((prod)=> prod._id.toString() === idProducto.toString())
         

         if(productoIndex < 0){
            return{
                msg:"ERROR ID: no existe el producto que buscas",
                statusCode: 404
            }
         }

         favoritos.productos.splice(productoIndex, 1)

         await favoritos.save()

         return{
            msg:"Producto eliminado con exito!",
            statusCode: 200,
         }
    } catch (error) {
        return{
            error,
            statusCode:500,
        }
    }
}

module.exports={
    obtenerProductoDeFavoritosBD,
    agregarProductoFavoritosBD,
    eliminarProductoFavoritosBD,
}