document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carousel");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let counter = 0;
    let cardWidth; // Variable para almacenar el ancho de cada tarjeta
    let visibleCards; // Número de cartas visibles a la vez

    // Función para inicializar y actualizar el estado de los botones de navegación
    function updateNavButtons() {
        // Recalcular cardWidth y visibleCards cada vez que se llama a updateNavButtons
        cardWidth = carousel.querySelector(".card").offsetWidth + 200;
        visibleCards = Math.floor(carousel.offsetWidth / cardWidth);

        // Si hay espacio para avanzar más, habilitar el botón next; de lo contrario, deshabilitarlo
        // Calcular cuántas tarjetas quedan a la derecha
        const remainingCards = carousel.children.length - (counter + visibleCards);

        // Mostrar u ocultar el botón next dependiendo de si quedan tarjetas a la derecha
        nextBtn.style.visibility = remainingCards > 0 ? "visible" : "hidden";

        // Mostrar o ocultar el botón prev dependiendo de la posición actual
        if (counter === 0) {
            prevBtn.style.visibility = "hidden";
        } else {
            prevBtn.style.visibility = "visible";
        }

    }

    // Actualizar el estado inicial de los botones
    updateNavButtons();

    // Manejar el clic en el botón next
    nextBtn.addEventListener("click", () => {
        if (counter < carousel.children.length - visibleCards) {
            counter++;
            carousel.style.transform = `translateX(${-cardWidth * counter}px)`;
            updateNavButtons();
        }
    });

    // Manejar el clic en el botón prev
    prevBtn.addEventListener("click", () => {
        if (counter > 0) {
            counter--;
            carousel.style.transform = `translateX(${-cardWidth * counter}px)`;
            updateNavButtons();
        }
    });

    // Manejar el redimensionamiento de la ventana para actualizar visibleCards
    window.addEventListener("resize", () => {
        updateNavButtons();
    });
});
