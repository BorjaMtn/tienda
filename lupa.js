document.onmousemove = ver;

        function ver(e) {
            var x, y, x1, x2, y1, y2, fact, opp;
            fact = 800 / 400;
            opp = 100;

            if (e == null) e = window.event;
            var rect = document.querySelector('.contendor-img').getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;

            // Asegurar que las coordenadas están dentro del contenedor
            x = Math.max(0, Math.min(x, rect.width));
            y = Math.max(0, Math.min(y, rect.height));

            x1 = -opp + x * fact;
            y1 = -opp + y * fact;
            x2 = opp + x * fact;
            y2 = opp + y * fact;

            var img2 = document.images.grande;
            img2.style.display = "inline";
            img2.style.left = (x * (1 - fact)) + 'px';
            img2.style.top = (y * (1 - fact)) + 'px';
            img2.style.clip = "rect(" + y1 + "px, " + x2 + "px, " + y2 + "px, " + x1 + "px)";
        }