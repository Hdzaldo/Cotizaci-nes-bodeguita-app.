let cotizacion = {
    nombre: '',
    cliente: '',
    rfc: '',
    telefono: '',
    email: '',
    productos: [],
    comentarios: '',
    totalSinIVA: 0
};

function agregarProducto() {
    const producto = document.getElementById("producto").value;
    const cantidad = parseFloat(document.getElementById("cantidad").value);
    const precio = parseFloat(document.getElementById("precio").value);

    if (producto && cantidad > 0 && precio >= 0) {
        const total = cantidad * precio;
        cotizacion.productos.push({ producto, cantidad, precio, total });

        document.getElementById("producto").value = '';
        document.getElementById("cantidad").value = 1;
        document.getElementById("precio").value = 0;

        actualizarVistaProductos();
        alert("Producto agregado.");
    } else {
        alert("Por favor, ingresa datos válidos para el producto.");
    }
}

function actualizarVistaProductos() {
    const vistaProductos = document.getElementById("vista-productos");
    vistaProductos.innerHTML = '';
    cotizacion.productos.forEach((prod, i) => {
        const p = document.createElement('p');
        p.textContent = `${prod.producto} - ${prod.cantidad} x $${prod.precio.toFixed(2)} = $${prod.total.toFixed(2)}`;
        vistaProductos.appendChild(p);
    });
}

function calcularTotales() {
    const totalSinIVA = cotizacion.productos.reduce((acc, prod) => acc + prod.total, 0);
    cotizacion.totalSinIVA = totalSinIVA;
    document.getElementById("total-sin-iva").textContent = totalSinIVA.toFixed(2);
}

function finalizarCotizacion() {
    cotizacion.nombre = document.getElementById("nombre-cotizacion").value || 'Sin nombre';
    cotizacion.cliente = document.getElementById("cliente").value || 'No proporcionado';
    cotizacion.rfc = document.getElementById("rfc").value || 'No proporcionado';
    cotizacion.telefono = document.getElementById("telefono").value || 'No proporcionado';
    cotizacion.email = document.getElementById("email").value || 'No proporcionado';
    cotizacion.comentarios = document.getElementById("comentarios").value || 'No hay comentarios adicionales';

    calcularTotales();

    document.getElementById("formulario").classList.add("hidden");
    document.getElementById("vista-previa").classList.remove("hidden");

    document.getElementById("vista-nombre-cotizacion").textContent = cotizacion.nombre;
    document.getElementById("vista-cliente").textContent = cotizacion.cliente;
    document.getElementById("vista-rfc").textContent = cotizacion.rfc;
    document.getElementById("vista-telefono").textContent = cotizacion.telefono;
    document.getElementById("vista-email").textContent = cotizacion.email;
    document.getElementById("vista-comentarios").textContent = cotizacion.comentarios;

    actualizarVistaProductos();
}

function guardarCotizacion() {
    const cotizacionesGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    cotizacionesGuardadas.push(cotizacion);
    localStorage.setItem("cotizaciones", JSON.stringify(cotizacionesGuardadas));
    alert("Cotización guardada exitosamente.");
    resetFormulario();
}

function resetFormulario() {
    cotizacion = {
        nombre: '',
        cliente: '',
        rfc: '',
        telefono: '',
        email: '',
        productos: [],
        comentarios: '',
        totalSinIVA: 0
    };

    document.querySelectorAll("input, textarea").forEach(el => el.value = '');
    document.getElementById("formulario").classList.remove("hidden");
    document.getElementById("vista-previa").classList.add("hidden");
}

function exportarPDF() {
    const { jsPDF } = window.jspdf;

    html2canvas(document.getElementById("vista-previa")).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        const nombreArchivo = cotizacion.nombre.replace(/\s+/g, "_").toLowerCase() || "cotizacion";
        pdf.save(`${nombreArchivo}.pdf`);
    });
}

function exportarJPG() {
    html2canvas(document.getElementById("vista-previa")).then(canvas => {
        const link = document.createElement("a");
        link.download = `${cotizacion.nombre.replace(/\s+/g, "_").toLowerCase() || "cotizacion"}.jpg`;
        link.href = canvas.toDataURL("image/jpeg");
        link.click();
    });
}

