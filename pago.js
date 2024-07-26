// Inicializa EmailJS
(function() {
    emailjs.init("bZ_CCRL5wtHVzFY_0"); // Reemplaza con tu clave pública
})();

function sendEmail() {
    const templateParams = {
        from_name: 'Tu Nombre',
        to_email: 'borjapachi@gmail.com', // Reemplaza con la dirección del destinatario
        message: 'Este es un mensaje de prueba enviado con EmailJS',
    };

    emailjs.send('service_qs625cl', 'template_w5qmey9', templateParams)
        .then(function(response) {
            console.log('Éxito:', response);
        }, function(error) {
            console.log('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const stepIndicators = document.querySelectorAll('.step-item');
    const totalSteps = steps.length;
    let currentStep = 0;

    function showStep(index) {
        if (index < 0 || index >= totalSteps) return;

        // Ocultar todos los pasos
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === index);
        });

        // Actualizar los indicadores de pasos
        stepIndicators.forEach((indicator, i) => {
            indicator.classList.remove('active', 'completed'); // Limpiar clases
            if (i < index) {
                indicator.classList.add('completed'); // Pasos anteriores completados
            } else if (i === index) {
                indicator.classList.add('active'); // Paso actual activo
            }
        });

        // Enviar el correo cuando se llegue al paso 4 (índice 3)
        if (index === 3) { // Paso 4 (índice 3)
            sendEmail();
        }
    }

    function handlePopState(event) {
        if (event.state && event.state.step !== undefined) {
            showStep(event.state.step);
        }
    }

    document.getElementById('next-to-step-2').addEventListener('click', () => {
        showStep(1);
    });

    document.getElementById('prev-to-step-1').addEventListener('click', () => {
        showStep(0);
    });

    document.getElementById('next-to-step-3').addEventListener('click', () => {
        showStep(2);
    });

    document.getElementById('prev-to-step-2').addEventListener('click', () => {
        showStep(1);
    });

    document.getElementById('confirm-order').addEventListener('click', () => {
        showStep(3);
    });

    // Mostrar el paso actual basado en el estado del historial
    const hash = window.location.hash;
    if (hash) {
        const stepMatch = hash.match(/#step-(\d+)/);
        if (stepMatch) {
            const stepIndex = parseInt(stepMatch[1], 10) - 1;
            showStep(stepIndex);
        }
    } else {
        showStep(currentStep);
    }

    // Manejar los cambios de historial
    window.addEventListener('popstate', handlePopState);
});

// Manejo del método de pago
document.addEventListener('DOMContentLoaded', () => {
    const paymentMethodSelect = document.getElementById('payment-method');
    const creditCardSection = document.getElementById('credit-card-section');
    const paypalSection = document.getElementById('paypal-section');
    const paypalButtonContainer = document.getElementById('paypal-button-container');

    // Manejar el cambio en el método de pago
    paymentMethodSelect.addEventListener('change', (event) => {
        const selectedMethod = event.target.value;

        // Ocultar todas las secciones de pago
        creditCardSection.classList.remove('active');
        paypalSection.classList.remove('active');

        // Mostrar la sección correspondiente
        if (selectedMethod === 'credit-card') {
            creditCardSection.classList.add('active');
            paypalButtonContainer.style.display = 'none'; // Ocultar el botón de PayPal
        } else if (selectedMethod === 'paypal') {
            paypalSection.classList.add('active');
            paypalButtonContainer.style.display = 'block'; // Mostrar el botón de PayPal

            // Configurar el botón de PayPal
            paypal.Buttons({
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: '10.00' // Monto del pedido
                            }
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        alert('Pago completado por ' + details.payer.name.given_name);
                        // Puedes redirigir al usuario a una página de éxito aquí
                    });
                },
                onError: function(err) {
                    console.error('Error en el pago:', err);
                }
            }).render('#paypal-button-container');
        }
    });

    // Mostrar la sección correcta al cargar la página
    const initialMethod = paymentMethodSelect.value;
    if (initialMethod === 'credit-card') {
        creditCardSection.classList.add('active');
        paypalButtonContainer.style.display = 'none'; // Ocultar el botón de PayPal
    } else if (initialMethod === 'paypal') {
        paypalSection.classList.add('active');
        paypalButtonContainer.style.display = 'block'; // Mostrar el botón de PayPal
    }
});

// Manejo de los modales
document.addEventListener('DOMContentLoaded', () => {
    // Elements for shipping modal
    const shippingModal = document.getElementById('shipping-modal');
    const openShippingModalButton = document.getElementById('open-shipping-modal');
    const closeShippingModalButton = document.getElementById('close-shipping-modal');

    // Elements for billing modal
    const billingModal = document.getElementById('billing-modal');
    const openBillingModalButton = document.getElementById('open-billing-modal');
    const closeBillingModalButton = document.getElementById('close-billing-modal');

    // Functions to open and close shipping modal
    openShippingModalButton.addEventListener('click', () => {
        shippingModal.style.display = 'block';
    });

    closeShippingModalButton.addEventListener('click', () => {
        shippingModal.style.display = 'none';
    });

    // Functions to open and close billing modal
    openBillingModalButton.addEventListener('click', () => {
        billingModal.style.display = 'block';
    });

    closeBillingModalButton.addEventListener('click', () => {
        billingModal.style.display = 'none';
    });

    // Close modals when clicking outside of them
    window.addEventListener('click', (event) => {
        if (event.target === shippingModal) {
            shippingModal.style.display = 'none';
        }
        if (event.target === billingModal) {
            billingModal.style.display = 'none';
        }
    });
});

// Funciones para ocultar y mostrar formularios de edición
function hideAllEditors() {
    document.getElementById('edit-form-container').classList.add('hidden');
    document.getElementById('edit-envio-form-container').classList.add('hidden');
    document.getElementById('edit-facturacion-form-container').classList.add('hidden');
}

function showEditorAndScroll(editorId) {
    hideAllEditors(); // Ocultar otros editores antes de mostrar el actual
    const editor = document.getElementById(editorId);
    editor.classList.remove('hidden');
    // Desplazar hacia el editor con un pequeño retraso para asegurar la visibilidad
    setTimeout(() => {
        editor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100); // Ajusta el tiempo si es necesario
}

// Mostrar el formulario de edición de teléfono
document.getElementById('edit-details-button').addEventListener('click', function() {
    showEditorAndScroll('edit-form-container');
});

// Cancelar la edición de teléfono
document.getElementById('cancel-edit-button').addEventListener('click', function() {
    document.getElementById('edit-form-container').classList.add('hidden');
});

// Mostrar el formulario de edición de dirección de envío
document.getElementById('edit-envio-button').addEventListener('click', function() {
    showEditorAndScroll('edit-envio-form-container');
});

// Cancelar la edición de dirección de envío
document.getElementById('cancel-edit-envio-button').addEventListener('click', function() {
    document.getElementById('edit-envio-form-container').classList.add('hidden');
});

// Mostrar el formulario de edición de dirección de facturación
document.getElementById('edit-facturacion-button').addEventListener('click', function() {
    showEditorAndScroll('edit-facturacion-form-container');
});

// Cancelar la edición de dirección de facturación
document.getElementById('cancel-edit-facturacion-button').addEventListener('click', function() {
    document.getElementById('edit-facturacion-form-container').classList.add('hidden');
});

// Función para cambiar de paso
function changeStep(newStepId) {
    // Ocultar el paso actual
    document.querySelector('.step:not(.hidden)').classList.add('hidden');

    // Mostrar el nuevo paso
    document.getElementById(newStepId).classList.remove('hidden');

    // Ocultar todos los editores al cambiar de paso
    hideAllEditors();
}

// Navegar entre pasos
document.getElementById('prev-to-step-1').addEventListener('click', function() {
    changeStep('step-1');
});

document.getElementById('next-to-step-3').addEventListener('click', function() {
    changeStep('step-3');
});

document.getElementById('confirm-order').addEventListener('click', function() {
    changeStep('step-4');
});

// Manejar la copia de dirección
document.getElementById('same-as-billing').addEventListener('change', function() {
    // Obtener los valores de la dirección de facturación
    const billingAddress = document.getElementById('billing-address').value;
    const billingCity = document.getElementById('billing-city').value;
    const billingPostalCode = document.getElementById('billing-postal-code').value;

    // Si el checkbox está marcado, copiar los valores a la dirección de envío
    if (this.checked) {
        document.getElementById('shipping-address').value = billingAddress;
        document.getElementById('shipping-city').value = billingCity;
        document.getElementById('shipping-postal-code').value = billingPostalCode;

        // Deshabilitar los campos de dirección de envío
        document.getElementById('shipping-address').disabled = true;
        document.getElementById('shipping-city').disabled = true;
        document.getElementById('shipping-postal-code').disabled = true;
    } else {
        // Si el checkbox no está marcado, permitir la edición de la dirección de envío
        document.getElementById('shipping-address').disabled = false;
        document.getElementById('shipping-city').disabled = false;
        document.getElementById('shipping-postal-code').disabled = false;
    }
});
