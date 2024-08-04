export const uploadImg = (req, res) => {
    (req, res) => {
        try {
            res.status(200).send("Imagen cargada exitosamente")
        } catch (e) {
            res.status(500).send("Error al cargar la imagen. Revisar")
        }
    }
}