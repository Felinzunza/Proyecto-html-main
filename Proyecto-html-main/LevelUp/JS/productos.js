// Función para añadir un producto al carrito en localStorage
function agregarAlCarrito(productoId, nombre, precio) {
    // 1. Obtener el carrito actual de localStorage (o inicializarlo como vacío si no existe)
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // 2. Buscar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === productoId);

    if (productoExistente) {
        // Si ya existe, solo incrementamos la cantidad
        productoExistente.cantidad++;
    } else {
        // Si es nuevo, lo agregamos al carrito
        carrito.push({
            id: productoId,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    // 3. Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Opcional: Mostrar una alerta de éxito
    alert(`${nombre} ha sido añadido al carrito.`);
    
    // Opcional: Redirigir al carrito para ver el resultado
    // window.location.href = 'carrito.html'; 
}

// Inicializar y agregar listener a los botones de "Agregar al Carrito"
document.addEventListener("DOMContentLoaded", function() {
    const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');
    
    botonesAgregar.forEach(button => {
        // Usamos addEventListener en lugar de onclick en el HTML para una práctica más limpia
        button.addEventListener('click', function() {
            // Obtenemos los datos del botón (usando data-atributos del HTML)
            const id = this.getAttribute('data-id');
            const nombre = this.getAttribute('data-nombre');
            // Convertimos el precio a número
            const precio = parseInt(this.getAttribute('data-precio')); 

            if (id && nombre && precio) {
                agregarAlCarrito(id, nombre, precio);
            }
        });
    });
});