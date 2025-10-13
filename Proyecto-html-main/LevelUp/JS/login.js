// =================================================================
// 1. FUNCIONES DE VALIDACIÓN PERSONALIZADA (Retornan true/false)
// =================================================================

// Validación de Usuario/Email
function validarUsuario() {
    let usuario = document.getElementById("username").value.trim();
    
    // Solo validamos que no esté vacío y tenga una longitud mínima (ej. 4 caracteres)
    if (usuario.length >= 4) {
        document.getElementById("checkusuario").innerHTML = "✅";
        return true;
    } else {
        document.getElementById("checkusuario").innerHTML = "Ingrese un usuario o correo válido. ⛔";
        return false;
    }
}

// Validación de Contraseña para Login
function validarPassLogin() {
    let pass = document.getElementById("password").value;
    
    // En login, solo necesitamos verificar que no esté vacío
    if (pass.length > 0) {
        document.getElementById("checkpass").innerHTML = "✅";
        return true;
    } else {
        document.getElementById("checkpass").innerHTML = "Debe ingresar su contraseña. ⛔";
        return false;
    }
}


// =================================================================
// 2. FUNCIÓN PRINCIPAL DE ACTIVACIÓN DE BOOTSTRAP
// =================================================================

function activarValidacionBootstrapLogin() {
    'use strict';

    const form = document.querySelector('.needs-validation'); 

    if (form) {
        form.addEventListener('submit', event => {
            // Verifica la validez de Bootstrap Y de las funciones personalizadas
            if (!form.checkValidity() || !validarUsuario() || !validarPassLogin()) {
                event.preventDefault(); // Evita el envío del formulario
                event.stopPropagation(); 
            }

            form.classList.add('was-validated'); // Activa los estilos de error de Bootstrap
        });
    }
}

// Cuando la página cargue, activamos la validación
document.addEventListener("DOMContentLoaded", activarValidacionBootstrapLogin);