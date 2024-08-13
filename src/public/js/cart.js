document.addEventListener('DOMContentLoaded', async function () {

    const sessionResponse = await fetch('/api/users/session');
    const userSession = await sessionResponse.json();

    const userInfoElement = document.getElementById('user-info');
    userInfoElement.textContent = `Usuario: ${userSession.email} `;
    console.log(userSession);
    const response = await fetch(`/api/cart/${userSession.cartId._id}`);
    const cart = await response.json();

    function renderCartProducts(cart) {
        const cartProductsElement = document.getElementById('cart-products');
        cartProductsElement.innerHTML = '';
        cart.products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.innerHTML = `
                <h2>${product.id_prod.title}</h2>
                <p>Descripción: ${product.id_prod.description}</p>
                <p>Precio: $${product.id_prod.price}</p>
                <p>Cantidad: ${product.quantity}</p>
                <hr>
            `;
            cartProductsElement.appendChild(productElement);
        });
    }

    renderCartProducts(cart);

    async function Purchase() {
        const response = await fetch(`/api/cart/${userSession.cartId._id}/purchase`, {
            method: 'POST'
        });
        if (response.ok) {
            const data = await response.json();
            const ticketUrl = `/ticket?ticketId=${data._id}`;
            window.location.href = ticketUrl;
            history.pushState(null, '', ticketUrl);
            
        } else {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
        }
    }

    document.getElementById('go-to-ticket').addEventListener('click', Purchase);

    document.getElementById('home').addEventListener('click', function () {
        window.location.href = '/home';
    });
});