async function fetchProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();
    
    const productList = document.getElementById('productsRender');
    productList.innerHTML = '';
    products.forEach(product => {
        if(!product.thumbnail) {
            product.thumbnail = 'https://i.pinimg.com/originals/ab/ae/30/abae3096c581937d09f912b18dd19504.png'
        }
        const productElement = document.createElement('div');
        productElement.innerHTML = 
        `
            <div class="card" style="width: 18rem;">
                <img src="${product.thumbnail}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Nombre del producto: ${product.title}</h5>
                    <p class="card-text">Descripción: ${product.description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Precio: $${product.price}</li>
                    <li class="list-group-item">Category: ${product.category}</li>
                    <li class="list-group-item">Stock: ${product.stock}</li>
                    <li class="list-group-item">Código: ${product.code}</li>
                </ul>
                <!-- AGREGAR AL CARRITO -->
                <div class="card-body">
                    <button onclick="deleteProduct('${product._id}')" class="btn btn-danger btn-block btn-sm">Eliminar Producto</button>         
                </div>
            </div>
            `;
            productElement.className = 'col-md-4 col-sm-3 col-12 mb-2 mt-2'
            productList.appendChild(productElement);
    });
}

async function deleteProduct(productId) {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        fetchProducts();
        alert('Producto eliminado exitosamente');
    } else {
        alert('Error al eliminar el producto');
    }
}

async function editProduct(productId) {
    const response = await fetch(`/api/products/${productId}`);
    const product = await response.json();

    document.getElementById('productId').value = product._id;
    document.getElementById('title').value = product.title;
    document.getElementById('description').value = product.description;
    document.getElementById('stock').value = product.stock;
    document.getElementById('category').value = product.category;
    document.getElementById('status').value = product.status;
    document.getElementById('code').value = product.code;
    document.getElementById('price').value = product.price;
}

fetchProducts();