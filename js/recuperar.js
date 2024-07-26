document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del modal
    const modal = document.getElementById('reset-password-modal');
    const openModalButton = document.getElementById('open-reset-modal');
    const closeModalButton = document.getElementById('close-reset-modal');
    const form = document.getElementById('reset-password-form');
    const messageDiv = document.getElementById('reset-message');

    // Abrir el modal
    openModalButton.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        modal.style.display = 'block';
    });

    // Cerrar el modal
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cerrar el modal si el usuario hace clic fuera del contenido del modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Manejar el envío del formulario
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evitar el envío del formulario de la manera tradicional

        const email = document.getElementById('reset-email').value;

        try {
            const response = await fetch('/request-password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const result = await response.json();
            if (result.success) {
                messageDiv.textContent = 'Enlace de recuperación enviado. Revisa tu correo electrónico.';
            } else {
                messageDiv.textContent = 'No se pudo enviar el enlace de recuperación. Verifica tu dirección de correo electrónico.';
            }
        } catch (error) {
            messageDiv.textContent = 'Ocurrió un error al enviar el enlace de recuperación.';
        }
    });
});