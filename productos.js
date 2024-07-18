document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('productsContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const productsPerPage = 3; // Número de productos por página
    let currentPage = 1; // Página inicial

    let products = Array.from(productsContainer.querySelectorAll('.product'));

    // Función para mostrar los productos de la página actual
    function showCurrentPageProducts() {
        // Ocultar todos los productos
        products.forEach(product => {
            product.style.display = 'none';
        });

        // Calcular el rango de productos a mostrar
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;

        // Mostrar los productos en el rango actual
        for (let i = startIndex; i < endIndex && i < products.length; i++) {
            products[i].style.display = 'block';
        }

        // Ocultar el botón si no hay más productos por mostrar
        if (endIndex >= products.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    // Manejar el clic en el botón "Cargar más"
    loadMoreBtn.addEventListener('click', function() {
        currentPage++;
        showCurrentPageProducts();
    });

    // Mostrar los primeros productos al inicio
    showCurrentPageProducts();
});
