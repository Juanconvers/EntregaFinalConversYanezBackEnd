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
        products.forEach(product => {
            const productElement = document.createElement('div');
            if(!product.thumbnail) {
                product.thumbnail = 'https://i.pinimg.com/originals/ab/ae/30/abae3096c581937d09f912b18dd19504.png'
            }
            productElement.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${product.thumbnail}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">$${product.price}</li>
                    <li class="list-group-item">${product.stock} en stock</li>

                </ul>
                <!-- AGREGAR AL CARRITO -->
                <input type="number" id="quantity-${product._id}" class="form-control" placeholder="Cantidad" />
                <div class="card-body">
                    <button onclick="addToCart('${userSession.cartId._id}', '${product._id}')" class="btn btn-success btn-block btn-sm">Agregar al Carrito</button>         
                </div>
            </div>
            `;
            productElement.className = 'col-md-4 col-sm-3 col-12 mb-2 mt-2'
            productList.appendChild(productElement);
        });
    }

    renderProducts(products);

    window.addToCart = async function (cartId, productId) {
        const quantityInput = document.getElementById('quantity-'+productId);
        const quantity = quantityInput.value;

        if (!quantity || quantity <= 0) {
            alert('Por favor, ingresa una cantidad válida.');
            return;
        }

        const response = await fetch('/api/cart/'+cartId+'/products/'+productId, {
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