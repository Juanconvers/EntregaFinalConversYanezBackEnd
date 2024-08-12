function goToCart() {
    window.location.href = '/cart';
}
document.addEventListener('DOMContentLoaded', async function () {
    const sessionResponse = await fetch('/api/users/session');
    const userSession = await sessionResponse.json();

    const userInfoElement = document.getElementById('user-info');
    userInfoElement.textContent = `Usuario: ${userSession.email}`;

    const response = await fetch('/api/products');
    const products = await response.json();

    function renderProducts(products) {
        const productList = document.getElementById('product-list');
        products.docs.forEach(product => {
            const productElement = document.createElement('div');
            productElement.innerHTML = `
                <h2>${product.title}</h2>
                <p>Descripción: ${product.description}</p>
                <p>Precio: $${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <input type="number" id="quantity-${product._id}" placeholder="Cantidad">
                <button onclick="addToCart('${userSession.cart_id}', '${product._id}')">Agregar al Carrito</button>
                <hr>
            `;
            productList.appendChild(productElement);
        });
    }

    renderProducts(products);

    window.addToCart = async function (cartId, productId) {
        const quantityInput = document.getElementById(`quantity-${productId}`);
        const quantity = quantityInput.value;

        if (!quantity || quantity <= 0) {
            alert('Por favor, ingresa una cantidad válida.');
            return;
        }

        const response = await fetch(`/api/cart/${userSession.cart_id._id}/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity })
        });

        if (response.ok) {
            alert('Producto agregado al carrito correctamente');
        } else {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
        }
    }

});