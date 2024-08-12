document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const cartId = urlParams.get('cartId');

    const sessionResponse = await fetch('/api/users/session');
    const userSession = await sessionResponse.json();

    const userInfoElement = document.getElementById('user-info');
    userInfoElement.textContent = `Usuario: ${userSession.email} `;

    const response = await fetch(`/api/cart/${userSession.cart_id._id}`);
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
        const response = await fetch(`/api/cart/purchase/${userSession.cart_id._id}`, {
            method: 'GET'
        });
        if (response.ok) {
            const data = await response.json();
            window.location.href = `/ticket?ticketId=${data.ticketId}`;
            history.pushState(null, '', ticketUrl);
            alert('Compra finalizada correctamente');
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