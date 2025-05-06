// script.js

let productos = [];

function agregarProducto() {
  const productosDiv = document.getElementById("productos");

  const index = productos.length;
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
    <label>Concepto:
      <input type="text" class="concepto" placeholder="Ej. Servicio técnico" />
    </label>
    <label>Cantidad:
      <input type="number" class="cantidad" value="1" min="1" />
    </label>
    <label>Precio unitario:
      <input type="number" class="precio" value="0" step="0.01" />
    </label>
  `;
  productosDiv.appendChild(div);

  productos.push(div);
}

function calcularTotal() {
  let total = 0;
  productos.forEach(div => {
    const cantidad = parseFloat(div.querySelector(".cantidad").value) || 0;
    const precio = parseFloat(div.querySelector(".precio").value) || 0;
    total += cantidad * precio;
  });

  const incluirIVA = document.getElementById("incluirIVA").checked;
  if (incluirIVA) {
    total *= 1.16;
  }

  document.getElementById("total").textContent = total.toFixed(2);
  return total.toFixed(2);
}

function generarCotizacion() {
  calcularTotal();

  const nombre = document.getElementById("nombreCliente").value;
  const rfc = document.getElementById("rfcCliente").value;
  const telefono = document.getElementById("telefonoCliente").value;
  const email = document.getElementById("emailCliente").value;
  const fecha = document.getElementById("fechaCotizacion").value;
  const incluirIVA = document.getElementById("incluirIVA").checked;
  const formato = document.getElementById("formatoExportacion").value;

  let html = `
    <div style="font-family: sans-serif; padding: 20px; max-width: 700px;">
      <h2 style="color:#003366;">Cotización</h2>
      <p><strong>Cliente:</strong> ${nombre}</p>
      <p><strong>RFC:</strong> ${rfc}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Fecha:</strong> ${fecha}</p>
      <hr/>
      <table style="width:100%; border-collapse: collapse;">
        <thead>
          <tr style="background:#003366; color:#fff;">
            <th style="padding:8px; border:1px solid #ccc;">Cantidad</th>
            <th style="padding:8px; border:1px solid #ccc;">Concepto</th>
            <th style="padding:8px; border:1px solid #ccc;">P. Unitario</th>
            <th style="padding:8px; border:1px solid #ccc;">Costo</th>
          </tr>
        </thead>
        <tbody>
  `;

  productos.forEach(div => {
    const cantidad = div.querySelector(".cantidad").value;
    const concepto = div.querySelector(".concepto").value;
    const precio = parseFloat(div.querySelector(".precio").value || 0).toFixed(2);
    const costo = (cantidad * precio).toFixed(2);

    html += `
      <tr>
        <td style="padding:8px; border:1px solid #ccc;">${cantidad}</td>
        <td style="padding:8px; border:1px solid #ccc;">${concepto}</td>
        <td style="padding:8px; border:1px solid #ccc;">$${precio}</td>
        <td style="padding:8px; border:1px solid #ccc;">$${costo}</td>
      </tr>
    `;
  });

  const total = calcularTotal();
  html += `
        </tbody>
      </table>
      <h3 style="text-align:right; margin-top:20px;">Total: $${total} MXN</h3>
      ${incluirIVA ? '<p style="text-align:right;">(Incluye IVA 16%)</p>' : ''}
    </div>
  `;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  document.body.appendChild(tempDiv);

  if (formato === "pdf") {
    const { jsPDF } = window.jspdf;
    html2canvas(tempDiv).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("cotizacion.pdf");
      document.body.removeChild(tempDiv);
    });
  } else {
    html2canvas(tempDiv).then(canvas => {
      const link = document.createElement("a");
      link.download = "cotizacion.jpg";
      link.href = canvas.toDataURL("image/jpeg");
      link.click();
      document.body.removeChild(tempDiv);
    });
  }
}
