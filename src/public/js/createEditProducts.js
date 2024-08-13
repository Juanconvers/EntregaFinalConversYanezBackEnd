
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const productId = document.getElementById('productId').value;
    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
        code: document.getElementById('code').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };

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
        document.getElementById('productForm').reset();
        alert('Producto creado exitosamente');
    } else {
        alert('Error al guardar el producto');
    }
});
