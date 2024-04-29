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