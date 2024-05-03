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

        let opciones = document.createElement('td');
        opciones.innerHTML = `
            <button class="btnEditar">Editar</button>
            <button class="btnEliminar">Eliminar</button>
        `;
        row.appendChild(opciones);

        usuarios.appendChild(row);

        // Código para editar el usuario.
        opciones.querySelector('.btnEditar').addEventListener('click', function() {
            // Solicitamos al usuario los nuevos datos de la tienda.
            let nuevoNombre = prompt("Por favor ingresa el nuevo nombre del usuario", usuario.Nombre);
            let nuevoApellido = prompt("Por favor ingresa el nuevo apellido del usuario", usuario.Apellidos);
            let nuevaCorreo = prompt("Por favor ingresa el nuevo correo del usuario", usuario.Correo_electrónico);
            let nuevoNumeroEmpleado = prompt("Por favor ingresa el nuevo numero de empleado", usuario.N_empleados);
            let nuevoTipoUsuario = prompt("Por favor ingresa el nuevo tipo de usuario", usuario.T_usuario);
            let nuevoDepartamento = prompt("Por favor ingresa el nuevo departamento", usuario.Departamento);
            let nuevaContrasena = prompt("Por favor ingresa la nueva contraseña", usuario.Contrasena);
            //Validamos que los campos esten llenos.
            if(nuevoNombre !== null && nuevoApellido !== null && nuevaCorreo !== null && nuevoNumeroEmpleado !== null && nuevoTipoUsuario !== null && nuevoDepartamento !== null && nuevaContrasena !== null){
                //En esta parte es en donde se actualizan los valores en la base de datos.
                //Utilizamos fetch con el metodo "PUT" para actualizar los valores en el servidor.
                const myDataObject = {
                    Nombre: nuevoNombre,
                    Apellidos: nuevoApellido,
                    Correo_electrónico: nuevaCorreo,
                    N_empleados: nuevoNumeroEmpleado,
                    T_usuario: nuevoTipoUsuario,
                    Departamento: nuevoDepartamento,
                    Contrasena: nuevaContrasena
                }
                fetch(`http://localhost:3004/editarUsuario/${usuario.id}`,
                { 
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
            if(confirm('¿Estas seguro de eliminar este usuario?') == true){
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