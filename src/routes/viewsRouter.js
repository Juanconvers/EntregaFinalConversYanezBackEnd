import { Router } from "express";
import { getProductos } from '../controllers/views.controller.js'

const viewsRouter = Router()

viewsRouter.get('/', getProductos)

export default viewsRouter