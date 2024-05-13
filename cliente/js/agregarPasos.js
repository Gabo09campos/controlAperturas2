const NombrePaso = document.getElementById("nombrePaso");
const departamento = document.getElementById("myDropdownDep");
const usuario = document.getElementById("myDropdownUsu");
const posicion = document.getElementById("posicion");
const form = document.getElementById("agregarPaso");
const parrafo = document.getElementById("warnings");
let mensaje = "";
/**
 * Con un fetch indicamos cual sera la url en donde nos mostrara los datos en la web.
 * Con .then recibimos la respuesta de la base de datos y con el json lo interpreta a una manera legible para el usuario.
 * En el forEach creamos una variable "tienda" y le indicamos que si encuentra algun registro nuevo se incremente la tabla con el appendChild.
*/
// Dropdown de usuario y departamento responsable del paso.
document.addEventListener('DOMContentLoaded', (event) => {
    fetch("http://localhost:3004/usuarios")
    .then(rest => rest.json())
    .then(rest => {
        let selectDep = document.getElementById('myDropdownDep'); // Menú desplegable de departamentos.
        let selectUsu = document.getElementById('myDropdownUsu'); // Menú desplegable de usuarios.
        rest.forEach(usuario => { 
            // Código para el botón de departamentos.
            let optionDep = document.createElement('option');
            optionDep.href = "#"; // El departamento del usuario se usa como valor.
            optionDep.text = usuario.Departamento; // El departamento del usuario se muestra en el menú desplegable.
            selectDep.appendChild(optionDep);
            // Código para el botón de usuarios.
            let optionUsu = document.createElement('option');
            optionUsu.href = "#"; // El nombre del usuario se usa como valor.
            optionUsu.text = usuario.Nombre; // El nombre del usuario se muestra en el menú desplegable.
            selectUsu.appendChild(optionUsu);
        });
    });
});
//
document.addEventListener('DOMContentLoaded', (event) => {
    fetch("http://localhost:3004/pasos")
    .then(rest => rest.json())
    .then(rest => {
        let selectPaso = document.getElementById('myDropdownPaso'); // Menú desplegable de paso nuevo.
        rest.forEach(pasos => { 
            // Código para el botón de pasos nuevos.
            let optionPas = document.createElement('option');
            optionPas.href = "#"; // El nombre de los pasos se usan como valor.
            optionPas.text = pasos.Nom_apertura; // El nombre de los pasos se muestran en el menú desplegable.
            selectPaso.appendChild(optionPas);
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    if(form){
        form.addEventListener("submit", e =>{ 
            e.preventDefault();
            let warnings = "";
            let entrar = true;
            if(NombrePaso.value.length < 5 || departamento.selectedIndex === 0 || usuario.selectedIndex === 0 ){
                warnings += 'Todos los campos deben ser llenados correctamente <br>'
                entrar = false;
                parrafo.innerHTML = warnings;
            }else{
                axios.post("agregarPaso", {
                    Nom_apertura: NombrePaso.value,
                    Departamento_responsble: departamento.value,
                    Usuario: usuario.value,
                    Num_paso: posicion.value
                })
                .then(function (response) {
                    console.log(response.data);
                })
                .then((error) => console.log(error));
            }
            form.reset();
            window.location.href = './pasosNavbar.html';
        });
    } else {
        console.log("El elemento 'form' no existe en el DOM");
    }
});

/************************************************************************** */
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