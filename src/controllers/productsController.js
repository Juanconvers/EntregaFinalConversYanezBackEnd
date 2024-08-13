import productModel from "../models/products.js";

export const getProducts = async (req, res) => {
    try {
        const { limit, page, filter, ord } = req.query;
        let metFilter;
        const pag = page !== undefined ? page : 1;
        const limi = limit !== undefined ? limit : 100;

        if (filter == "true" || filter == "false") {
            metFilter = "status"
        } else {
            if (filter !== undefined)
                metFilter = "category";
    }
    
    const query = metFilter != undefined ? { [metFilter]: filter } : {};
    const ordQuery = ord !== undefined ? { price: ord } : {};
    const prods = await productModel.paginate(query, { limit: limi, page: pag, sort: ordQuery });
    const prodsJSON = prods.docs.map(prod => prod)
    
    res.status(200).send(prodsJSON)
} catch (error){
    res.status(500).send(`Error interno del servidor al consultar los productos: ${error}`)
}}



export const createProduct = async (req, res) => {
    
    //console.log(req.user)
   //Qué da?
    //console.log(req.user.role)

    try {
        if (req.user && req.user.role === "Admin"){
            const product = req.body
            const mensaje = await productModel.create(product)
            res.status(201).send(mensaje)
        } else {
            res.status(403).send("Usuario no autorizado")
    } 
        } catch (error) {
        res.status(500).send(`Error interno del servidor al crear el producto: ${error}`)
    }
}

export const getProduct = async (req, res) => {
    try {
        const idProducto = req.params.pid 
        const prod = await productModel.findById(idProducto)
        
        if (prod)
            res.status(200).send(prod)
        else
            res.status(404).send("El producto no existe")
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar producto: ${error}`)
    }
}

export const updateProduct = async (req, res) => {
    try {
        if (req.user && req.user.role === "Admin") {
            const idProducto = req.params.pid
            const updateProduct = req.body
            const prod = await productModel.findByIdAndUpdate(idProducto, updateProduct, { new: true })
           
            if (!prod) {
                return res.status(404).json({
                    status: "error",
                    message: "Producto no encontrado"
                });
            }
            res.status(200).json({
                status: "success",
                message: "Producto actualizado con éxito",
                data: prod,
                role: req.user.role
            });
        } else {
            res.status(403).json({
                status: "error",
                message: "Usuario no autorizado"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: `Error interno del servidor al actualizar producto: ${error.message}`
        });
    }
}
    
export const deleteProduct = async (req, res) => {
    try {
        //console.log(req.user.role)
        if (req.user && req.user.role === "Admin") {
            const idProducto = req.params.pid
            const mensaje = await productModel.findByIdAndDelete(idProducto)
            if (!mensaje) {
                return res.status(404).json({
                    status: "error",
                    message: "Producto no encontrado"
                });
            }
            res.status(200).json({
                status: "success",
                message: "Producto eliminado con éxito",
                data: mensaje,
                role: req.user.role
            });
        } else {
            res.status(403).json({
                status: "error",
                message: "Usuario no autorizado"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: `Error interno del servidor al eliminar producto: ${error.message}`
        });
    }
}


