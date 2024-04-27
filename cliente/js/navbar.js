const logout = document.getElementById('btnCerrarSesion').addEventListener('click', cerrarSesion);
//const titulo = document.getElementById("tituloNav");

//Funcion para cerrar sesion.
function cerrarSesion() {
    // Eliminar el token de localStorage para que al cerrar sesion no se pueda utulzar la pagina.
    sessionStorage.removeItem('token');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('TAU');     
    localStorage.removeItem('PTAU');     
    // Redirigir al usuario a la página de inicio de sesión.
    window.location.href = "./login.html";
}
//Funcion para verificar si el usuario esta activo o ya fue eliminado el token.
function estaLogueado() {
    // Obtener el token de localStorage.
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
    }else{
        // Si el usuario está logueado, mostrar su nombre en la barra de navegación.
        var elementoNavbar = document.getElementById('tituloNav');
        // Obtenemos el nombre del usuario del almacenamiento local y lo mostramos en el nav.
        var nombreUsuario = localStorage.getItem('nombreUsuario'); 
        elementoNavbar.innerHTML = nombreUsuario;
    }
} 
