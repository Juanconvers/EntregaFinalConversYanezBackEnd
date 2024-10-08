
import { Router } from "express";
import passport from "passport";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productsController.js";

const productsRouter = Router()

productsRouter.get('/', getProducts)

productsRouter.get('/:pid', getProduct)

productsRouter.post('/', createProduct)

productsRouter.put('/:pid', passport.authenticate('jwt', { session: false}), updateProduct)

productsRouter.delete('/:pid', deleteProduct)

export default productsRouter










// {
//     "title": "Table",
//     "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
//     "category": "Handcrafted",
//     "status": "true",
//     "stock": 188,
//     "code": "wPAP1a",
//     "price": 63452,
// }


// await productModel.insertMany([
//     { title: "Avena", description: "El mejor", category: "Producto no perecedero", status: true, stock: 65, code: "JCCY-AV2", price: 1500, thumbnail: [] },
//     { title: "Platano", description: "El mejor", category: "Producto perecedero", status: true, stock: 16, code: "JCCY-BV6", price: 450, thumbnail: [] },
//     { title: "Blanquador", description: "El mejor", category: "Producto de aseo", status: true, stock: 85, code: "JCCY-CV7", price: 1250, thumbnail: [] },
//     { title: "Harina de maiz", description: "El mejor", category: "Producto no perecedero", status: true, stock: 33, code: "JCCY-AV3", price: 1970, thumbnail: [] },
//     { title: "Banano", description: "El mejor", category: "Producto perecedero", status: true, stock: 150, code: "JCCY-BV12", price: 750, thumbnail: [] },
//     { title: "Jabón azul", description: "Calidad superior", category: "Producto de aseo", status: true, stock: 17, code: "JCCY-CV3", price: 2500, thumbnail: [] },
//     { title: "Arroz", description: "Excelente condición", category: "Producto no perecedero", status: true, stock: 75, code: "JCCY-AV5", price: 3500, thumbnail: [] },
//     { title: "Manzana", description: "Perfecta condición", category: "Producto perecedero", status: true, stock: 100, code: "JCCY-BV5", price: 350, thumbnail: [] },
//     { title: "Limpiador multiusos", description: "Perfecta condición", category: "Producto de aseo", status: true, stock: 32, code: "JCCY-CV6", price: 1000, thumbnail: [] },
//     { title: "Garbanzo", description: "Calidad superior", category: "Producto no perecedero", status: true, stock: 27, code: "JCCY-AV10", price: 975, thumbnail: [] },
//     { title: "Aceituna", description: "Calidad superior", category: "Producto no perecedero", status: true, stock: 45, code: "JCCY-AV11", price: 4500, thumbnail: [] },
//     { title: "Jabón detergente", description: "Excelente condición", category: "Producto de aseo", status: true, stock: 18, code: "JCCY-CV45", price: 3200, thumbnail: [] },
//     { title: "Lechuga", description: "Excelente condición", category: "Producto perecedero", status: true, stock: 20, code: "JCCY-BV8", price: 1300, thumbnail: [] },
//     { title: "Zanahoria", description: "Perfecta condición", category: "Producto perecedero", status: true, stock: 75, code: "JCCY-BV10", price: 500, thumbnail: [] },
//     { title: "Cepillo para el piso", description: "Perfecta condición", category: "Producto de aseo", status: true, stock: 6, code: "JCCY-CV2", price: 1550, thumbnail: [] },

// ])

// title: "Avena", description: "El mejor", category: "Producto no perecedero", status: true, stock: 65, code: "JCCY-AV2", price: 1500, thumbnail: []




