import local from 'passport-local'
import passport from 'passport'
import GithubStrategy from 'passport-github2'
import crypto from 'crypto'

import { userModel } from '../../models/user.js'
import { createHash, validatePassword } from '../../utils/bcrypt.js'
import { strategyJWT } from './strategies/jwtStrategy.js'

const localStrategy = local.Strategy

const initializePassport = () => {
    
    passport.use('register', new localStrategy({ passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) => {
        // Se sacan los datos del usuario de la solicitud.
        try {
            const { first_name, last_name, email, password, age } = req.body
            // Se verifica si hay usuarios con esa identificación.
            const findUser = await userModel.findOne({ email: email })
            if (findUser) {
                return done(null, false)
            } else {
                const user = await userModel.create({ first_name, last_name, email, age, email, password: createHash(password) })
                return done(null, user)
            }
        } catch (e) {
            return done(e)
        } 
    }))

    //Iniciar la sesión del User
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    //Eliminar sesión 
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id)
            done(null, user)
        } catch (error) {
            done(error);
        }
    });

    // Estrategia del Login

    passport.use('login', new localStrategy({ usernameField: 'email'}, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username }).lean()
            console.log(user)
            if (user && validatePassword(password, user.password)) {
                    
                user.last_connection = Date.now()
                // user = await user.save()

                return done (null, user)
                } else {
                    return done (null, false)
                }
            } catch (e) {
                return done (e)
        }
    }))

    passport.use('github', new GithubStrategy({
        clientID: "TU_CLIENT_ID",
        clientSecret: "TU_CLIENT_SECRET",
        callbackURL: "http://localhost:11000/api/session/github"
    }, async (accessToken, refreshToken, profile, done) => {
        try{
            console.log(accessToken)
            console.log(refreshToken)
            const user = await userModel.findOne({ email: profile._json.email}).lean()
            if (user){
                done(null, user)
            } else {
                const randomNumber = crypto.randomUUID()
                console.log(profile._json)
                const userCreated = await userModel.create({ first_name: profile._json.name, last_name: ' ', email: profile._json.email, age: 18, password: createHash(`${profile._json.name}`) })
                // console.log(randomNumber)
                return done(null, userCreated)
            }
        } catch (error){
            return done(error)
        }
    }))

passport.use('jwt', strategyJWT)

}

export default initializePassport
