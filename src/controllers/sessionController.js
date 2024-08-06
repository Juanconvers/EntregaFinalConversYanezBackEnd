import userModel from "../models/user.js"
import { sendEmailRecoverPassword } from "../utils/nodemailer.js";
import jwt from 'jsonwebtoken'
import {validatePassword, createHash} from "../utils/bcrypt.js"

export const login = async (req, res) => {
    try {
        if(!req.user){
            return res.status(401).send("Usuario o contraseña invalidos")
        }
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }
        
        const token = jwt.sign(userDto,'tokenSecretJWT',{expiresIn:"1h"});
        res.cookie('coderCookie',token,{maxAge:3600000}).send({status:"success",message:"Logged in"})
       
        res.status(200).send("Usuario logueado correctamente")
    } catch (e) {
        res.status(500).send("Error al loguear usuario")
    }
}

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Volares incompletos" });
        const exists = await usersService.getUserByEmail(email);
        if (exists) return res.status(400).send({ status: "error", error: "EL usuario ya existe" });
        const hashedPassword = createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        }
        let result = await usersService.create(user);
        console.log(result);
        res.send({ status: "success", payload: result._id });
    } catch (error) {
        res.status(500).send("Error al registrar al usuario")
    }
}


export const logout = async (req, res) => {
    const user = await userModel.findOne({ email: req.session.user.email })
    user.last_connection = new Date() 
    await user.save()
    
    req.session.destroy((e =>
         e ? res.status(500).send('Error al cerrar sesion') : res.status(200).redirect(/*"api/session/login" o: */ "/")
    ))
};

export const sessionGithub = async (req, res) => {
    
    req.session.user = {
        email: req.user.email,
        first_name: req.user.name
    }
    res.redirect('/')
}
 
export const testJWT = async (req, res) => {
    console.log("Desde testJWT" + req.user)
    if (req.user.role == 'User')
        res.status(403).send("Usuario no autorizado")
    else
        res.status(200).send(req.user)
}

export const recoverPassword = async (req, res) => {
   const { token } = req.params
   const { newPassword } = req.body

   try{
        const validateToken = jwt.verify( token.substr(6,),"coder")
        const user = await userModel.find({email: validateToken.userEmail})
        if(user){
            if(!validatePassword(newPassword, user.password)){
                const hashPassword = createHash(newPassword)
                user.password = hashPassword
                const resultado = await userModel.findByIdAndUpdate(user._id, user)
                console.log(resultado)
                res.status(200).send("Contraseña modificada correctamente")
            }else{
                
                res.status(400).send("La contraseña es igual a la anterior")

            }
        }else{ 
            res.status(404).send("Usuario no encontrado")
        }
   }catch (e){
        res.status(500).send('Error al cambiar contraseña: ', error)
        if(e?.message == 'jwt.expired'){
            res.status(400).send("El tiempo para recuperar la contraseña ha expirado. Use nuevo token")
        }
        res.status(500).send(e)
   }
    
}

export const sendEmailPassword = async (req, res) => {
    
    try{
        const {email} = req.body
        const user = await userModel.find({email: email}) 
        
        if (user){
            const token = jwt.sign({userEmail: email}, "coder", {expiresIn: '1h'})
            const resetLink = `http://localhost:11000/api/session/reset-password?token=${token}`
            sendEmailRecoverPassword(email, resetLink)
            res.status(200).send("Email enviado satisfactoriamente") 
        }else{
            res.status(404).send("Usuario No encontrado")
        }
    }catch (e){
        res.status(500).send(e)
    }
}

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