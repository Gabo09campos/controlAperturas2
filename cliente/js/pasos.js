//Obtenemos la tabla de el HTML a travez de su id para poder mandarle los datos.
let pasos = document.getElementById("pasosApertura");
/**
 * Con un fetch indicamos cual sera la url en donde nos mostrara los datos en la web.
 * Con .then recibimos la respuesta de la base de datos y con el json lo interpreta a una manera legible para el usuario.
 * En el forEach creamos una variable "tienda" y le indicamos que si encuentra algun registro nuevo se incremente la tabla con el appendChild.
*/
// Creamos un objeto para almacenar los botones.
let estadoBotones = {};

fetch("http://localhost:3004/pasos")
.then(rest => rest.json())
.then(rest => {
    rest.forEach((apertura, index) => {
        let row = document.createElement('div');
        
        let Nom_apertura = document.createElement('button');
        Nom_apertura.innerHTML = apertura.Nom_apertura;
        row.appendChild(Nom_apertura);
        // Iniciamos elobjeto en 0 para ir guardando su valos posteriormente.
        estadoBotones[apertura.Id_agregar] = 0;
        
        pasos.appendChild(row);
        // Creamos un evento para saber cuando se dio click a un boton.
        Nom_apertura.addEventListener('click', function(e) {
            // Prevenimos que la pagina se recargue.
            e.preventDefault();
            // En una variable llamamos el id de los pasos.
            let idPaso = apertura.Id_agregar;
            // Con un condicional verificamos que no se pueda marcar un paso hasta que el anterior este completado.
            if (index === 0 || estadoBotones[rest[index - 1].Id_agregar] === 1) {
                estadoBotones[idPaso] = 1; // Marcar como finalizado.
                //console.log(estadoBotones);
                // Al estar finalizado el paso, cambia su color.
                Nom_apertura.style.color = "white";
                Nom_apertura.style.backgroundColor = "green";
                // Treaemos el ID de la tienda en la que estamos.
                let idTiendaActual = localStorage.getItem('TAU');
                console.log(idTiendaActual);
                    // Enviamos los datos del objeto a la tienda correspondiente.
                    if(idTiendaActual){
                        
                        // Enviar el estado de los botones a la base de datos.
                        fetch('http://localhost:3004/agregarPasoFinzalizado', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: idTiendaActual,
                                Id_agregar: idPaso,
                                estado: estadoBotones // Enviamos todo el objeto.
                            }),
                        })
                        .then(response => response.json())
                        .then(data => console.log('Success:', data))
                        .catch((error) => console.error('Error:', error)); 
                    }
            } else {
                // Si no se cumple el condicional enviamos un mensaje.
                alert('Debes completar el paso anterior primero.');
            }
        });
    }); 
});
