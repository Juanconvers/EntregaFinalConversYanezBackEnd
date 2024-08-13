import userModel from "../models/user.js"
import { sendEmailRecoverPassword } from "../utils/nodemailer.js";
import jwt from 'jsonwebtoken'
import { validatePassword, createHash } from "../utils/bcrypt.js"
import varenv from "../dotenv.js";

// Login 

export const login = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Usuario o contraseña no válidos" });
        }
        const usuario = req.user;
        const token = jwt.sign({ usuario }, varenv.jwt_secret, { expiresIn: '12h' })
;       

        req.session.user = {
            _id : req.user._id,
            email: req.user.email,
            name: req.user.name,
            role: req.user.role,
            cartId: req.user.cart_id || null
        }

        res.status(200).json({
            message: "Usuario logueado correctamente",
            token: token,
            role: req.user.role,
            cartId: req.user.cart_id
        });

    } catch (e) {
        res.status(500).json({ error: "Error al loguear usuario" });
    }
}

// Registro

export const register = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json("Usuario ya existente en la aplicación");
        }
        res.status(200).json("Usuario creado correctamente");

    } catch (e) {
        res.status(500).json("Error al registrar usuario");
    }
}


export const logout = async (req, res) => {
    const user = await userModel.findOne({ email: req.session.user.email })
    user.last_connection = new Date()
    await user.save()

    req.session.destroy(function (e) {
        if (e) {
            console.log(e)
        } else {
            res.status(200).redirect("/login")
        }
    })
}

// Ruta GITHUB

export const sessionGithub = async (req, res) => {

    req.session.user = {
        email: req.user.email,
        first_name: req.user.name
    }
    res.redirect('/')
}

// Ruta JWT

export const testJWT = async (req, res) => {
    console.log("Desde testJWT" + req.user)
    if (req.user.role == 'User')
        res.status(403).send("Usuario no autorizado")
    else
        res.status(200).send(req.user)
}

// Verificación de inicio de sesión

export const current = async (req, res) => {
    try {
        if (req.user) {
            console.log(req)
            res.status(200).json("Usuario logueado");
        } else {
            res.status(401).json("Usuario no autenticado");
        }
    } catch (e) {
        res.status(500).json("Error al verificar usuario actual");
    }
}

// RECUPERAR LA CONTRASEÑA

export const recoverPassword = async (req, res) => {
    const { token } = req.params
    const { newPassword } = req.body

    try {
        // Verifica y decodifica el token JWT

        const validateToken = jwt.verify(token.substr(6,), varenv.secret)
        const user = await userModel.findOne({ email: validateToken.userEmail })
        if (user) {
            if (!validatePassword(newPassword, user.password)) {
                const hashPassword = createHash(newPassword)
                user.password = hashPassword
                const resultado = await userModel.findByIdAndUpdate(user._id, user)
                console.log(resultado)
                res.status(200).send("Contraseña modificada correctamente")
            } else {
                res.status(400).send("La contraseña es igual a la anterior")
            }
        } else {
            res.status(404).send("Usuario no encontrado")
        }
    } catch (e) {
        console.log(e)
        if (e?.message == 'jwt expired') {
            res.status(400).send("Paso el tiempo maximo para recuperar la contraseña. Se enviara otro mail a tu casilla de correo")
        }
        res.status(500).send(e)
    }
}

export const sendEmailPassword = async (req, res) => {

    try {
        const { email } = req.body
        const user = await userModel.find({ email: email })

        if (user) {
            const token = jwt.sign({ userEmail: email }, varenv.secret, { expiresIn: '1h' })
            const resetLink = `http://localhost:11000/api/session/reset-password?token=${token}`
            sendEmailRecoverPassword(email, resetLink)
            res.status(200).send("Email enviado satisfactoriamente")
        } else {
            res.status(404).send("Usuario No encontrado")
        }
    } catch (e) {
        res.status(500).send(e)
    }
}


// {
//     "first_name":"Carlos",
//     "last_name": "Agosto",
//     "email": "carlos7agosto@gmail.com",
//     "password": "Sisenor95"
// }

// app.post('/login', (req, res) => {
//     const { email, password } = req.body

//     if (email == "admin@admin.com" && password == "12345") {
//         req.session.email = email
//         req.session.password = password
//         res.send('Login exitoso')
//     } else {
//         res.send('Login incorrecto')
//     }

// })

// export const register = async (req, res) => {
//     try {
//         if(!req.user){
//             return res.status(400).send("El usuario ya existe en la app")
//         }
//         res.status(200).send("Usuario creado adecuadamente")
//     } catch (e) {
//         res.status(500).send("Error al registrar al usuario")
//     }
// }

// sessionRouter.get('/current', passport.authenticate('jwt'), (req, res) => {
//     console.log(req)
//     res.status(200).send("Usuario Logueado Perfectamente")
// })


// Viene desde el app.js

// Session Routes

// app.get('/session', (req, res) => {
//     console.log(req.session)
//     if (req.session.counter) {
//         req.session.counter++
//         res.send(`Usted es el usuario No. ${req.session.counter} en entrar a esta pagina`)
//     } else {
//         req.session.counter = 1
//         res.send(`Usted es el primer usuario en entrar a esta pagina`)
//     }
// })

