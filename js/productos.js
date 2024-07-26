document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('#product-container .card');
    const productsPerPage = 4;
    const paginationContainer = document.getElementById('pagination');
    let currentPage = 1;
    const totalPages = Math.ceil(products.length / productsPerPage);

    function showPage(page) {
        // Ocultar todos los productos
        products.forEach(product => product.classList.remove('show'));

        // Calcular los índices de los productos a mostrar
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;

        // Mostrar los productos de la página actual
        for (let i = start; i < end && i < products.length; i++) {
            products[i].classList.add('show');
        }

        // Actualizar la paginación
        updatePagination(page);
    }

    function updatePagination(page) {
        paginationContainer.innerHTML = '';

        // Flecha hacia atrás
        const prevArrow = document.createElement('span');
        prevArrow.innerHTML = '&laquo;';
        prevArrow.className = 'arrow';
        if (page === 1) {
            prevArrow.classList.add('disabled');
        } else {
            prevArrow.addEventListener('click', () => showPage(page - 1));
        }
        paginationContainer.appendChild(prevArrow);

        // Botones de página
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            if (i === page) {
                button.disabled = true;
            }
            button.addEventListener('click', () => showPage(i));
            paginationContainer.appendChild(button);
        }

        // Flecha hacia adelante
        const nextArrow = document.createElement('span');
        nextArrow.innerHTML = '&raquo;';
        nextArrow.className = 'arrow';
        if (page === totalPages) {
            nextArrow.classList.add('disabled');
        } else {
            nextArrow.addEventListener('click', () => showPage(page + 1));
        }
        paginationContainer.appendChild(nextArrow);
    }

    // Mostrar la primera página
    showPage(currentPage);
});