function updateCartCount(count) {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = count;
}

function getCartCount() {
    return parseInt(localStorage.getItem('cartCount') || '0');
}

document.addEventListener('DOMContentLoaded', () => {
    const cartCount = getCartCount();
    updateCartCount(cartCount);
});

function incrementCartCount(amount = 1) {
    let currentCount = getCartCount();
    currentCount += amount;
    localStorage.setItem('cartCount', currentCount);
    updateCartCount(currentCount);
}

window.incrementCartCount = incrementCartCount;