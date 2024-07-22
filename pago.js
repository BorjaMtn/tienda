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


