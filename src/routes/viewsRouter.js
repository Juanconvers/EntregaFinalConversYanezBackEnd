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

viewsRouter.get('/', cartView)

viewsRouter.get('/', homeView)

viewsRouter.get('/', loginView)

viewsRouter.get('/', registerView)

viewsRouter.get('/', ticketView)

viewsRouter.get('/', errorView)

export default viewsRouter