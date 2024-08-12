import productModel from "../models/products.js";

//  Vistas de autenticación

export const loginView = async (req, res) => {

    res.render('templates/authentication/login', {
        css: 'login.css'
    })
}

export const registerView = async (req, res) => {

    res.render('templates/authentication/register', {
        css: 'register.css'
    })
}

//  Vistas del lado del usuario

export const renderProducts = async (req, res) => {

    const productosRender = await productModel.find().lean()
    console.log(productosRender)     
    res.render('templates/userside/home', {productosRender})
}

export const cartView = async (req, res) => {

    res.render('templates/userside/cart', {
        css: 'cart.css'
    })
}

export const ticketView = async (req, res) => {

    res.render('templates/userside/ticket', {
        css: 'ticket.css'
    })
}

//  Vistas del lado del administrador        

export const adminPanelView = async (req, res) => {
    res.render('templates/adminside/adminPanel', {
        css: 'createProduct.css'
    })
}

export const adminUsersView = async (req, res) => {
    res.render('templates/adminside/adminUsers', {
        css: 'createProduct.css'
    })
}

export const createEditProductView = async (req, res) => {
    res.render('templates/adminside/createEditProduct', {
        css: 'createProduct.css'
    })
}

//  Vistas Generales

export const errorView = async (req, res) => {

    res.render('templates/error', {
        css: 'error.css'
    })
}







    // const prods = [
    //     { id: 1, title: "Celular", price: 1500, img: "./img/170718249838066585_7797470128152.jpg" },
    //     { id: 2, title: "Televisor", price: 1800, img: "https://www.radiosapienza.com.ar/Image/0/500_500-526469_1.jpg" },
    //     { id: 3, title: "Tablet", price: 1200, img: "https://www.radiosapienza.com.ar/Image/0/500_500-526469_1.jpg" },
    //     { id: 4, title: "Notebook", price: 1900, img: "https://www.radiosapienza.com.ar/Image/0/500_500-526469_1.jpg" },
    //     { id: 5, title: "fuuufa", price: 7878787877788, img: "https://www.radiosapienza.com.ar/Image/0/500_500-526469_1.jpg" }
    // ]
