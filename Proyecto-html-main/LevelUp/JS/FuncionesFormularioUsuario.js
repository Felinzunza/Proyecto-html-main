// =================================================================
// 1. FUNCIONES DE VALIDACIÓN PERSONALIZADA (Retornan true/false)
// =================================================================

// Validación de contraseñas
function validarPass() {
    let pass = document.getElementById("pass").value;
    let repass = document.getElementById("repass").value;

    // Se valida que coincidan y que no estén vacías
    if (pass === repass && pass.length >= 6) { // Añadí un mínimo de 6 caracteres por buena práctica
        document.getElementById("checkpass").innerHTML = "✅";
        return true;
    } else {
        document.getElementById("checkpass").innerHTML = "Las contraseñas no coinciden o son muy cortas ⛔";
        return false;
    }
}

// Validación básica de RUT (sin dígito verificador, solo formato básico)
function validarRut() {
    let rut = document.getElementById("rut").value.trim();
    // Verifica que no tenga puntos, tenga entre 7 y 9 caracteres (ej: 12345678-9) y que solo contenga números o K/k
    if (!rut.includes(".") && rut.length >= 8 && rut.length <= 10 && /^[0-9kK-]+$/.test(rut)) { 
        document.getElementById("checkrut").innerHTML = "✅";
        return true;
    } else {
        document.getElementById("checkrut").innerHTML = "Rut incorrecto ⛔ (ej. 12345678-9)";
        return false;
    }
}

// Validación de Nombre
function validarNombre() {
    let nombre = document.getElementById("nombre").value.trim();
    // Verifica que tenga al menos 1 caracter y un máximo de 50
    if (nombre.length > 0 && nombre.length <= 50) {
        document.getElementById("checknombre").innerHTML = "✅";
        return true;
    } else {
        document.getElementById("checknombre").innerHTML = "Nombre incorrecto (máx 50 caracteres) ⛔";
        return false;
    }
}

// Validación de Apellido
function validarApellido() {
    let apellido = document.getElementById("apellido").value.trim();
    // Verifica que tenga al menos 1 caracter y un máximo de 100
    if (apellido.length > 0 && apellido.length <= 100) {
        document.getElementById("checkapellido").innerHTML = "✅";
        return true;
    } else {
        document.getElementById("checkapellido").innerHTML = "Apellido incorrecto (máx 100 caracteres) ⛔";
        return false;
    }
}

// Validación de Email (Lógica del profesor)
function validarEmail() {
    let mail = document.getElementById("mail").value;
    // Se asegura de que el correo termine en uno de los dominios aceptados
    if (
        mail.length > 100 ||
        !(mail.endsWith("@duoc.cl") ||
          mail.endsWith("@duocuc.cl") ||
          mail.endsWith("@profesor.duouc.cl") ||
          mail.endsWith("@profesor.duoc.cl") ||
          mail.endsWith("@gmail.com.cl") ||
          mail.endsWith("@gmail.com"))
    ) {
        document.getElementById("checkemail").innerHTML = "Correo incorrecto (solo dominios aceptados) ⛔";
        return false;
    } else {
        document.getElementById("checkemail").innerHTML = "✅";
        return true;
    }
}

// Validación de Fecha de Nacimiento (Mayor de 18 años, si es un requisito)
function validarFecha() {
    let fechaInput = document.getElementById("fecha").value;
    let fechaNac = new Date(fechaInput);
    let hoy = new Date();
    let min = new Date("1900-01-01");

    // Si la fecha es inválida, o es anterior al mínimo (1900), o es posterior a hoy
    if (isNaN(fechaNac) || fechaNac < min || fechaNac > hoy) {
        document.getElementById("checkfecha").innerHTML = "Fecha incorrecta ⛔";
        return false;
    }

    // Validación de la mayoría de edad (si es requerida)
    // Se calcula la fecha hace 18 años (aproximadamente)
    let mayoriaEdad = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
    
    if (fechaNac > mayoriaEdad) {
        document.getElementById("checkfecha").innerHTML = "Debe ser mayor de 18 años ⛔";
        return false;
    }


    document.getElementById("checkfecha").innerHTML = "✅";
    return true;
}

function validarDireccion(){
    let direccion = document.getElementById("direccion").value.trim();
    if(direccion.length > 0 && direccion.length <= 200) {
        document.getElementById("checkdireccion").innerHTML = "✅";
        return true;
    }else{
        document.getElementById("checkdireccion").innerHTML ="Dirección incorrecta ⛔";
        return false;
    }
}

// NUEVA FUNCIÓN: Validación de Región (Select)
function validarRegion() {
    let region = document.getElementById("region").value;
    // La validación de Bootstrap se encarga de esto (por el atributo 'required'), 
    // pero incluimos la función para ser consistentes.
    if (region === "") { 
        return false; // No es válida si es la opción "Seleccione..."
    } else {
        return true;
    }
}

// NUEVA FUNCIÓN: Validación de Comuna (Input text)
function validarComuna() {
    let comuna = document.getElementById("comuna").value.trim();
    // Verifica que tenga algún contenido
    if (comuna.length === 0) { 
        return false; 
    } else {
        return true;
    }
}


// =================================================================
// 2. LÓGICA DE REGIONES Y COMUNAS
// =================================================================

// Arreglo con la información de Regiones y Comunas
const regiones = {
    "Metropolitana": ["Santiago", "Maipú", "Puente Alto"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
    "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"]
};

// Cargar regiones al inicio
let regionSelect = document.getElementById("region");
let comunaSelect = document.getElementById("comuna");

// Verifica si los select existen antes de intentar llenarlos
if (regionSelect && comunaSelect) {
    // Llenar el select de Regiones
    for (let region in regiones) {
        let option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    }

    // Listener para actualizar comunas cuando cambia la región
    regionSelect.addEventListener("change", function() {
        comunaSelect.innerHTML = "<option value=''>Seleccione...</option>"; // Limpiar
        let comunas = regiones[this.value];

        if (comunas) {
            comunas.forEach(c => {
                let option = document.createElement("option");
                option.value = c;
                option.textContent = c;
                comunaSelect.appendChild(option);
            });
        }
    });
}


// =================================================================
// 3. FUNCIÓN PRINCIPAL DE ACTIVACIÓN DE BOOTSTRAP (Se ejecuta al cargar la página)
// =================================================================

function activarValidacionBootstrap() {
    'use strict';

    const form = document.querySelector('.needs-validation'); // Busca el formulario

    if (form) {
        form.addEventListener('submit', event => {
            // Se verifica la validez de Bootstrap Y de TODAS las funciones personalizadas
            if (!form.checkValidity() || !validarPass() || !validarRut() || !validarNombre() || !validarApellido() || !validarEmail() || !validarDireccion() || !validarFecha() || !validarRegion() || !validarComuna()) {
                event.preventDefault(); // Detiene el envío
                event.stopPropagation(); // Detiene la propagación del evento
            }

            form.classList.add('was-validated'); // Muestra los estilos de validación de Bootstrap
        });
    }
}

// Cuando la página cargue, activamos la validación
document.addEventListener("DOMContentLoaded", activarValidacionBootstrap);