import { Router } from "express";
import { renderProducts } from '../controllers/viewsController.js'
import { errorView } from '../controllers/viewsController.js'
import { cartView } from "../controllers/viewsController.js"
// import { homeView } from "../controllers/viewsController.js";
import { loginView } from "../controllers/viewsController.js";
import { registerView } from "../controllers/viewsController.js";
import { ticketView } from "../controllers/viewsController.js";
import { createProductView } from "../controllers/viewsController.js";

const viewsRouter = Router()

viewsRouter.get('/register', registerView)

viewsRouter.get('/home', renderProducts)

viewsRouter.get('/cart', cartView)

// viewsRouter.get('/home', homeView)

viewsRouter.get('/login', loginView)



viewsRouter.get('/ticket', ticketView)

viewsRouter.get('/createProduct', createProductView)

viewsRouter.get('/error', errorView)

export default viewsRouter


