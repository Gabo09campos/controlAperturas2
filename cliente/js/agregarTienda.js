const numeroTienda = document.getElementById("numeroTienda");
const nombreTienda = document.getElementById("nombreTienda");
const fPruebas = document.getElementById("fechaPruebas");
const fApertura = document.getElementById("fechaApertura");
const form = document.getElementById('formAgregarTienda');
const parrafo = document.getElementById("warnings");
const botonAceptar = document.getElementById("btnAceptar");
const botonCancelar = document.getElementById("btnCancelar");
const pasosFinalizados = []; // Creamos un objeto que enviaremos vacio a la BD para posterior llenarlo con los pasos de apertura.
let mensaje = "";
/**
     * A travez del form estaremos escuchando todo lo que sucede en el login con el "addEventListener" (linea 20).
     * Con el "preventDefault" evitamos que se envie el formulario al dar clic al boton sin antes obtener lo datos (linea 23).
     * Creamos una variable "warnings" para mandar el mensaje de input no valido.
     * Agregamos un booleano para saber si se mostrara el mensaje de warning o no.
     * Finalmente redirigimos hacia una nueva pantalla despues de dar clic al boton y haber validado que todo este correcto esto con "href".
     * Y utilizamos una funcion "reset" para limpiar el formulario despues de ingresar.
     * Con el 'DOMContentLoaded, controlamos que carge todo el HTML anted de que se ejecute el JS y evitar errores.
*/
document.addEventListener("DOMContentLoaded", function() {
    if(form){
        form.addEventListener("submit", e =>{ 
            e.preventDefault();
            let warnings = "";
            let entrar = true;
            // Expresiones regulares para validaciones.
            const regexNumero = /^[0-9]+$/; // Solo números.
            const regexTexto = /^[a-zA-Z\s]+$/; // Solo letras y espacios.
            const regexFecha = /^\d{4}-\d{2}-\d{2}$/; // Formato YYYY-MM-DD.

            // Validaciones.
            if (!regexNumero.test(numeroTienda.value) || numeroTienda.value.length < 3) {
                warnings += "El número de tienda debe contener solo números y tener al menos 3 caracteres.<br>";
                entrar = false;
            }

            if (!regexTexto.test(nombreTienda.value) || nombreTienda.value.length < 10) {
                warnings += "El nombre de la tienda debe contener solo letras y espacios, y tener al menos 10 caracteres.<br>";
                entrar = false;
            }

            if (!regexFecha.test(fPruebas.value)) {
                warnings += "La fecha de pruebas debe estar en el formato YYYY-MM-DD.<br>";
                entrar = false;
            }

            if (!regexFecha.test(fApertura.value)) {
                warnings += "La fecha de apertura debe estar en el formato YYYY-MM-DD.<br>";
                entrar = false;
            }

            // Si alguna validación falla, mostramos los warnings.
            if (!entrar) {
                parrafo.innerHTML = warnings;
                return;
            }
            // Si todas las validaciones pasan, enviamos los datos.
                axios.post("agregarTienda", {
                    N_tienda: numeroTienda.value,
                    Nom_tienda: nombreTienda.value,
                    Fecha_prueba: fPruebas.value,
                    Fecha_apertura: fApertura.value,
                    Pasos_finalizados: pasosFinalizados
                })
                .then(function (response) {
                    console.log(response.data);
                })
                .then((error) => console.log(error));
                form.reset();
                window.location.href = './index.html';
            
            
        });
    } else {
        console.log("El elemento 'form' no existe en el DOM");
    }
});
//Funcion para saber si la sesion del usuario esta activa.
function estaLogueado() {
    // Obtener el token de sessionStorage.
    var token = sessionStorage.getItem('token');
    //Validacion del token.
    if (token) {
        // El usuario está logueado y puede seguir navegado.
        return true;
    } else {
        // El usuario no está logueado se finaliza la sesion con "window.onload".
        return false;
    }
}
// Verificar autenticación en cada página con la funcion anterior.
window.onload = function() {
    if (!estaLogueado()) {
        // Si el usuario no está logueado, redirigir a la página de inicio de sesión.
        window.location.replace('./login.html');
    }
}