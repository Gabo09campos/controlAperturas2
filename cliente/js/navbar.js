const logout = document.getElementById('btnCerrarSesion').addEventListener('click', cerrarSesion);
//Funcion para cerrar sesion.
function cerrarSesion() {
    // Eliminar el token y demas datos de localStorage para que al cerrar sesion no se pueda utulzar la pagina.
    sessionStorage.removeItem('token');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('TAU');     
    localStorage.removeItem('PTAU');     
    localStorage.removeItem('DUA');   
    localStorage.removeItem('PUU');   
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
    }
} 
