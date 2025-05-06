let cotizacion = {
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
        // Guardar el producto y mostrarlo
        const total = cantidad * precio;
        cotizacion.productos.push({ producto, cantidad, precio, total });

        // Limpiar campos de producto
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
    cotizacion.cliente = document.getElementById("cliente").value || 'No proporcionado';
    cotizacion.rfc = document.getElementById("rfc").value || 'No proporcionado';
    cotizacion.telefono = document.getElementById("telefono").value || 'No proporcionado';
    cotizacion.email = document.getElementById("email").value || 'No proporcionado';
    cotizacion.comentarios = document.getElementById("comentarios").value || 'No hay comentarios adicionales';

    mostrarVistaPrevia();
}

// Mostrar vista previa
function mostrarVistaPrevia() {
    document.getElementById("formulario").style.display = "none";
    document.getElementById("vista-previa").style.display = "block";

    document.getElementById("vista-cliente").textContent = `
        ${cotizacion.cliente}, ${cotizacion.rfc}, ${cotizacion.telefono}, ${cotizacion.email}
    `;

    let productosHTML = "";
    cotizacion.productos.forEach((prod, index) => {
        productosHTML += `<p>${prod.producto} - ${prod.cantidad} x $${prod.precio} = $${prod.total}</p>`;
    });

    document.getElementById("vista-productos").innerHTML = productosHTML;
    document.getElementById("vista-comentarios").textContent = cotizacion.comentarios;
}

// Guardar cotización
function guardarCotizacion() {
    const cotizacionesGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];

    // Agregar la cotización actual al array de cotizaciones guardadas
    cotizacionesGuardadas.push(cotizacion);

    // Guardar el array de cotizaciones en el localStorage
    localStorage.setItem("cotizaciones", JSON.stringify(cotizacionesGuardadas));

    alert("Cotización guardada exitosamente.");

    // Limpiar el formulario para nueva cotización
    resetFormulario();
}

// Limpiar formulario y datos
function resetFormulario() {
    cotizacion = {
        cliente: '',
        rfc: '',
        telefono: '',
        email: '',
        productos: [],
        comentarios: ''
    };

    document.getElementById("cliente").value = '';
    document.getElementById("rfc").value = '';
    document.getElementById("telefono").value = '';
    document.getElementById("email").value = '';
    document.getElementById("producto").value = '';
    document.getElementById("cantidad").value = 1;
    document.getElementById("precio").value = 0;
    document.getElementById("comentarios").value = '';

    document.getElementById("formulario").style.display = "block";
    document.getElementById("vista-previa").style.display = "none";
}

// Recuperar cotizaciones guardadas
function cargarCotizacionesGuardadas() {
    const cotizacionesGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];

    cotizacionesGuardadas.forEach((cotizacion, index) => {
        console.log(`Cotización ${index + 1}:`, cotizacion);
    });
}
