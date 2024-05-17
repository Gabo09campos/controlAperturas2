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

document.addEventListener("DOMContentLoaded", function() {
    if(form){
        form.addEventListener("submit", e =>{ 
            e.preventDefault();
            let warnings = "";
            let entrar = true; 
            if(NombrePaso.value.length < 5 || departamento.selectedIndex === 0 || usuario.selectedIndex === 0){
                warnings += 'Todos los campos deben ser llenados correctamente <br>'
                entrar = false;
                parrafo.innerHTML = warnings;
            }else{
                // El problema esta en que al borrar un paso, no se regren los numeros por lo cual al agregar uno nuevo se siguen sumando y desaparecen los primeros numeros.
                // Solicitamos todos lo pasos de la API con una solicitud GET.
                fetch("http://localhost:3004/pasos")
                .then(rest => rest.json()) // Convertimos larespuesta en un objeto JSON.
                .then(rest => {
                    // Mapeamos cada paso a una promesa de solicitud fetch.
                    let promesas = rest.map((apertura) => {
                        let paso = apertura.Num_paso; // En una variable ponemos los pasos actuales.
                        let nuevo = Number(posicion.value); // En otra variable ponemos el paso nuevo que se ingresara.
                        // Si el número del paso actual es mayor o igual al nuevo número del paso...
                        if(paso >= nuevo){
                            paso++; // ...se incrementamos de 1 en 1.
                            // Retorna la promesa de la solicitud fetch para que pueda ser manejada más adelante.
                            // El id debe ser el mismo que esta en la bae de datos y enla solicu¿itud que recibe el back.
                            return fetch(`http://localhost:3004/actualizarPaso/${apertura.Id_agregar}`,
                            { 
                                method: 'PUT',
                                headers: {
                                    'Content-type': 'application/json'
                                },
                                body: JSON.stringify({Num_paso: paso}) // Envia el nuevo número del paso en el cuerpo de la solicitud.
                            });
                        }
                    });
                    // Espera a que todas las solicitudes fetch se completen.
                    return Promise.all(promesas);
                }) 
                .then(() => {
                    // Finalmente, podemos agregar el nuevo paso.
                    // Se realiza una solicitud POST a la API para agregar un nuevo paso con los campos requeridos.
                    return axios.post("agregarPaso", {
                        Nom_apertura: NombrePaso.value,
                        Departamento_responsble: departamento.value,
                        Usuario: usuario.value,
                        Num_paso: posicion.value
                    });
                })
                .then(function (response) {
                    console.log(response.data); // Imprime la respuesta de la API.
                })
                .catch((error) => console.log(error)); // Maneja cualquier error que pueda ocurrir. */
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