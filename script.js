let cotizacion = {
    nombre: '',
    cliente: '',
    rfc: '',
    telefono: '',
    email: '',
    productos: [],
    comentarios: ''
};

// Agregar producto
function agregarProducto() {
    const producto = document.getElementById("producto").value;
    const cantidad = document.getElementById("cantidad").value;
    const precio = document.getElementById("precio").value;

    if (producto && cantidad > 0 && precio > 0) {
        const total = cantidad * precio;
        cotizacion.productos.push({ producto, cantidad, precio, total });

        document.getElementById("producto").value = '';
        document.getElementById("cantidad").value = 1;
        document.getElementById("precio").value = 0;

        alert("Producto agregado.");
    } else {
        alert("Por favor, ingresa datos válidos para el producto.");
    }
}

// Finalizar cotización
function finalizarCotizacion() {
    cotizacion.nombre = document.getElementById("nombre-cotizacion").value || 'Sin nombre';
    cotizacion.cliente = document.getElementById("cliente").value || 'No proporcionado';
    cotizacion.rfc = document.getElementById("rfc").value || 'No proporcionado';
    cotizacion.telefono = document.getElementById("telefono").value || 'No proporcionado';
    cotizacion.email = document.getElementById("email").value || 'No proporcionado';
    cotizacion.comentarios = document.getElementById("comentarios").value || 'No hay comentarios adicionales';

    mostrarVistaPrevia();
}

// Mostrar vista previa
function mostrarVistaPrevia() {
    document.getElementById("formulario").classList.add("hidden");
    document.getElementById("vista-previa").classList.remove("hidden");

    document.getElementById("vista-nombre-cotizacion").textContent = cotizacion.nombre;
    document.getElementById("vista-cliente").textContent = cotizacion.cliente;
    document.getElementById("vista-rfc").textContent = cotizacion.rfc;
    document.getElementById("vista-telefono").textContent = cotizacion.telefono;
    document.getElementById("vista-email").textContent = cotizacion.email;

    let productosHTML = "";
    cotizacion.productos.forEach((prod, index) => {
        productosHTML += `<p>${prod.producto} - ${prod.cantidad} x $${prod.precio} = $${prod.total}</p>`;
    });

    document.getElementById("vista-productos").innerHTML = productosHTML;
    document.getElementById("vista-comentarios").textContent = cotizacion.comentarios;
}

// Guardar cotización en el almacenamiento local
function guardarCotizacion() {
    const cotizacionesGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    cotizacionesGuardadas.push(cotizacion);
    localStorage.setItem("cotizaciones", JSON.stringify(cotizacionesGuardadas));
    alert("Cotización guardada exitosamente.");
    resetFormulario();
}

// Limpiar formulario y datos
function resetFormulario() {
    cotizacion = {
        nombre: '',
        cliente: '',
        rfc: '',
        telefono: '',
        email: '',
        productos: [],
        comentarios: ''
    };

    document.getElementById("nombre-cotizacion").value = '';
    document.getElementById("cliente").value = '';
    document.getElementById("rfc").value = '';
    document.getElementById("telefono").value = '';
    document.getElementById("email").value = '';
    document.getElementById("producto").value = '';
    document.getElementById("cantidad").value = 1;
    document.getElementById("precio").value = 0;
    document.getElementById("comentarios").value = '';

    document.getElementById("formulario").classList.remove("hidden");
    document.getElementById("vista-previa").classList.add("hidden");
}

// Exportar a PDF
function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Cotización: " + cotizacion.nombre, 10, 10);
    doc.text("Cliente: " + cotizacion.cliente, 10, 20);
    doc.text("RFC: " + cotizacion.rfc, 10, 30);
    doc.text("Teléfono: " + cotizacion.telefono, 10, 40);
    doc.text("Email: " + cotizacion.email, 10, 50);
    doc.text("Comentarios: " + cotizacion.comentarios, 10, 60);

    cotizacion.productos.forEach((prod, index) => {
        doc.text(`${prod.producto} - ${prod.cantidad} x $${prod.precio} = $${prod.total}`, 10, 70 + (index * 10));
    });

    doc.save(cotizacion.nombre + ".pdf");
}

// Exportar a JPG
function exportarJPG() {
    const cotizacionDiv = document.getElementById("vista-previa");

    html2canvas(cotizacionDiv).then(canvas => {
        const imgData = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = cotizacion.nombre + ".jpg";
        link.click();
    });
}
