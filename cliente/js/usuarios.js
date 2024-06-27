//Obtenemos la tabla de el HTML a travez de su id para poder mandarle los datos.
const usuarios = document.getElementById("usuariosLista");
/**
 * Con un fetch indicamos cual sera la url en donde nos mostrara los datos en la web.
 * Con .then recibimos la respuesta de la base de datos y con el json lo interpreta a una manera legible para el usuario.
 * En el forEach creamos una variable "tienda" y le indicamos que si encuentra algun registro nuevo se incremente la tabla con el appendChild.
 */
fetch("http://localhost:3004/usuarios")
.then(rest => rest.json())
.then(rest => {
    rest.forEach(usuario => {
        // row es una variable para crear 'tr' en tabla de la vista del cliente.
        let row = document.createElement('tr');

        let Nombre = document.createElement('td');
        Nombre.innerHTML = usuario.Nombre;
        row.appendChild(Nombre);

        let Apellidos = document.createElement('td');
        Apellidos.innerHTML = usuario.Apellidos;
        row.appendChild(Apellidos);

        let Correo_electrónico = document.createElement('td');
        Correo_electrónico.innerHTML = usuario.Correo_electrónico;
        row.appendChild(Correo_electrónico);

        let N_empleados = document.createElement('td');
        N_empleados.innerHTML = usuario.N_empleados;
        row.appendChild(N_empleados);

        let T_usuario = document.createElement('td');
        T_usuario.innerHTML = usuario.T_usuario;
        row.appendChild(T_usuario);

        let Departamento = document.createElement('td');
        Departamento.innerHTML = usuario.Departamento;
        row.appendChild(Departamento); 

        let Contrasena = document.createElement('td');
        Contrasena.innerHTML = usuario.Contrasena;
        row.appendChild(Contrasena);

        let Permiso = document.createElement('td');
        Permiso.innerHTML = usuario.Permiso;
        row.appendChild(Permiso);

        let opciones = document.createElement('td');
        opciones.innerHTML = `
        <abbr title="Editar usuario">
        <button class="btnEditar">
            <img src="./assets/logos/edit.svg" alt="editar" class="imgEditar" tittle="Editar usuario">
        </button>
        </abbr>
        <abbr title="Eliminar usuario">
            <button class="btnEliminar">
                <img src="./assets/logos/trash.svg" alt="eliminar" class="imgEliminar">
            </button>
        </abbr>  
        `;
        row.appendChild(opciones);

        usuarios.appendChild(row);
        /**************************************************** */
        // Código para editar el usuario.
        opciones.querySelector('.btnEditar').addEventListener('click', async function() {
            // Mostramos un formulario SweetAlert2 con los valores actuales del usuario.
            const { value: formValues } = await Swal.fire({
                title: "Multiple inputs",
                html: `
                    <input id="swal-input1" class="swal2-input" value="${usuario.Nombre}">
                    <input id="swal-input2" class="swal2-input" value="${usuario.Apellidos}">
                    <input id="swal-input3" class="swal2-input" value="${usuario.Correo_electrónico}">
                    <input id="swal-input4" class="swal2-input" value="${usuario.N_empleados}">
                    <input id="swal-input5" class="swal2-input" value="${usuario.T_usuario}">
                    <input id="swal-input6" class="swal2-input" value="${usuario.Departamento}">
                    <input id="swal-input7" class="swal2-input" value="${usuario.Contrasena}">
                    <input id="swal-input8" class="swal2-input" type="checkbox" value="${usuario.Permiso}" > Permite actualizar
                `,
                focusConfirm: false,
                preConfirm: () => {
                    // Recogemos los valores del formulario.
                    return [
                        document.getElementById("swal-input1").value,
                        document.getElementById("swal-input2").value,
                        document.getElementById("swal-input3").value,
                        document.getElementById("swal-input4").value,
                        document.getElementById("swal-input5").value,
                        document.getElementById("swal-input6").value,
                        document.getElementById("swal-input7").value,
                        document.getElementById("swal-input8").checked
                    ];
                }
            });
            // Si el usuario confirmó el formulario...
            if (formValues) {
                // Desestructuramos los valores del formulario.
                const [nuevoNombre, nuevoApellido, nuevaCorreo, nuevoNumeroEmpleado, nuevoTipoUsuario, nuevoDepartamento, nuevaContrasena, nuevoPermiso] = formValues;
                // Creamos un objeto con los nuevos datos del usuario.
                const myDataObject = {
                    Nombre: nuevoNombre,
                    Apellidos: nuevoApellido,
                    Correo_electrónico: nuevaCorreo,
                    N_empleados: nuevoNumeroEmpleado,
                    T_usuario: nuevoTipoUsuario,
                    Departamento: nuevoDepartamento,
                    Contrasena: nuevaContrasena,
                    Permiso: nuevoPermiso
                }
                // Hacemos una petición PUT para actualizar el usuario en el servidor.
                fetch(`http://localhost:3004/editarUsuario/${usuario.id}`, { 
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(myDataObject)
                })
                .then(response => response.json())
                .then(() => {
                    console.log('Usuario actualizado');
                    // Actualiza los datos en la tabla.
                    Nombre.innerHTML = nuevoNombre;
                    Apellidos.innerHTML = nuevoApellido;
                    Correo_electrónico.innerHTML = nuevaCorreo;
                    N_empleados.innerHTML = nuevoNumeroEmpleado;
                    T_usuario.innerHTML = nuevoTipoUsuario;
                    Departamento.innerHTML = nuevoDepartamento;
                    Contrasena.innerHTML = nuevaContrasena;
                    Permiso.innerHTML = nuevoPermiso;
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
            const myDataObject = {usuario: 1}
            Swal.fire({
                title: "¿Estas seguro de eliminar este usuario?",
                text: "El usuario se eliminara definitivamente!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, Borrar!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Borrado!",
                        text: "El usuario ha sido eliminado.",
                        icon: "success"
                    });
                    fetch(`http://localhost:3004/borrarUsuario/${usuario.id}`,
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
            })
        });
        // funcion para buscar un usuario por su nombre.
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
/*************************************************************** */
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