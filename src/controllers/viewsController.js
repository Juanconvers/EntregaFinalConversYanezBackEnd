

export const getProductos = async (req, res) => {
    
        const prods = [
            { id: 1, title: "Celular", price: 1500, img: "./img/170718249838066585_7797470128152.jpg" },
            { id: 2, title: "Televisor", price: 1800, img: "https://www.radiosapienza.com.ar/Image/0/500_500-526469_1.jpg" },
            { id: 3, title: "Tablet", price: 1200, img: "https://www.radiosapienza.com.ar/Image/0/500_500-526469_1.jpg" },
            { id: 4, title: "Notebook", price: 1900, img: "https://www.radiosapienza.com.ar/Image/0/500_500-526469_1.jpg" },
            { id: 5, title: "fuuufa", price: 7878787877788, img: "https://www.radiosapienza.com.ar/Image/0/500_500-526469_1.jpg" }
        ]
    
        res.render('templates/index', {
            mostrarProductos: true,
            productos: prods,
            css: 'product.css'
        })
    }

    export const cartView = async (req, res) => {
    
        res.render('templates/cart', {
            css: 'cart.css'
        })
    }

    export const errorView = async (req, res) => {
    
        res.render('templates/error', {
            css: 'error.css'
        })
    }

    export const homeView = async (req, res) => {
    
        res.render('templates/home', {
             css: 'home.css'
        })
    }

    export const loginView = async (req, res) => {
    
        res.render('templates/login', {
            css: 'login.css'
        })
    }

    export const registerView = async (req, res) => {
    
        res.render('templates/register', {
            css: 'register.css'
        })
    }

    export const ticketView = async (req, res) => {
    
        res.render('templates/ticket', {
            css: 'ticket.css'
        })
    }