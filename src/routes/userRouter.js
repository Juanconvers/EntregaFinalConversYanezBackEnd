import { Router } from "express";
import { getUsers, sendDocuments, getUserById, deleteUserById } from "../controllers/userController.js";

const userRouter = Router()

userRouter.get('/', getUsers)

userRouter.get('/:uid', getUserById);

userRouter.get('/session', (req, res) => {
    try {
      if(req.session.user) {
        res.status(200).json(req.session.user)
      } else {
        res.status(401).send("Usuario NO Autenticado")
      }
    }catch (error) {
      res.status(500).send("Error interno del Servidor")
    }
  })

userRouter.put('/:uid/documents', sendDocuments )

userRouter.delete('/:uid', deleteUserById);

export default userRouter

