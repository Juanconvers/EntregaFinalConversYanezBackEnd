async function fetchProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();
    const card = document.querySelector('#productsRender');
    
    products.docs.forEach (product => {
        const print = document.createElement('div');
        card.innerHTML = `
            <p>Nombre</p>
            <div>${product.title}</div>
            <p>Descripción</p>
            <div>${product.description}</div>
            <p>En Stock</p>
            <div>${product.stock}</div>
            <p>Categoría</p>
            <div>${product.category}</div>
            <p>Código</p>
            <div>${product.code}</div>
            <p>Precio</p>
            <div>${product.price}</div>
            <div>
                <button onclick="deleteProduct('${product._id}')">Eliminar producto</button>
            </div>
        `;
        div.appendChild(div);
    });
}

async function deleteProduct(productId) {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        fetchProducts();
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

document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const productId = document.getElementById('productId').value;
    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
        status: document.getElementById('status').value === 'true',
        code: document.getElementById('code').value,
        price: document.getElementById('price').value
    };

    let response;
    if (productId) {
        response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
    } else {
        response = await fetch('/api/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
    }

    if (response.ok) {
        fetchProducts();
        document.getElementById('productForm').reset();
    } else {
        alert('Error al guardar el producto');
    }
});

fetchProducts();