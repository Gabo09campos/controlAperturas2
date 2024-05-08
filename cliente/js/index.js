//Obtenemos la tabla de el HTML a travez de su id para poder mandarle los datos.
const tiendas = document.getElementById("tiendasLista");

/**
 * Con un fetch indicamos cual sera la url en donde nos mostrara los datos en la web.
 * Con .then recibimos la respuesta de la base de datos y con el json lo interpreta a una manera legible para el usuario.
 * En el forEach creamos una variable "tienda" y le indicamos que si encuentra algun registro nuevo se incremente la tabla con el appendChild.
 */
// variable o arreglo para guardar los paso por cada tienda.
let pasosFinalizados = [];
fetch("http://localhost:3004/tiendas")
.then(rest => rest.json())
.then(rest => {
    rest.forEach(tienda => {
        // row es una variable para crear 'tr' en tabla de la vista del cliente.
        let row = document.createElement('tr');

        let N_tienda = document.createElement('td');
        N_tienda.innerHTML = tienda.N_tienda;
        row.appendChild(N_tienda);

        let Nom_tienda = document.createElement('td');
        Nom_tienda.innerHTML = tienda.Nom_tienda;
        row.appendChild(Nom_tienda);

        let Fecha_prueba = document.createElement('td');
        Fecha_prueba.innerHTML = tienda.Fecha_prueba;
        row.appendChild(Fecha_prueba);

        let Fecha_apertura = document.createElement('td');
        Fecha_apertura.innerHTML = tienda.Fecha_apertura;
        row.appendChild(Fecha_apertura);
        // Creamos los botones para editar, eliminar y pasos finalizados de las tiendas.
        // Con 'abbr' ponemos texto emergente a los botones.
        let opciones = document.createElement('td');
        opciones.innerHTML = `
        <abbr title="Editar tienda">
            <button class="btnEditar">
                <img src="./assets/logos/edit.svg" alt="editar" class="imgEditar" tittle="Editar tienda">
            </button>
        </abbr>
        <abbr title="Eliminar tienda">
            <button class="btnEliminar">
                <img src="./assets/logos/trash.svg" alt="eliminar" class="imgEliminar">
            </button>
        </abbr>    
        <abbr title="Ver pasos finalizados">
            <button id="enlacePasos" class="btnPasos">
                <img src="./assets/logos/tasks.svg" alt="pasos" class="imgPasos">
            </button>
        </abbr>  
        `;
        row.appendChild(opciones);

        tiendas.appendChild(row);

        // Código para editar la tienda
        opciones.querySelector('.btnEditar').addEventListener('click', function() {
            // Solicitamos al usuario los nuevos datos de la tienda.
            let nuevoNumero = prompt("Por favor ingresa el nuevo numero de la tienda", tienda.N_tienda);
            let nuevoNombre = prompt("Por favor ingresa el nuevo nombre de la tienda", tienda.Nom_tienda);
            let nuevaFechaPrueba = prompt("Por favor ingresa la nueva fecha de prueba", tienda.Fecha_prueba);
            let nuevaFechaApertura = prompt("Por favor ingresa la nueva fecha de apertura", tienda.Fecha_apertura);
            //Validamos que los campos esten llenos.
            if(nuevoNumero !== null && nuevoNombre !== null && nuevaFechaPrueba !== null && nuevaFechaApertura !== null){
                //En esta parte es en donde se actualizan los valores en la base de datos.
                //Utilizamos fetch con el metodo "PUT" para actualizar los valores en el servidor.
                const myDataObject = {
                    N_tienda: nuevoNumero,
                    Nom_tienda: nuevoNombre,
                    Fecha_prueba: nuevaFechaPrueba,
                    Fecha_apertura: nuevaFechaApertura
                }
                fetch(`http://localhost:3004/editarTienda/${tienda.id}`,
                { 
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(myDataObject)
                })
                .then(response => response.json())
                .then(() => {
                    console.log('tienda actualizada');
                    // Actualiza los datos en la tabla.
                    N_tienda.innerHTML = nuevoNumero;
                    Nom_tienda.innerHTML = nuevoNombre;
                    Fecha_prueba.innerHTML = nuevaFechaPrueba;
                    Fecha_apertura.innerHTML = nuevaFechaApertura;
                })
                .catch(error => console.error('error:', error));
            }
        });

        // Código para eliminar la tienda
        opciones.querySelector('.btnEliminar').addEventListener('click', function() {
            /**
             * Tenemos un dato adicional en "myDataObject" que enviarems con nuestro pedido DELETE.
             * Ponemos la url hacia donde enviaremos el DELETE
             * Describimos el pedido y enviamos datos adicionales usando "applicacion/json"
             * Dentro de "body" utilizamos la funcion json.stringify() del objeto stringify de js.
             * Por ultimo esperamos la respuesta, 'tienda eliminada' o el error que se encuentre.
             * Utilizamos un confirm() dentro de un condicional para asegurar que el usuario desea eliminar esa tienda y no que sea por error.
             */
            const myDataObject = {tienda: 1}
            if(confirm('¿Estas seguro de eliminar esta tienda?') == true){
                fetch(`http://localhost:3004/borrarTienda/${tienda.id}`,
                { 
                    method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(myDataObject)
                })
                .then(response => response.json())
                .then(() => {
                    row.remove();
                })
                .catch(error => console.error('error:', error));
            }else{
                console.log("No se borro nada");
            }
        });
        // Al hacer click al nombre de la tienda te redirige a los pasos marcando en especifico el paso en el que va.
        opciones.querySelector('.btnPasos').addEventListener('click', function() {
            // Traemos el id de la tienda y el objeto de los pasos de este id.
            let idTienda = tienda.id;
            let pasoDeTienda = tienda.Pasos_finalizados; // Este es el objeto de pasos.
            // Guardamos el objeto en localStorage convertido en String.
            localStorage.setItem('PTAU', pasoDeTienda); // Paso de Tienda Actual a Usar (PTAU).
            location.href = 'Pasos.html';
            localStorage.setItem('TAU', tienda.id); // Tienda Actual a Usar (TAU).
        });
        /* funcion para buscar una tienda por su nombre. */
        // funcion para buscar una tienda por su nombre.
        document.addEventListener("keyup", e => {
            // Verifica si el evento se originó en el elemento con el ID "inputBuscar".
            if (e.target.matches("#inputBuscar")) {
                // Si el usuario presiona la tecla "Escape", borra el contenido del campo de búsqueda.
                if (e.key === "Escape") e.target.value = "";
                // Selecciona todas las filas de la tabla.
                document.querySelectorAll("tr").forEach(row => {
                    // Verifica si el texto de la fila incluye el valor de búsqueda (ignorando mayúsculas y minúsculas).
                    row.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                        ? row.style.display = ""  // Muestra la fila si la búsqueda coincide.
                        : row.style.display = "none";  // Oculta la fila si la búsqueda no coincide.
                });
            }
        });
    });
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