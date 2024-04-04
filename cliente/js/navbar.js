const logout = document.getElementById("btnCerrarSesion");
const titulo = document.getElementById("tituloNav");

logout.addEventListener("click", e => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para cerrar la sesión.
    fetch("cerrarSesion",
                { 
                    method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        }
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error('Error al cerrar la sesion');
                    } window.location.href = 'login.html';
                })
                .catch(error => console.error('El error es:', error));
});


function checkAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        // El usuario está autenticado, así que puedes continuar con la siguiente función middleware
        next();
    } else {
        // El usuario no está autenticado, así que redirige al usuario a la página de inicio de sesión
        res.redirect('/login');
    }
}
/*
// Usa el middleware en todas las rutas que requieran autenticación
app.get('/', checkAuthenticated, (req, res) => {
    // Sirve la página principal
});

// Función para verificar si el usuario está logueado
function estaLogueado() {
    // Obtener datos de localStorage
    var usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario) {
        // El usuario está logueado
        return true;
    } else {
        // El usuario no está logueado
        return false;
    }
}

// Verificar autenticación en cada página
window.onload = function() {
    if (!estaLogueado()) {
        // Si el usuario no está logueado, redirigir a la página de inicio de sesión
        window.location.href = "/ruta/a/la/pagina/de/inicio/de/sesion";
    }
}

*/