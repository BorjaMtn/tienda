document.querySelector('.carrito').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('carritoContainer').classList.toggle('active');
});