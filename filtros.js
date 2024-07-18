document.addEventListener('DOMContentLoaded', function() {
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const minPriceValue = document.getElementById('minPriceValue');
    const maxPriceValue = document.getElementById('maxPriceValue');
    const priceRangeDisplay = document.getElementById('priceRangeDisplay');

    function updatePriceRange() {
        let min = parseInt(minPrice.value);
        let max = parseInt(maxPrice.value);

        // Validar y ajustar el rango de precios
        if (min > max) {
            max = min;
            maxPrice.value = max;
        }
        if (max < min) {
            min = max;
            minPrice.value = min;
        }

        // Asegurar que los valores no sean negativos
        min = Math.max(min, 0);
        max = Math.max(max, 0);

        // Actualizar los valores mostrados
        minPriceValue.textContent = min;
        maxPriceValue.textContent = max;
        priceRangeDisplay.textContent = `€${min} - €${max}`;
    }

    // Escuchar eventos de cambio en los inputs
    minPrice.addEventListener('input', updatePriceRange);
    maxPrice.addEventListener('input', updatePriceRange);

    // Llamar a updatePriceRange() inicialmente para establecer el rango de precios inicial
    updatePriceRange();
});



document.addEventListener('DOMContentLoaded', function() {
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    clearFiltersBtn.addEventListener('click', function() {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false; // Desmarcar todas las casillas de verificación
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const filtersForm = document.getElementById('filtersForm');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    clearFiltersBtn.addEventListener('click', function() {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false; // Desmarcar todas las casillas de verificación
        });
    });

    filtersForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto
        
        // Aquí puedes realizar alguna acción con los filtros seleccionados
        let selectedFilters = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.name);
        
        console.log('Filtros seleccionados:', selectedFilters);
        // Aquí puedes aplicar los filtros seleccionados, por ejemplo, filtrar productos, etc.
    });
});

