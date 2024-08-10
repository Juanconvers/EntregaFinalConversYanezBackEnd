import productModel from "../models/products.js";

export const insertImg = async (req, res) => {
    try {
        const { file } = req;
        const { productId } = req.body; 

        if (!file) {
            return res.status(400).send("Archivo de imagen no encontrado");
        }

        if (!productId) {
            return res.status(400).send("ID del producto no encontrado");
        }

        const updatedProduct = await productModel.findByIdAndUpdate(productId, { thumbnail: file.filename }, { new: true });

        if (!updatedProduct) {
            return res.status(404).send("Producto no encontrado");
        }
        res.status(200).send("Imagen cargada exitosamente y producto actualizado");
    } catch (e) {
        console.error(e);
        res.status(500).send("Error al cargar imagen")
    }
};