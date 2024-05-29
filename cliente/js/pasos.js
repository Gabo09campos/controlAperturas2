//Obtenemos la tabla de el HTML a travez de su id para poder mandarle los datos.
let pasos = document.getElementById("pasosApertura");
let estadoBotones = []; // Creamos un objeto para almacenar los botones que ya fueron completados.
// Al cargar la página, obtenemos los pasos guardados en localStorage y parseamos el String un Array.
let pasosGuardados = JSON.parse(localStorage.getItem('PTAU'));
/******************************************************************* */
// Esto es para que solo el departamento pueda finalizar su paso, pero esta en proceso.
let depUsuario = [];
fetch("http://localhost:3004/usuarios")
.then(rest => rest.json())
.then(rest => {
    rest.forEach((usuario) => {
        depUsuario = [usuario.Departamento];
        //console.log('depas de usuarios', depUsuario);
    })
})
/**
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
        //Esto es de prueba en proceso.
        let depResponsable = [apertura.Departamento_responsble];
        //console.log('depas de paso', depResponsable);
        /*function compararArreglos(depResponsable, depUsuario) {
            if (depResponsable.length !== depUsuario.length) {
                console.log('Los arreglos no tienen la misma longitud.');
                return;
            }
        
            for (let i = 0; i < depResponsable.length; i++) {
                if (depResponsable[i] === depUsuario[i]) {
                    // Realiza acciones específicas para elementos iguales
                    console.log(`Elemento ${i}: ${depResponsable[i]} es igual en ambos arreglos.`);
                    // Aquí puedes agregar más lógica según tus necesidades
                } else {
                    // Realiza acciones específicas para elementos diferentes
                    console.log(`Elemento ${i}: ${depResponsable[i]} es diferente en ambos arreglos.`);
                    // Aquí también puedes agregar más lógica según tus necesidades
                }
            }
        }
        // Ejemplo de arreglos con valores desde la base de datos
        depUsuario; // Reemplaza con tus valores reales
        depResponsable; // Reemplaza con tus valores reales

        compararArreglos(depResponsable, depUsuario);
        function compararArreglos(depResponsable, depUsuario) {
            if (depResponsable.length !== depUsuario.length) {
                console.log('Los arreglos no tienen la misma longitud.');
                return;
            }
        
            for (let i = 0; i < depResponsable.length; i++) {
                if (depResponsable[i] === depUsuario[i]) {
                    //console.log(`Elemento ${i}: ${arr1[i]} es igual en ambos arreglos.`);
                    // Realiza acciones específicas para elementos iguales
                    // Por ejemplo, puedes llamar a una función específica aquí
                    Nom_apertura.addEventListener('click', function(e) {
                        // Prevenimos que la pagina se recargue.
                        e.preventDefault();
                        
                        // En una variable llamamos el id de los pasos (los datos fueron cambiados de Id_agregar a Num_paso, sin embargo la variable se deja con el mismo nombre por practicidad).
                        let idPaso = apertura.Num_paso;
                        // Con un condicional verificamos que no se pueda marcar un paso hasta que el anterior este completado.
                        if (index === 0 || estadoBotones[rest[index - 1].Num_paso] === 1) {
                            estadoBotones[idPaso] = 1; // Marcar como finalizado.
                            // Al estar finalizado el paso, cambia su color.
                            Nom_apertura.style.color = "white";
                            Nom_apertura.style.backgroundColor = "green";
                            // Traemos el ID de la tienda en la que estamos.
                            let idTiendaActual = localStorage.getItem('TAU');
                                // Enviamos los datos del objeto a la tienda correspondiente.
                                if(idTiendaActual){
                                    // Filtramos todos los valores que no sean booleano.
                                    let nuevoEstado = estadoBotones.filter(value => value !== null && value !== "null" && value !== undefined && value !== "" && (value === 0 || value === 1));
                                    // Enviar el estado de los botones a la base de datos.
                                    fetch('http://localhost:3004/agregarPasoFinzalizado', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            id: idTiendaActual,
                                            Id_agregar: idPaso,
                                            estado: nuevoEstado // Enviamos todo el objeto.
                                        }),
                                    })
                                    .then(response => response.json())
                                    .then(data => console.log('Success:', data))
                                    .catch((error) => console.error('Error:', error)); 
                                }
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
                            // Si no se cumple el condicional enviamos un mensaje.
                            Swal.fire({
                                icon: "error",
                                title: 'Error!',
                                text: 'Debes completar el paso anterior',
                                confirmButtonText: 'Continuar',
                            })
                        } 
                    });
                } else {
                    console.log(`Elemento ${i}: ${depResponsable[i]} es diferente en ambos arreglos.`);
                    // Realiza acciones específicas para elementos diferentes
                    // Por ejemplo, puedes bloquear acceso o ejecutar otra lógica aquí
                    const btnPaso = document.getElementsByTagName('button')
                    btnPaso.disabled = true; 
                    console.log('boton desactivado');
                }
            }
        }*/
        
        //compararArreglos(depUsuario, depResponsable);
        function compararArreglos(depUsuario, depResponsable) {
            // Convierte los arreglos a cadenas de texto
            const strArr1 = JSON.stringify(depUsuario);
            const strArr2 = JSON.stringify(depResponsable);
        
            if (strArr1 === strArr2) {
                console.log('Los arreglos son equivalentes.');
                // Aquí puedes agregar más lógica según tus necesidades
                Nom_apertura.addEventListener('click', function(e) {
                    // Prevenimos que la pagina se recargue.
                    e.preventDefault();
                    
                    // En una variable llamamos el id de los pasos (los datos fueron cambiados de Id_agregar a Num_paso, sin embargo la variable se deja con el mismo nombre por practicidad).
                    let idPaso = apertura.Num_paso;
                    // Con un condicional verificamos que no se pueda marcar un paso hasta que el anterior este completado.
                    if (index === 0 || estadoBotones[rest[index - 1].Num_paso] === 1) {
                        estadoBotones[idPaso] = 1; // Marcar como finalizado.
                        // Al estar finalizado el paso, cambia su color.
                        Nom_apertura.style.color = "white";
                        Nom_apertura.style.backgroundColor = "green";
                        // Traemos el ID de la tienda en la que estamos.
                        let idTiendaActual = localStorage.getItem('TAU');
                            // Enviamos los datos del objeto a la tienda correspondiente.
                            if(idTiendaActual){
                                // Filtramos todos los valores que no sean booleano.
                                let nuevoEstado = estadoBotones.filter(value => value !== null && value !== "null" && value !== undefined && value !== "" && (value === 0 || value === 1));
                                // Enviar el estado de los botones a la base de datos.
                                fetch('http://localhost:3004/agregarPasoFinzalizado', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        id: idTiendaActual,
                                        Id_agregar: idPaso,
                                        estado: nuevoEstado // Enviamos todo el objeto.
                                    }),
                                })
                                .then(response => response.json())
                                .then(data => console.log('Success:', data))
                                .catch((error) => console.error('Error:', error)); 
                            }
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
                        // Si no se cumple el condicional enviamos un mensaje.
                        Swal.fire({
                            icon: "error",
                            title: 'Error!',
                            text: 'Debes completar el paso anterior',
                            confirmButtonText: 'Continuar',
                        })
                    } 
                });
            } else {
                console.log('Los arreglos son diferentes.');
                // Aquí también puedes agregar más lógica según tus necesidades.
                const btnPaso = document.getElementsByTagName('button')
                btnPaso.disabled = true; 
                console.log('boton desactivado');
            }
        } 
        
        // Ejemplo de arreglos con valores desde la base de datos
        //const depUsuario = [usuario.Departamento]; // Reemplaza con tus valores reales
        //const depResponsable = [apertura.Departamento_responsble]; // Reemplaza con tus valores reales
        
        // Llama a la función para comparar los arreglos
        compararArreglos(depUsuario, depResponsable);

        // hasta aqui
        // Creamos un evento para saber cuando se dio click a un boton.
        Nom_apertura.addEventListener('click', function(e) {
            // Prevenimos que la pagina se recargue.
            e.preventDefault();
            /*
            // En una variable llamamos el id de los pasos (los datos fueron cambiados de Id_agregar a Num_paso, sin embargo la variable se deja con el mismo nombre por practicidad).
            let idPaso = apertura.Num_paso;
            // Con un condicional verificamos que no se pueda marcar un paso hasta que el anterior este completado.
            if (index === 0 || estadoBotones[rest[index - 1].Num_paso] === 1) {
                estadoBotones[idPaso] = 1; // Marcar como finalizado.
                // Al estar finalizado el paso, cambia su color.
                Nom_apertura.style.color = "white";
                Nom_apertura.style.backgroundColor = "green";
                // Traemos el ID de la tienda en la que estamos.
                let idTiendaActual = localStorage.getItem('TAU');
                    // Enviamos los datos del objeto a la tienda correspondiente.
                    if(idTiendaActual){
                        // Filtramos todos los valores que no sean booleano.
                        let nuevoEstado = estadoBotones.filter(value => value !== null && value !== "null" && value !== undefined && value !== "" && (value === 0 || value === 1));
                        // Enviar el estado de los botones a la base de datos.
                        fetch('http://localhost:3004/agregarPasoFinzalizado', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: idTiendaActual,
                                Id_agregar: idPaso,
                                estado: nuevoEstado // Enviamos todo el objeto.
                            }),
                        })
                        .then(response => response.json())
                        .then(data => console.log('Success:', data))
                        .catch((error) => console.error('Error:', error)); 
                    }
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
                // Si no se cumple el condicional enviamos un mensaje.
                Swal.fire({
                    icon: "error",
                    title: 'Error!',
                    text: 'Debes completar el paso anterior',
                    confirmButtonText: 'Continuar',
                })
            } */
        });
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
