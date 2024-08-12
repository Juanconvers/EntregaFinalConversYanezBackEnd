import { Router } from "express";

import { loginView } from "../controllers/viewsController.js";
import { registerView } from "../controllers/viewsController.js";

import { renderProducts } from '../controllers/viewsController.js'
import { cartView } from "../controllers/viewsController.js"
import { ticketView } from "../controllers/viewsController.js";

import { adminPanelView } from "../controllers/viewsController.js";
import { adminUsersView } from "../controllers/viewsController.js";
import { createEditProductView } from "../controllers/viewsController.js";


import { errorView } from '../controllers/viewsController.js'

const viewsRouter = Router()

viewsRouter.get('/register', registerView)
viewsRouter.get('/login', loginView)

viewsRouter.get('/home', renderProducts)
viewsRouter.get('/cart', cartView)
viewsRouter.get('/ticket', ticketView)

viewsRouter.get('/adminPanel', adminPanelView)
viewsRouter.get('/adminUsers', adminUsersView)
viewsRouter.get('/createEditProduct', createEditProductView)

viewsRouter.get('/error', errorView)

export default viewsRouter


