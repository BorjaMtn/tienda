document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#btn-one').addEventListener('click', function () {
		html2canvas(document.querySelector('#order-summary'), { scale: 2 }).then((canvas) => {
			let base64image = canvas.toDataURL('image/png');
			let pdf = new jsPDF('p', 'pt', 'a4'); // Usa 'a4' para tamaño de página estándar
			let pdfWidth = 595.28; // Ancho de la página en puntos (A4)
			let pdfHeight = 841.89; // Alto de la página en puntos (A4)
			
			let imgWidth = canvas.width;
			let imgHeight = canvas.height;
			let ratio = pdfWidth / imgWidth;

			pdf.addImage(base64image, 'PNG', 0, 0, pdfWidth, imgHeight * ratio);
			pdf.save('factura-pedido.pdf');
		});
	});

	
});