
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import messageModel from './models/messages.js'
import indexRouter from './routes/indexRouter.js'
import initializePassport from './config/passport/passport.js'
import cors from 'cors'
import varenv from './dotenv.js'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'

//Configuraciones o declaraciones
const app = express()
const PORT = 11000

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))


//Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(server)

//Connection DB
mongoose.connect(varenv.mongo_url)
    .then(() => console.log("DB is connected"))
    .catch(e => console.log(e))




    


const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Documentacion de la aplicacion',
            description: 'Descripcion de documentacion'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsdoc(swaggerOptions)

//Documentación de la API
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

//Middlewares
app.use(express.json())
app.use(session({
    secret: varenv.session_secret,
    resave: true,
    store: MongoStore.create({
        mongoUrl: varenv.mongo_url,
        ttl: 60 * 60
    }),
    saveUninitialized: true
}))

//Handlebars
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "./views"))


app.use(cookieParser(varenv.cookie_secret))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Routes

// app.use('/', indexRouter)

app.get('/static', (req, res) => {
    res.render('error')
})


// Cookies Routes

// app.get('/setCookie', (req, res) => {
//     res.cookie('MyCookie', 'Esto es una cookie', { maxAge: 4000000, signed: true }).send("Cookie creada por mí")
// })

// app.get('/getCookie', (req, res) => {
//     res.send(req.signedCookies)
// })

// app.get('/deleteCookie', (req, res) => {
//     res.clearCookie('MyCookie').send("Cookie eliminada totalmente")
// })

// io.on('connection', (socket) => {
//     console.log("Conexion con Socket.io")
//     socket.on('mensaje', async (mensaje) => {
//         try {
//             await messageModel.create(mensaje)
//             const mensajes = await messageModel.find()
//             io.emit('mensajeLogs', mensajes)
//         } catch (e) {
//             io.emit('mensajeLogs', e)
//         }
//     })
// })