const nombreUsuario = document.getElementById("nombreUsuario");
const apellidoUsuario = document.getElementById("apellidoUsuario");
const departamentoUsuario = document.getElementById("departamentoUsuario");
const numeroUsuario = document.getElementById("numeroUsuario");
const tipoUsuario = document.getElementById("myDropdownTipo");
const contrasenaUsuario = document.getElementById("contrasenaUsuario");
const correoUsuario = document.getElementById("correoUsuario");
const form = document.getElementById('agregarUsuario');
const parrafo = document.getElementById("warnings");
const botonAceptar = document.getElementById("btnAceptar");
const botonCancelar = document.getElementById("btnCancelar");
let mensaje = "";
/**
     * A travez del form estaremos escuchando todo lo que sucede en el login con el "addEventListener".
     * Con el "preventDefault" evitamos que se envie el formulario al dar clic al boton sin antes obtener lo datos.
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
            if(nombreUsuario.value.length < 3 || apellidoUsuario.value.length < 3 || departamentoUsuario.value.length < 2 || numeroUsuario.value.length < 4 || tipoUsuario.selectedIndex === 0 || contrasenaUsuario.value.length < 8 || correoUsuario.value.length < 4){
                warnings += 'Todos los campos deben ser llenados correctamente <br>'
                entrar = false;
                parrafo.innerHTML = warnings;
            }else{
                axios.post("agregarUsuario", {
                    Nombre: nombreUsuario.value,
                    Apellidos: apellidoUsuario.value,
                    Correo_electrónico: correoUsuario.value,
                    N_empleados: numeroUsuario.value,
                    T_usuario: tipoUsuario.value,
                    Departamento: departamentoUsuario.value,
                    Contrasena: contrasenaUsuario.value
                })
                .then(function (response) {
                    console.log(response.data);
                })
                .then((error) => console.log(error)); 
            }
            form.reset();
            window.location.href = './usuarios.html';
        });
    } else {
        console.log("El elemento 'form' no existe en el DOM");
    }
});
/***************************************************************************** */
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