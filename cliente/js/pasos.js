//Obtenemos la tabla de el HTML a travez de su id para poder mandarle los datos.
let pasos = document.getElementById("pasosApertura");
let estadoBotones = []; // Creamos un objeto para almacenar los botones que ya fueron completados.
// Al cargar la página, obtenemos los pasos guardados en localStorage y parseamos el String un Array.
let pasosGuardados = JSON.parse(localStorage.getItem('PTAU'));
let depaUsuario = localStorage.getItem('DUA'); // Traemos el departamento del usuario que inicio sesion (como string).
/*************************************************************************************
 * Con un fetch indicamos cual sera la url en donde nos mostrara los datos en la web.
 * Con .then recibimos la respuesta de la base de datos y con el json lo interpreta a una manera legible para el usuario.
 * En el forEach creamos una variable "tienda" y le indicamos que si encuentra algun registro nuevo se incremente la tabla con el appendChild.
*/
fetch("http://localhost:3004/pasos")
.then(rest => rest.json())
.then(rest => {
    // Ordena el array 'rest' según el número de paso.
    rest.sort((a, b) => a.Num_paso - b.Num_paso);
    // Creamos unas variables que utilizaremos para usar los datos de la API.
    rest.forEach((apertura, index) => {
        let row = document.createElement('div');

        let Nom_apertura = document.createElement('button');
        Nom_apertura.innerHTML = apertura.Nom_apertura;
        row.appendChild(Nom_apertura);

        let Num_paso = document.createElement('p');
        Num_paso.innerHTML = apertura.Num_paso;
        row.appendChild(Num_paso);

        // Verificamos si el paso actual está en localStorage y si es true.
        if (pasosGuardados[index] === 1) {
            Nom_apertura.style.color = "white";
            Nom_apertura.style.backgroundColor = "green";
            // Si el objeto de localstorage trae pasos completados, los agregamos a botones para que no se vuelvan a marcar.
            estadoBotones[apertura.Num_paso] = 1; 
        } else {
            // Si el objeto de localstorage no trae pasos completados, lo guardamos en 0 para ir guardando su valor.
            estadoBotones[apertura.Num_paso] = 0; 
        }
        
        pasos.appendChild(row);
        /*********************************************************** */
        // En una variable ponemos los departamentos de los pasos.
        let depResponsable = apertura.Departamento_responsble;
        // En el nombre de cada boton ponemos un evento de escucha para el click.
        Nom_apertura.addEventListener('click', function(e) {
            // Prevenimos que la pagina se recargue.
            e.preventDefault();
            // Comparamos si el departamento del usuario (localStorage) coincide con el del paso.
            if (depaUsuario === depResponsable) {
                console.log('Los arreglos son equivalentes.'); 
                // En una variable llamamos los pasos.
                let numPaso = apertura.Num_paso;
                // Con un condicional verificamos que no se pueda marcar un paso hasta que el anterior este completado.
                if (index === 0 || estadoBotones[rest[index - 1].Num_paso] === 1) {
                    estadoBotones[numPaso] = 1; // Marcar como finalizado.
                    // Al estar finalizado el paso, cambia su color.
                    Nom_apertura.style.color = "white";
                    Nom_apertura.style.backgroundColor = "green";
                    // Traemos el ID de la tienda en la que estamos (localStorage).
                    let idTiendaActual = localStorage.getItem('TAU');
                        // Enviamos los datos del objeto a la tienda correspondiente.
                        // Esta comentado para las pruebas.
                       /* if(idTiendaActual){
                            // Filtramos y eliminamos todos los valores que no sean booleano.
                            let nuevoEstado = estadoBotones.filter(value => value !== null && value !== "null" && value !== undefined && value !== "" && (value === 0 || value === 1));
                            // Enviar el estado de los botones a la base de datos.
                            fetch('http://localhost:3004/agregarPasoFinzalizado', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    id: idTiendaActual,
                                    Id_agregar: numPaso,
                                    estado: nuevoEstado // Enviamos todo el objeto.
                                }),
                            })
                            .then(response => response.json())
                            .then(data => console.log('Success:', data))
                            .catch((error) => console.error('Error:', error)); 
                        }*/
                        // Si ya finalizo en paso, se le reedirige hacia el index y se guarda el valor del boton como finalizado.
                        Swal.fire({
                            icon: "success",
                            title: "Buen trabajo equipo",
                            showConfirmButton: false,
                            timer: 1500
                        }).then((result) => {
                            // Redirige solo después de que se cierre la alerta.
                            location.href = 'index.html';
                        });
                } else {
                    // Si no se cumple el condicional de estar finalizado el paso anterior enviamos un mensaje.
                    Swal.fire({
                         icon: "error",
                        title: 'Error!',
                        text: 'Debes completar el paso anterior',
                        confirmButtonText: 'Continuar',
                    })
                } 
            } else {
                console.log('Los arreglos son diferentes.');
                // Si el departamento del usuario es diferente al del paso, se deshabilita el boton.
                const btnPaso = document.getElementsByTagName('button')
                btnPaso.disabled = true; 
                // Enviamos un mensaje de error en caso de dar click.
                Swal.fire({
                    icon: "error",
                    title: 'Error!',
                    text: 'No tienes acceso a este boton',
                    confirmButtonText: 'Continuar',
                })
                console.log('boton desactivado');
            }
        });
        /************************************************* */
        // Funcion para buscar pasos por su nombre.
        document.addEventListener("keyup", e => {
            // Verifica si el evento se originó en el elemento con el ID "inputBuscar".
            if (e.target.matches("#inputBuscar")) {
                // Si el usuario presiona la tecla "Escape", borra el contenido del campo de búsqueda.
                if (e.key === "Escape") e.target.value = "";
                // Selecciona todas las filas de la tabla.
                document.querySelectorAll("div button").forEach(row => {
                    // Verifica si el texto de la fila incluye el valor de búsqueda (ignorando mayúsculas y minúsculas).
                    row.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                        ? row.style.display = ""  // Muestra la fila si la búsqueda coincide.
                        : row.style.display = "none";  // Oculta la fila si la búsqueda no coincide.
                });
            }
        });
    }); 
});
