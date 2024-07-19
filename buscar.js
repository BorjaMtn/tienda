// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Obtener los elementos del DOM
    const searchButton = document.getElementById('searchButton');
    const searchModal = document.getElementById('searchModal');
    const closeModal = document.getElementById('closeModal');
    const searchForm = document.getElementById('searchForm');
    const searchInput = searchForm.querySelector('input[name="query"]');

    // Mostrar la ventana modal al hacer clic en el botón de búsqueda
    searchButton.addEventListener('click', function(event) {
        event.preventDefault(); // Previene cualquier comportamiento predeterminado
        if (searchModal.style.display === 'flex') {
            searchModal.style.display = 'none'; // Si el modal está visible, lo oculta
        } else {
            searchModal.style.display = 'flex'; // Muestra el modal
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    searchInput.focus(); // Intenta enfocar el campo de entrada
                });
            });
        }
    });

    // Ocultar la ventana modal al hacer clic en el botón de cerrar
    closeModal.addEventListener('click', function() {
        searchModal.style.display = 'none'; // Oculta el modal
    });

    // Ocultar la ventana modal al hacer clic fuera del contenido de la modal
    window.addEventListener('click', function(event) {
        if (event.target == searchModal) {
            searchModal.style.display = 'none'; // Oculta el modal
        }
    });

    // Manejar el envío del formulario de búsqueda
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene el envío del formulario por defecto

        // Aquí puedes manejar la búsqueda, por ejemplo, redirigiendo a una página de resultados
        const query = searchForm.querySelector('input[name="query"]').value;
        if (query) {
            // Redirigir a la página de resultados con el query
            window.location.href = `/search?query=${encodeURIComponent(query)}`;
        } else {
            alert("Por favor, ingresa un término de búsqueda.");
        }
    });
});
