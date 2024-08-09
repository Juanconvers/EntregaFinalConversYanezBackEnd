import cartRouter from './cartRouter.js'
import productsRouter from './productsRouter.js'
import userRouter from './userRouter.js'
import chatRouter from './chatRouter.js'
import sessionRouter from './sessionRouter.js'
import multerRouter from './multerRouter.js'
import express from 'express'

import viewsRouter from './viewsRouter.js'

import { __dirname } from '../path.js'


const indexRouter = express.Router()

//Routes
// indexRouter.get('/', (req, res) => {
//     res.status(200).send("Bienvenido!")
// })


indexRouter.use('/', viewsRouter, express.static(__dirname + '/public'))

indexRouter.use('/public', express.static(__dirname + '/public'))
indexRouter.use('/upload', multerRouter)
indexRouter.use('/api/products', productsRouter, express.static(__dirname + '/public'))
indexRouter.use('/api/cart', cartRouter)
indexRouter.use('/api/chat', chatRouter, express.static(__dirname + '/public'))
indexRouter.use('/api/users', userRouter)
indexRouter.use('/api/session', sessionRouter)

// Vistas
// indexRouter.use('/front', viewsRouter, express.static(__dirname + '/public'))





// indexRouter.use('/api/session', viewsRouter)

export default indexRouter