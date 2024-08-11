document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Problema de red');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
                if (Array.isArray(data.docs)) {
                const container = document.getElementById('products-container');
                const imageBaseUrl = '/img/products/';
                container.innerHTML = data.docs.map(product => {
                    const imageUrl = `${imageBaseUrl}${product.thumbnail}`;
                    console.log(`Image URL: ${imageUrl}`);

                    return `
                    <div class="product">
                        <img src="${imageUrl}" alt="${product.title}" />
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <p>Price: $${product.price}</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn" data-action="decrement" data-id="${product._id}">-</button>
                            <span class="quantity" id="quantity-${product._id}">0</span>
                            <button class="quantity-btn" data-action="increment" data-id="${product._id}">+</button>
                        </div>
                        <button class="add-to-cart" data-id="${product._id}">Add to Cart</button>
                    </div>
                `;
                }).join('');

                document.querySelectorAll('.quantity-btn').forEach(button => {
                    button.addEventListener('click', handleQuantityChange);
                });
                document.querySelectorAll('.add-to-cart').forEach(button => {
                    button.addEventListener('click', handleAddToCart);
                });
            } else {
                console.error('No llegó un array, llegó:', data);
            }
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });
});

        // Función para agregar una cantidad de un producto

function handleQuantityChange(event) {
    const button = event.target;
    const action = button.getAttribute('data-action');
    const productId = button.getAttribute('data-id');
    const quantityElement = document.getElementById(`quantity-${productId}`);   
    const quantity = parseInt(quantityElement.textContent);
    console.log(`Quantity for product ${productId}:`, quantity);

    if (action === 'increment') {
        quantity += 1;
    } else if (action === 'decrement' ) {
        quantity = Math.max(0, quantity - 1);
    }

    console.log(`Cantidad de producto actualizada ${productId}:`, quantity);


    quantityElement.textContent = quantity;
}

        // Función para agregar productos al carro

function handleAddToCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).textContent);
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const product = {
        _id: productId,
        title: button.parentElement.querySelector('h2').textContent,
        description: button.parentElement.querySelector('p').textContent,
        price: parseFloat(button.parentElement.querySelector('p').textContent.replace('Price: $', '')),
        quantity: quantity,

    };
    const existingProductIndex = cartItems.findIndex(item => item.id === productId);

    if (existingProductIndex > -1) {
        cartItems[existingProductIndex].quantity += quantity;
    } else {
        cartItems.push(product);
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    incrementCartCount();
    incrementCartCount(quantity);

    console.log(`Cantidad:`, quantity);
    console.log(`Cantidad desde agregar producto ${productId}:`, quantity);

    const token = localStorage.getItem('token');
    const cartId = localStorage.getItem('cartId');

    console.log('Cart ID:', cartId);
    if (!token) {

                window.location.href = '/login';
            }
        return;
    }


    console.log(`Quantity before adding to cart: ${quantity}`);
    if (quantity > 0 && cartId) {

        fetch(`http://localhost:8000/api/cart/${cartId}/products/${productId}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ quantity: quantity }), 
            credentials: 'include'
        })
            .then(response => {
                console.log(cartId)
                if (!response.ok) {
                    throw new Error('Problema en la red')
                 }
                return response.json()
            })
            .then(result => {
                console.log(productId)
                if (result) {
                    document.getElementById(`quantity-${productId}`).textContent = '0'
                    incrementCartCount(quantity)
                    console.log('Unable to add item to cart.')
                } else {
                console.log('No es posible agregar el producto al carrito.')
                }
            })
            .catch(error => {
                console.error('Error agregando productos al carrito:', error)
            })
    } else {
        console.error('Cantidad en cart ID invalida:', { quantity, cartId })
    }


