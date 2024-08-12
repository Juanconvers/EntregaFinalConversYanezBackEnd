document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const ticketId = urlParams.get('ticketId');

    const response = await fetch(`/api/cart/ticket/${ticketId}`);
    const ticket = await response.json();

    const ticketInfoElement = document.getElementById('ticket-info');
    ticketInfoElement.innerHTML = `
        <h2>Detalles del Ticket</h2>
        <p><strong>Comprador:</strong> ${ticket.purchaser}</p>
        <p><strong>Fecha de Compra:</strong> ${new Date(ticket.purchase_datetime).toLocaleString()}</p>
        <h2>Productos</h2>
        <div class="product-details">
            ${ticket.products.map(product => `
                ${product.id_prod ? `
                    <div>
                        <h3>${product.id_prod.title}</h3>
                        <p>Descripción: ${product.id_prod.description}</p>
                        <p>Precio: $${product.id_prod.price}</p>
                        <p>Cantidad: ${product.quantity}</p>
                        <hr>
                    </div>
                ` : ''}
            `).join('')}
        </div>
        <h2>Total: $${ticket.amount}</h2>
    `;

    document.getElementById('home').addEventListener('click', function () {
        window.location.href = '/home';
    });
});