/**
     * Creamos una constante de nombre para obtener su valor a travez de ID. 
     * Tambien se crean constantes de los demas valores en el login.
 */
const usuario = document.getElementById("usuario");
const contra = document.getElementById("contraseña");
const form = document.getElementById("formLogin");
const parrafo = document.getElementById("warnings");
/**
     * A travez del form estaremos escuchando todo lo que sucede en el login con el "addEventListener".
     * Con el "preventDefault" evitamos que se envie el formulario al dar clic al boton sin antes obtener lo datos.
     * Creamos una variable "warnings" para mandar el mensaje de input no valido.
     * Agregamos un booleano para saber si se mostrara el mensaje de warning o no.
     * Finalmente redirigimos hacia una nueva pantalla despues de dar clic al boton y haber validado que todo este correcto esto con "href".
     * Y utilizamos una funcion "reset" para limpiar el formulario despues de ingresar.
 */
form.addEventListener("submit", e => {
    e.preventDefault();
    let warnings = "";
    let entrar = true;
    /**
     * Importamos en el front a "axios" que es una libreria para hacer peticiones http.
     * Con un objeto enviamos a travez de la ruta los valores del login para revisar que se encuentren en la BD.
     */
    if(usuario.value.length <= 3 || contra.value.length < 8){
        warnings += 'El usuario y/o la contraseña no son validos <br>'
        entrar = true;
        parrafo.innerHTML = warnings;  
    }else{
        axios.post("login", {
            //Enviamos al Back los valores de los inputs de el login.
                usuario: usuario.value,
                contrasena: contra.value
        })
        .then(resultado => {
            console.log(resultado);
            //Obtenemos el resultado del back si existe coincidencia con los datos ingresados en el formulario.
            if(resultado.data.error){
                console.log(resultado.data.error);
                return;
            }
            const usuario = resultado.data.resultado[0];
            const token = resultado.data.token;
            //Guardamos en el navegador el token para verificar si esta iniciada la sesion y el departamento para saber los permisos que tiene el usuario.
            sessionStorage.setItem('token', token);
            localStorage.setItem('nombreUsuario', usuario.Nombre);
            localStorage.setItem('DUA', usuario.Departamento); // Departamento de Usuario Actual.
            localStorage.setItem('PUU', usuario.Permiso); // Permiso de Usuario a Usar.
            switch(usuario.T_usuario){
                //redireccionar
                case 'Administrador':
                    location.href = "./index.html";
                    break;
                case 'Usuario':
                    location.href = "./listaAperturasUsuarios.html";
                    break;
                default:
                    alert("usuario no definido", location.href = "./listaAperturasUsuarios.html");
            }
        })
        .catch(error => {
            console.error(error);
        })
    }
});

