document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("myModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const quantityInput = document.getElementById("quantity");
    const increaseBtn = document.getElementById("increase");
    const decreaseBtn = document.getElementById("decrease");
    const addToCartBtn = document.getElementById("addToCart");
    const closeBtn = document.querySelector(".close");
    const cartCounter = document.getElementById("cartCounter");
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    document.querySelectorAll('.more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const productId = card.getAttribute('custom-id');
            modalTitle.textContent = card.getAttribute('data-title');
            modalDescription.textContent = card.getAttribute('data-description');
            quantityInput.value = cart[productId] || 1;
            addToCartBtn.setAttribute('custom-id', productId);
            modal.style.display = "flex";
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    increaseBtn.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    decreaseBtn.addEventListener('click', () => {
        if (quantityInput.value > 0) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    addToCartBtn.addEventListener('click', function()  {
        const productId = this.getAttribute('custom-id');
        cart[productId] = parseInt(quantityInput.value);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
        modal.style.display = "none";
    });

    function updateCartCounter() {
        const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
        if (totalItems > 0) {
            cartCounter.textContent = totalItems;
            cartCounter.style.display = 'block';
        } else {
            cartCounter.style.display = 'none';
        }
    }

});