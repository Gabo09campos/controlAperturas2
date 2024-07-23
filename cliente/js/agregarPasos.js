const NombrePaso = document.getElementById("nombrePaso");
const departamento = document.getElementById("myDropdownDep");
const usuario = document.getElementById("nombreUsuario");
const posicion = document.getElementById("posicion");
const form = document.getElementById("agregarPaso");
const parrafo = document.getElementById("warnings");
let mensaje = "";
/**
 * Con un fetch indicamos cual sera la url en donde nos mostrara los datos en la web.
 * Con .then recibimos la respuesta de la base de datos y con el json lo interpreta a una manera legible para el usuario.
 * En el forEach creamos una variable "tienda" y le indicamos que si encuentra algun registro nuevo se incremente la tabla con el appendChild.
*/
// Dropdown de departamento responsable del paso.
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
/*************************************************************************** */
document.addEventListener("DOMContentLoaded", function() {
    // Comprobamos que primero se ejecute el html y despues el JS.
    if(form){
        // Agregamos un evento de escucha al formulario.
        form.addEventListener("submit", e => {
            e.preventDefault(); // Prevenimos que se envie solito.
            let warning = "";
            let entrar = true;
            // Validamos que los campos no esten vacios para enviar el form.
            if(NombrePaso.value.length < 5 || departamento.selectedIndex === 0 || usuario.value.length < 3 || posicion.value === ''){
                warning += 'Todos los campos debens ser llenados <br>'
                entrar = false;
                parrafo.innerHTML = warning;
            }else{
                // Llamamos a todos los pasos de la API con una solicitud GET.
                fetch("pasos")
                .then(rest => rest.json()) // Convertimos la respuesta en un objeto JSON.
                .then( rest => {
                    // Verificamos si ya existen pasos en la base de datos.
                    if(rest.length > 0){
                        // Mapeamos cada paso con una promesa en la solicitud fetch.
                        let promesas = rest.map((apertura => {
                            let paso = apertura.Num_paso; // Ponemos en una variable cada paso existente.
                            let nuevo = Number(posicion.value); // Ponemos en otra variable el nuevo paso que se ingresara.
                            // Si el paso es mayor o igual a el numero del nuevo paso...
                            if(paso >= nuevo){
                                paso++; // ...Se le incrementara 1.
                                // El id debe ser el mismo que recibe el back y que esta en la base de datos.
                                return fetch(`actualizarPaso/${apertura.Id_agregar}`,
                                {
                                    method: 'PUT',
                                    headers: {
                                        'Content-type': 'application/json'
                                    },
                                    body: JSON.stringify({Num_paso: paso}) // Enviamos el nuevo numero de paso en el cuerpo de la solicitud.
                                });
                            }else{
                                console.log('Los pasos ni se topan');
                            }
                        }));
                    }else{
                        console.log('No existen pasos');
                    }
                })
                .then(() => {
                    // Finalmente podemos agregar el nuevo paso.
                    // Enviamos una solicitud POST  a la API para agregar el nuevo paso.
                    return axios.post("agregarPaso", {
                        Nom_apertura: NombrePaso.value,
                        Departamento_responsble: departamento.value,
                        Usuario: usuario.value,
                        Num_paso: posicion.value
                    });
                })
                .then(function (response){
                    console.log(response.data);
                    form.reset();
                    window.location.href = './pasosNavbar.html';
                })
                .catch((error) => console.log(error)); // Manejamos los errores que puedan ocurrir en el codigo.
            }
        })
    }else{
        console.log('El elemento form no existe en el DOM');
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