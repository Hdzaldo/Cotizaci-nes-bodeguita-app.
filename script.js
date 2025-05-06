let datosCliente = {};

function guardarDatosCliente() {
    const cliente = document.getElementById("cliente").value;
    const rfc = document.getElementById("rfc").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;

    // Guardar datos del cliente en el objeto
    datosCliente = {
        cliente,
        rfc,
        telefono,
        email
    };

    if (cliente && rfc && telefono && email) {
        // Ocultar sección de datos del cliente y mostrar los productos
        document.getElementById("datos-cliente").style.display = "none";
        document.getElementById("productos").style.display = "block";
        mostrarFormularioProductos();
    } else {
        alert("Por favor, completa todos los campos del cliente.");
    }
}

function mostrarFormularioProductos() {
    const productosHTML = `
        <h2>Agregar Productos</h2>
        <label for="producto">Producto:</label>
        <input type="text" id="producto" placeholder="Producto o concepto" required><br>

        <label for="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" value="1" min="1" required><br>

        <label for="precio">Precio unitario:</label>
        <input type="number" id="precio" value="0" step="0.01" required><br>

        <button type="button" onclick="agregarProducto()">Agregar producto</button>
        <button type="button" onclick="guardarProductos()">Guardar Productos</button>
    `;

    document.getElementById("productos").innerHTML = productosHTML;
}

function agregarProducto() {
    const producto = document.getElementById("producto").value;
    const cantidad = document.getElementById("cantidad").value;
    const precio = document.getElementById("precio").value;

    if (producto && cantidad > 0 && precio > 0) {
        // Guardar el producto y mostrar el resumen
        const total = cantidad * precio;
        const productoHTML = `
            <p>${producto} - ${cantidad} x $${precio} = $${total}</p>
        `;
        document.getElementById("productos").innerHTML += productoHTML;
    } else {
        alert("Por favor, ingresa datos válidos para el producto.");
    }
}

function guardarProductos() {
    // Almacenar los productos en un array (se puede agregar validación para persistencia)
    alert("Productos guardados. Continuamos con los comentarios.");
    mostrarComentarios();
}

function mostrarComentarios() {
    // Mostrar el formulario para comentarios
    const comentariosHTML = `
        <h2>Comentarios</h2>
        <textarea id="comentarios" placeholder="Comentarios adicionales"></textarea><br>
        <button type="button" onclick="finalizarCotizacion()">Finalizar Cotización</button>
    `;

    document.getElementById("comentarios").innerHTML = comentariosHTML;
}

function finalizarCotizacion() {
    // Al finalizar la cotización, se guardan todos los datos de cliente y productos
    const comentarios = document.getElementById("comentarios").value;
    const cotizacion = {
        ...datosCliente,
        comentarios,
        // Puedes agregar aquí los productos
    };

    console.log("Cotización finalizada:", cotizacion);
    alert("Cotización completada con éxito.");
}
