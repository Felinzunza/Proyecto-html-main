
const tablaBody = document.querySelector('#tabla-carrito tbody');

// Función para formatear números como moneda CLP
function formatearCLP(numero) {
    return new Intl.NumberFormat('es-CL', { 
        style: 'currency', 
        currency: 'CLP', 
        minimumFractionDigits: 0 
    }).format(numero);
}

// =================================================================
// LÓGICA DE RENDERIZADO Y CÁLCULO
// =================================================================

function dibujarCarrito() {
    // 1. Obtener el carrito de localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Limpiar el contenido actual de la tabla
    tablaBody.innerHTML = '';
    
    let subtotalGeneral = 0;

    if (carrito.length === 0) {
        // Mostrar mensaje si el carrito está vacío
        tablaBody.innerHTML = '<tr><td colspan="5" class="text-center">El carrito está vacío. ¡Añade productos!</td></tr>';
        subtotalGeneral = 0;
    } else {
        // 2. Recorrer cada producto y crear la fila (<tr>)
        carrito.forEach((item) => {
            const subtotalItem = item.precio * item.cantidad;
            subtotalGeneral += subtotalItem;

            const nuevaFila = `
                <tr id="fila-${item.id}">
                    <td>${item.nombre}</td>
                    <td class="precio-unitario" data-precio="${item.precio}">${formatearCLP(item.precio)}</td>
                    <td>
                        <input 
                            type="number" 
                            class="form-control text-center cantidad-item" 
                            value="${item.cantidad}" 
                            min="1" 
                            onchange="actualizarCantidad('${item.id}', this.value)"
                        >
                    </td>
                    <td class="subtotal-item">${formatearCLP(subtotalItem)}</td>
                    <td class="text-center">
                        <button class="btn btn-danger btn-sm" onclick="eliminarFila('${item.id}')">Eliminar</button>
                    </td>
                </tr>
            `;
            tablaBody.innerHTML += nuevaFila;
        });
    }

    // 3. Actualizar el Total a pagar (Total es igual al Subtotal General)
    document.getElementById('total-pagar').textContent = formatearCLP(subtotalGeneral);
}

// =================================================================
// LÓGICA DE ACCIÓN EN LOCALSTORAGE
// =================================================================

// Función para actualizar la cantidad de un producto en localStorage
function actualizarCantidad(productoId, nuevaCantidadStr) {
    let nuevaCantidad = parseInt(nuevaCantidadStr);
    
    // Validar cantidad mínima
    if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
        nuevaCantidad = 1;
    }

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemIndex = carrito.findIndex(item => item.id === productoId);

    if (itemIndex > -1) {
        carrito[itemIndex].cantidad = nuevaCantidad;
        // Si la cantidad se reduce a 0, mejor eliminar el producto (opcional)
        // if (nuevaCantidad === 0) { eliminarFila(productoId); return; }
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        dibujarCarrito(); // Volver a dibujar la tabla
    }
}

// Función para eliminar un producto de localStorage
function eliminarFila(productoId) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Filtramos para crear un nuevo array sin el producto a eliminar
    carrito = carrito.filter(item => item.id !== productoId);

    localStorage.setItem('carrito', JSON.stringify(carrito));
    dibujarCarrito(); // Volver a dibujar la tabla
}


// =================================================================
// ACTIVACIÓN AL CARGAR LA PÁGINA
// =================================================================

// Cuando la página cargue, dibuja el carrito basado en localStorage
document.addEventListener("DOMContentLoaded", function() {
    dibujarCarrito();
});