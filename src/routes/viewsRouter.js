import { Router } from "express";
import { getProductos } from '../controllers/viewsController.js'
import { errorView } from '../controllers/viewsController.js'
import { cartView } from "../controllers/viewsController.js"
import { homeView } from "../controllers/viewsController.js";
import { loginView } from "../controllers/viewsController.js";
import { registerView } from "../controllers/viewsController.js";
import { ticketView } from "../controllers/viewsController.js";

const viewsRouter = Router()

viewsRouter.get('/', getProductos)

viewsRouter.get('/cart', cartView)

viewsRouter.get('/home', homeView)

viewsRouter.get('/login', loginView)

viewsRouter.get('/register', registerView)

viewsRouter.get('/ticket', ticketView)

viewsRouter.get('/error', errorView)

export default viewsRouter