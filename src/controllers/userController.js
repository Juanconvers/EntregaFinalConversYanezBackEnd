import { userModel } from "../models/user.js";

        // Obtener todos los usuarios

export const getUsers = async (req, res) => {
    
    try {
        console.log("Usando getUsers");
        const users = await userModel.find({}, 'name email role -_id -cart_id')
        console.log("Usuarios obtenidos de DB:", users)
        const usersWithoutCartId = users.map(user => {
            return {
                name: user.name,
                email: user.email,
                rol: user.rol
            };
        });
        console.log("Usuarios después de mapear (sin cart_id):", usersWithoutCartId); // Verificar los datos después del mapeo
        
        res.status(200).send(usersWithoutCartId)
        } catch (e) {
        console.log("Error en getUsers:", e.message); 
        res.status(500).send(`Error al consultar usuarios: ${e.message}`);
    }
}

        // Consultar usuario por ID

export const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.uid);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Error al obtener detalles del usuario:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    }
};

        // Eliminar usuario por ID

export const deleteUserById = async (req, res) => {
    try {

        const user = await user.findByIdAndDelete(req.params.uid);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    }
};


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