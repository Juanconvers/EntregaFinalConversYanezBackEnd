import jwt from 'jsonwebtoken'
import varenv from '../dotenv'

export const generateToken = (user) => {

    
    const token = jwt.sign({ user }, varenv.jwt_secret, { expiresIn: '12h' })
    console.log(token)
    return token
}

/*
        1°: Objeto de asociacion del token (Usuario)
        2°: Clave privada del cifrado
        3°: Tiempo de expiracion
    */
