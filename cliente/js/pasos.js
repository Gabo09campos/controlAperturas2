//Obtenemos la tabla de el HTML a travez de su id para poder mandarle los datos.
let pasos = document.getElementById("pasosApertura");
/**
 * Con un fetch indicamos cual sera la url en donde nos mostrara los datos en la web.
 * Con .then recibimos la respuesta de la base de datos y con el json lo interpreta a una manera legible para el usuario.
 * En el forEach creamos una variable "tienda" y le indicamos que si encuentra algun registro nuevo se incremente la tabla con el appendChild.


// Crear un objeto para almacenar el estado de los botones
let estadoBotones = {};

fetch("http://localhost:3004/pasos")
.then(rest => rest.json())
.then(rest => {
    rest.forEach((apertura, index) => {
        let row = document.createElement('div');
        
        let Nom_apertura = document.createElement('button');
        Nom_apertura.innerHTML = apertura.Nom_apertura;
        row.appendChild(Nom_apertura);

        // Inicializar el estado del botón en el objeto
        estadoBotones[apertura.Id_agregar] = 0; // 0 para no finalizado, 1 para finalizado

        pasos.appendChild(row);
        fetch("http://localhost:3004/tiendas")
        .then(rest => rest.json())
        .then(rest => {
            rest.forEach(tienda => {
                // row es una variable para crear 'tr' en tabla de la vista del cliente.
                let idTienda = tienda.id;
                //console.log(Nom_apertura);
                

                Nom_apertura.addEventListener('click', function(e) {
                    
                    e.preventDefault();
                    let idPaso = apertura.Id_agregar;
                    console.log(idPaso);
                    
                    // Cambiar el estado del botón en el objeto.
                    estadoBotones[idPaso] = 1; // Marcar como finalizado.
            
                    if (index === 0 || estadoBotones[rest[index - 1].Id_agregar] === 1) {
                        // Cambiar el estado del botón en el objeto.
                        estadoBotones[idPaso] = 1; // Marcar como finalizado.
            
                        Nom_apertura.style.color = "white";
                        Nom_apertura.style.backgroundColor = "green";
                        // Obtenemos el id de la tienda para saber hacia donde enviaremos la actualizcion de los botones.
                            /*
                        //console.log(idTienda); 
                        // Validamos que se envie hacia la fila del id de esta tienda para su seguimiento de pasos.
                        if(idTienda){
                            // Enviar el estado de los botones a la base de datos.
                            fetch('http://localhost:3004/agregarPasoFinzalizado', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    id: idTienda,
                                    Id_agregar: idPaso,
                                    estado: estadoBotones[idPaso]
                                }),
                            })
                            .then(response => response.json())
                            .then(data => console.log('Success:', data))
                            .catch((error) => console.error('Error:', error)); 
                        }else{
                            console.log('no se nada');
                        }
                
                        
                    } else {
                        alert('Debes completar el paso anterior primero.');
                    }
                });
            });
        });
        
    }); 
}); */

let estadoBotones = {};

fetch("http://localhost:3004/pasos")
.then(rest => rest.json())
.then(rest => {
    rest.forEach((apertura, index) => {
        let row = document.createElement('div');
        
        let Nom_apertura = document.createElement('button');
        Nom_apertura.innerHTML = apertura.Nom_apertura;
        row.appendChild(Nom_apertura);

        estadoBotones[apertura.Id_agregar] = 0;

        pasos.appendChild(row);

        Nom_apertura.addEventListener('click', function(e) {
            e.preventDefault();
            let idPaso = apertura.Id_agregar;
            
            if (index === 0 || estadoBotones[rest[index - 1].Id_agregar] === 1) {
                estadoBotones[idPaso] = 1;
                
                Nom_apertura.style.color = "white";
                Nom_apertura.style.backgroundColor = "green";
                console.log(idPaso);
                
                fetch("http://localhost:3004/tiendas")
                .then(rest => rest.json())
                .then(rest => {
                    rest.forEach(tienda => {
                        let idTienda = tienda.id;
                        
                        // Enviar el estado de los botones a la base de datos.
                        fetch('http://localhost:3004/agregarPasoFinzalizado', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: idTienda,
                                Id_agregar: idPaso,
                                estado: estadoBotones[idPaso]
                            }),
                        })
                        .then(response => response.json())
                        .then(data => console.log('Success:', data))
                        .catch((error) => console.error('Error:', error)); 
                        
                    });
                }); 
                
            } else {
                alert('Debes completar el paso anterior primero.');
            }
        });
    }); 
});
