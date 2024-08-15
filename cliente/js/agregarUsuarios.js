const nombreUsuario = document.getElementById("nombreUsuario");
const apellidoUsuario = document.getElementById("apellidoUsuario");
const departamentoUsuario = document.getElementById("myDropdownDep");
const numeroUsuario = document.getElementById("numeroUsuario");
const tipoUsuario = document.getElementById("myDropdownTipo");
const contrasenaUsuario = document.getElementById("contrasenaUsuario");
const correoUsuario = document.getElementById("correoUsuario");
const permisos = document.getElementById("permisos");
const form = document.getElementById('agregarUsuario');
const parrafo = document.getElementById("warnings");
const botonAceptar = document.getElementById("btnAceptar");
const botonCancelar = document.getElementById("btnCancelar");
let mensaje = "";
// Dropdown de departamento responsable del usuario.
document.addEventListener('DOMContentLoaded', (event) => {
    fetch("departamentos")
    .then(rest => rest.json())
    .then(rest => {
        let selectDep = document.getElementById('myDropdownDep'); // Menú desplegable de departamentos.
        rest.forEach(departamento => { 
            // Código para el botón de departamentos.
            let optionDep = document.createElement('option');
            optionDep.href = "#"; // El departamento del usuario se usa como valor.
            optionDep.text = departamento.Nombre; // El departamento del usuario se muestra en el menú desplegable.
            selectDep.appendChild(optionDep);
        });
    });
});
/******************************************************************* */
// Con el 'DOMContentLoaded, controlamos que carge todo el HTML anted de que se ejecute el JS y evitar errores.
document.addEventListener("DOMContentLoaded", function() {
    // Comprobamos que primero se ejecute el html y despues el JS.
    if(form){
        // Agregamos un evento de escucha al formulario. 
        form.addEventListener("submit", e =>{ 
            e.preventDefault(); // Prevenimos que se envie solito.
            let warnings = ""; //Creamos una variable "warnings" para mandar el mensaje de input no valido.
            let entrar = true; //Agregamos un booleano para saber si se mostrara el mensaje de warning o no.
            // Validamos que los campos no esten vacios para enviar el form.
            if(nombreUsuario.value.length < 3 || apellidoUsuario.value.length < 3 || departamentoUsuario.selectedIndex === 0 || numeroUsuario.value.length < 4 || tipoUsuario.selectedIndex === 0 || contrasenaUsuario.value.length < 8 || correoUsuario.value.length < 4){
                warnings += 'Todos los campos deben ser llenados correctamente <br>'
                entrar = false;
                parrafo.innerHTML = warnings;
            }else{
                // Enviamos una solicitud POST  a la API para agregar el nuevo usuario.
                axios.post("agregarUsuario", {
                    Nombre: nombreUsuario.value,
                    Apellidos: apellidoUsuario.value,
                    Correo_electrónico: correoUsuario.value,
                    N_empleados: numeroUsuario.value,
                    T_usuario: tipoUsuario.value,
                    Departamento: departamentoUsuario.value,
                    Contrasena: contrasenaUsuario.value,
                    Permiso: permisos.checked
                }) 
                .then(function (response) {
                    console.log(response.data);
                })
                .then((error) => console.log(error));  // Manejamos los errores que puedan ocurrir en el codigo.
                form.reset(); //Utilizamos una funcion "reset" para limpiar el formulario despues de ingresar.
                window.location.href = './usuarios.html';
            }
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