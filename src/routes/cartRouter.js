import { Router } from "express";
import passport from "passport";
import { createCart, getCart, insertProductCart, createTicket, deleteFromCart} from "../controllers/cartController.js";

const cartRouter = Router()


        //Crear carrito por usuario

cartRouter.post('/', createCart)

        //Consultar carrito por ID

cartRouter.get('/:cid', getCart)

        //Agregar productos al carrito

cartRouter.post('/:cid/products/:pid', passport.authenticate('jwt', { session: false }), insertProductCart);

        // Hacer la compra - De lo hay en el carrito

cartRouter.post('/:cid/purchase', createTicket);


        //Eliminar un producto sdel carrito

cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartModel.findById(cid);
        console.log("Product IDs in cart:", cart.products.map(p => p.id_prod.toString()));
        console.log("Product ID to remove:", pid);

        if (!cart) {
            return res.status(404).send('Carrito no encontrado');            
        }

          cart.products = cart.products.filter(product => product.id_prod.toString() !== pid);
        await cart.save();
        res.status(200).send("Producto eliminado del carrito correctamente");
    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar producto: ${error}`)
    }
});

        //Modificar carrito por ID

cartRouter.put('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const { quantity } = req.body;
        const updatedCart = await cartModel.findOneAndUpdate( 
            { _id: cartId, "products._id": productId },
            { $set: { "products.$.quantity": quantity } },
            { new: true }
        );
        if (!updatedCart) {
            return res.status(404).send('Carrito o producto no actualizado');
        }

        res.status(200).send(updatedCart);
    } catch (error) {
        res.status(500).send(`Error interno del servidor al actualizar carrito: ${error}`);
    }
})

        //Eliminar carrito por ID

cartRouter.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const updatedCart = await cartModel.findByIdAndUpdate(cartId, { products: [] });
        res.status(200).send(updatedCart);

    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar los productos del carrito: ${error}`);
    }
});

        //Consultar carrito por ID

cartRouter.get('/:cid', async (req, res) => {

    try {
        const cartId = req.params.cid;
        const cart = await cartModel.findById(cartId).populate('products.id_prod');
        res.render('templates/cart', { cart });
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar el carrito específico: ${error}`);
    }
});

export default cartRouter;


