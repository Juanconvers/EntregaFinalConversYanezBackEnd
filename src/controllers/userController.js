import { userModel } from "../models/user.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send("Error al consultar usuarios: ", e)
    }}

export const sendDocuments = async (req, res) => {
    try {
        const { uid } = req.params
        const newDoc = req.body
        const user = await userModel.findByIdAndUpdate(uid, {  
            $push: {                    
                documents: {
                    $each: newDoc      
                }
            }
        }, { new: true })
        if (!user) {
            res.status(404).send("Usuario not found.")
        } else {
            res.status(200).send(user)
        }
    } catch (e) {
        res.status(500).send("Error al enviar documento:", e)
    }}