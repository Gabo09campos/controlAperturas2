//Obtenemos la tabla de el HTML a travez de su id para poder mandarle los datos.
const tiendas = document.getElementById("tiendasLista");

/**
 * Con un fetch indicamos cual sera la url en donde nos mostrara los datos en la web.
 * Con .then recibimos la respuesta de la base de datos y con el json lo interpreta a una manera legible para el usuario.
 * En el forEach creamos una variable "tienda" y le indicamos que si encuentra algun registro nuevo se incremente la tabla con el appendChild.
 */
fetch("http://localhost:3004/tiendas")
.then(rest => rest.json())
.then(rest => {
    rest.forEach(tienda => {
        // row es una variable para crear 'tr' en tabla de la vista del cliente.
        let row = document.createElement('tr');

        let N_tienda = document.createElement('td');
        N_tienda.innerHTML = tienda.N_tienda;
        row.appendChild(N_tienda);

        let Nom_tienda = document.createElement('td');
        Nom_tienda.innerHTML = `<a href="Pasos.html">${tienda.Nom_tienda}</a>`;
        row.appendChild(Nom_tienda);

        let Fecha_prueba = document.createElement('td');
        Fecha_prueba.innerHTML = tienda.Fecha_prueba;
        row.appendChild(Fecha_prueba);

        let Fecha_apertura = document.createElement('td');
        Fecha_apertura.innerHTML = tienda.Fecha_apertura;
        row.appendChild(Fecha_apertura);

        let opciones = document.createElement('td');
        opciones.innerHTML = `
            <button class="btnEditar">Editar</button>
            <button class="btnEliminar">Eliminar</button>
        `;
        row.appendChild(opciones);

        tiendas.appendChild(row);

        // Código para editar la tienda
        opciones.querySelector('.btnEditar').addEventListener('click', function() {
            // Solicitamos al usuario los nuevos datos de la tienda.
            let nuevoNumero = prompt("Por favor ingresa el nuevo numero de la tienda", tienda.N_tienda);
            let nuevoNombre = prompt("Por favor ingresa el nuevo nombre de la tienda", tienda.Nom_tienda);
            let nuevaFechaPrueba = prompt("Por favor ingresa la nueva fecha de prueba", tienda.Fecha_prueba);
            let nuevaFechaApertura = prompt("Por favor ingresa la nueva fecha de apertura", tienda.Fecha_apertura);
            //Validamos que los campos esten llenos.
            if(nuevoNumero !== null && nuevoNombre !== null && nuevaFechaPrueba !== null && nuevaFechaApertura !== null){
                //En esta parte es en donde se actualizan los valores en la base de datos.
                //Utilizamos fetch con el metodo "PUT" para actualizar los valores en el servidor.
                const myDataObject = {
                    N_tienda: nuevoNumero,
                    Nom_tienda: nuevoNombre,
                    Fecha_prueba: nuevaFechaPrueba,
                    Fecha_apertura: nuevaFechaApertura
                }
                fetch(`http://localhost:3004/editarTienda/${tienda.id}`,
                { 
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(myDataObject)
                })
                .then(response => response.json())
                .then(() => {
                    console.log('tienda actualizada');
                    // Actualiza los datos en la tabla.
                    N_tienda.innerHTML = nuevoNumero;
                    Nom_tienda.innerHTML = `<a href="Pasos.html">${nuevoNombre}</a>`;
                    Fecha_prueba.innerHTML = nuevaFechaPrueba;
                    Fecha_apertura.innerHTML = nuevaFechaApertura;
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
            const myDataObject = {tienda: 1}
            if(confirm('¿Estas seguro de eliminar esta tienda?') == true){
                fetch(`http://localhost:3004/borrarTienda/${tienda.id}`,
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

