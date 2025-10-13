// Función que activa la validación de Bootstrap
function activarValidacionBootstrap() {
  'use strict';

const form = document.querySelector('.needs-validation'); // busca el formulario

form.addEventListener('submit', event => {
  if (!form.checkValidity() || !validarPass() || !validarRut() ||!validarNombre()||!validarApellido()
       ||!validarFecha()||!validarEmail()|| !validarDireccion()) {
    event.preventDefault();
    event.stopPropagation();
  }
  form.classList.add('was-validated');
});

}

// Cuando la página cargue, activamos la validación
document.addEventListener("DOMContentLoaded", activarValidacionBootstrap);




// Validación de contraseñas
function validarPass(){
  let pass = document.getElementById("pass").value;
  let repass = document.getElementById("repass").value;
  if(pass === repass && pass !== ""){
    document.getElementById("checkpass").innerHTML = "✅";
    return true;
  } else {
    document.getElementById("checkpass").innerHTML = "Los password no coinciden ⛔";
    return false;
  }
}

// Validación básica de RUT
function validarRut(){
  let rut = document.getElementById("rut").value;
  if(!rut.includes(".") && !rut.includes("-") && rut.length >= 7 && rut.length <= 9){
    document.getElementById("checkrut").innerHTML = "✅";
    return true;
  } else {
    document.getElementById("checkrut").innerHTML = "Rut incorrecto ⛔";
    return false;
  }
}

function validarNombre(){
    let nombre = document.getElementById("nombre").value.trim();;
    if(nombre.length > 0 && nombre.length <= 50 ) {
        document.getElementById("checknombre").innerHTML = "✅";
        return true;
    }else{
         document.getElementById("checknombre").innerHTML ="Nombre incorrecto ⛔";
         return false;
    }
}


function validarApellido(){
    let apellido = document.getElementById("apellido").value.trim();
    if(apellido.length > 0 && apellido.length <= 100) {
        document.getElementById("checkapellido").innerHTML = "✅";
        return true;
    }else{
         document.getElementById("checkapellido").innerHTML ="Apellido incorrecto ⛔";
         return false;
    }
}

function validarEmail() {
    let mail = document.getElementById("mail").value;

    if (
        mail.length > 100 ||
        !(mail.endsWith("@duoc.cl") || 
          mail.endsWith("@duocuc.cl") ||
          mail.endsWith("@profesor.duouc.cl")||
          mail.endsWith("@profesor.duoc.cl") || 
          mail.endsWith("@gmail.com"))
    ) {
        document.getElementById("checkemail").innerHTML = "Correo incorrecto ⛔";
        return false;
    } else {
        document.getElementById("checkemail").innerHTML = "✅";
        return true;
    }
}

function validarFecha() {
  
  let fecha = new Date(document.getElementById("fecha").value); // convertir string a fecha

  let min = new Date("1900-01-01"); 
  let hoy = new Date();
 

  if (fecha < min || fecha > hoy) {
    document.getElementById("checkfecha").innerHTML = "Fecha incorrecta ⛔";
    return false;
  } else {
    document.getElementById("checkfecha").innerHTML = "✅";
    return true;
  }
}




// Ejemplo de arreglo
const regiones = {
  "Metropolitana": ["Santiago", "Maipú", "Puente Alto"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
  "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"]
};

// Cargar regiones
let regionSelect = document.getElementById("region");
let comunaSelect = document.getElementById("comuna");

for (let region in regiones) {
  let option = document.createElement("option");
  option.value = region;
  option.textContent = region;
  regionSelect.appendChild(option);
}

// Cuando cambie región -> actualizar comunas
regionSelect.addEventListener("change", function() {
  comunaSelect.innerHTML = "<option value=''>Seleccione...</option>";
  let comunas = regiones[this.value];

  comunas.forEach(c => {
    let option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    comunaSelect.appendChild(option);
  });
});




function guardarCambios() {
  const form = document.querySelector('.needs-validation');
  
  if (!form.checkValidity()) {
    form.classList.add('was-validated'); 
    return; // ❌ No redirige si está malo
  }

  form.requestSubmit(); // ✅ Se envía y redirige si está bueno
}