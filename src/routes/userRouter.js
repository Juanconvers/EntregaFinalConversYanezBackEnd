import { Router } from "express";
import { getUsers, sendDocuments, getUserById, deleteUserById } from "../controllers/userController.js";

const userRouter = Router()

userRouter.get('/', getUsers)

userRouter.get('/:uid', getUserById);

userRouter.delete('/:uid', deleteUserById);

userRouter.put('/:uid/documents', sendDocuments )

export default userRouter

