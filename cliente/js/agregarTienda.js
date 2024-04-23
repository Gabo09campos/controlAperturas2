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
     * A travez del form estaremos escuchando todo lo que sucede en el login con el "addEventListener" (linea 25).
     * Con el "preventDefault" evitamos que se envie el formulario al dar clic al boton sin antes obtener lo datos (linea 26).
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
            
            if(numeroTienda.value.length < 3 || nombreTienda.value.length < 10 || fPruebas.value.length < 8 || fApertura.value.length < 8 ){
                warnings += 'Todos los campos deben ser llenados correctamente <br>'
                entrar = false;
                parrafo.innerHTML = warnings;
            }else{
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
            }
            form.reset();
            location.href = './index.html';
        });
    } else {
        console.log("El elemento 'form' no existe en el DOM");
    }
});
//Funcion para saber si la sesion del usuario esta activa.
function estaLogueado() {
    // Obtener el token de localStorage.
    var token = localStorage.getItem('token');
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