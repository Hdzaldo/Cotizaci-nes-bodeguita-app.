let productos = [];
let iva = 0;

function agregarProducto() {
    const producto = document.getElementById("producto").value;
    const cantidad = document.getElementById("cantidad").value;
    const precio = document.getElementById("precio").value;
    
    if (!producto || cantidad <= 0 || precio <= 0) {
        alert("Por favor, ingrese todos los datos correctamente.");
        return;
    }

    const total = cantidad * precio;
    productos.push({ producto, cantidad, precio, total });

    mostrarProductos();
    actualizarTotal();
}

function mostrarProductos() {
    const tabla = document.getElementById("tabla-productos").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; // Limpiar tabla

    productos.forEach(p => {
        const row = tabla.insertRow();
        row.insertCell(0).textContent = p.producto;
        row.insertCell(1).textContent = p.cantidad;
        row.insertCell(2).textContent = `$${p.precio.toFixed(2)}`;
        row.insertCell(3).textContent = `$${p.total.toFixed(2)}`;
    });
}

function actualizarTotal() {
    const total = productos.reduce((acc, p) => acc + p.total, 0);
    let ivaTotal = 0;

    if (document.getElementById("iva").checked) {
        ivaTotal = total * 0.16;
        iva = ivaTotal;
    }

    document.getElementById("total").textContent = `Total: $${total.toFixed(2)}`;
    document.getElementById("iva-total").textContent = `IVA: $${ivaTotal.toFixed(2)}`;
}

function vistaPrevia() {
    let contenido = "<h3>Cotización</h3>";

    productos.forEach(p => {
        contenido += `<p>${p.producto} - ${p.cantidad} x $${p.precio.toFixed(2)} = $${p.total.toFixed(2)}</p>`;
    });

    const total = productos.reduce((acc, p) => acc + p.total, 0);
    contenido += `<p>Total: $${total.toFixed(2)}</p>`;
    
    if (document.getElementById("iva").checked) {
        contenido += `<p>IVA: $${iva.toFixed(2)}</p>`;
    }

    contenido += `<p>Comentarios: ${document.getElementById("comentarios").value}</p>`;

    document.getElementById("preview-content").innerHTML = contenido;
    document.getElementById("vista-previa").style.display = "block";
}

function cerrarVistaPrevia() {
    document.getElementById("vista-previa").style.display = "none";
}

function guardarCotizacion() {
    const nombreArchivo = document.getElementById("nombre-archivo").value || "cotizacion";

    // Llamar a una función para generar el PDF o JPG
    alert(`Generando cotización como ${nombreArchivo}.pdf`);
    // Aquí se puede integrar la función para guardar el archivo (PDF/JPG)
}
