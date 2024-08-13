import cartModel from "../models/cart.js"
import productModel from "../models/products.js"
import ticketModel from "../models/ticket.js"
import crypto from 'crypto';
import { isValidObjectId } from 'mongoose';


        // Crear un carrito

export const createCart = async (req, res) => {
    try {
        const mensaje = await cartModel.create({ products: [] })
        res.status(201).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear el carrito: ${error}`)
    }

}

        // Consultar el carrito

export const getCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        if (!isValidObjectId(cartId)) {
            return res.status(400).send('ID de carrito inválido');
        }
        const cart = await cartModel.findOne({ _id: cartId });
        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }
        res.status(200).send(cart);

    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
    }
}

//Get Ticket de compra

export const getTicket = async (req, res) => {
    try {
        const ticketId = req.params.tid
        if (!isValidObjectId(ticketId)) {
            return res.status(400).send('ID de ticket inválido');
        }
        const ticket = await ticketModel.findOne({ _id: ticketId });
        if (!ticket) {
            return res.status(404).send('Ticket no encontrado');
        }
        res.status(200).send(ticket);

    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar ticket: ${error}`)
    }
}
//Crear Ticket de compra
export const createTicket = async (req, res) => {
    try {
        const cartId = req.params.cid;
        console.log('Processing purchase for cart ID:', cartId);

        const cart = await cartModel.findById(cartId);
        const prodSinStock = [];
        if (cart) {

            for (const prod of cart.products) {
                let producto = await productModel.findById(prod.id_prod);
                if (producto.stock < prod.quantity) {
                    prodSinStock.push(producto);
                }
            }
        }else {
              return res.status(404).send("Carrito no existe");
        }

        // Si no hay productos sin stock finaliza la compra
        if (prodSinStock.length === 0) {
            const totalPrice = cart.products.reduce((total, prod) => {
                return total + (prod.quantity * prod.id_prod.price);
            }, 0);


        // Generar el ticket nuevo
            const newTicket = await ticketModel.create({
                code: crypto.randomUUID(),
                purchaser: req.user.email,
                amount: totalPrice,
                products: cart.products
            });

            res.status(200).send(newTicket)
        } else {

        res.status(400).send({ 
            message: "Algunos productos no tienen suficiente stock", 
            products: prodSinStock 
        })
 }
    } catch (e) {

    res.status(500).send(`Error interno del servidor al crear ticket: ${e.message}`);
}
}

// Agregar producto al carrito

export const insertProductCart = async (req, res) => {
    try {
        if (req.user && (req.user.role === "User")) {
            const cartId = req.params.cid
            const productId = req.params.pid
            const { quantity } = req.body
            
            if (!isValidObjectId(cartId)) {
                return res.status(400).send('ID de carrito inválido');
            }
            if (!isValidObjectId(productId)) {
                return res.status(400).send('ID de producto inválido');
            }       
            
            const cart = await cartModel.findById(cartId)

            if (!cart) {
                return res.status(404).send("Carrito no encontrado");
            }

            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(404).send('Product not found');
            }

              const indice = cart.products.findIndex(product => product.id_prod == productId);


            if (indice !== -1) {
                cart.products[indice].quantity += quantity;
            } else {

                cart.products.push({ id_prod: productId, quantity: quantity, title: product.title, description: product.description, price: product.price});
            }

            console.log('Cart before update:', cart);
            const updatedCart = await cartModel.findByIdAndUpdate(cartId, { products: cart.products }, { new: true });
            console.log('Updated Cart:', updatedCart);


            res.status(200).send(updatedCart);
        } else {
            res.status(403).send("Usuario no autorizado");
        }

    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).send(`Error interno del servidor al actualizar carrito: ${error.message}`);
    }
}

export const deleteFromCart = async (req, res) => {
    try {
        const idProducto = req.params.pid
        const idCart = req.params.cid
        const cart = await cartModel.findById(idCart)
        const indice = cart.products.findIndex(product => product.id_prod == idProducto)
        if ( indice != -1) {
            cart.products.splice(indice, 1)
            const mensaje = await cartModel.findByIdAndUpdate(idCart, cart)
            res.status(200).send(mensaje)}
    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar el producto: ${error}`)
    }
}