
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

        // Agregar controladores de eventos a los botones
        opciones.querySelector('.btnEditar').addEventListener('click', function() {
            // Código para editar la tienda
            //console.log('Editar tienda', tienda);
            console.log("Ahora puedes editar");
        });
        opciones.querySelector('.btnEliminar').addEventListener('click', function() {
            // Código para eliminar la tienda
            console.log('Eliminar tienda', tienda);

            fetch(`http://localhost:3004/tiendas/${tienda.id}`,
            { 
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(() => {
                console.log('tienda eliminada');
                row.remove();
            })
            .catch(error => console.error('error:', error));
        });
    });
    
});

