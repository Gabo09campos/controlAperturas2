//Obtenemos la tabla de el HTML a travez de su id para poder mandarle los datos.
let pasos = document.getElementById("pasosApertura");
/**
 * Con un fetch indicamos cual sera la url en donde nos mostrara los datos en la web.
 * Con .then recibimos la respuesta de la base de datos y con el json lo interpreta a una manera legible para el usuario.
 * En el forEach creamos una variable "tienda" y le indicamos que si encuentra algun registro nuevo se incremente la tabla con el appendChild.

fetch("http://localhost:3004/pasos")
.then(rest => rest.json())
.then(rest => {
    rest.forEach(aperura => {
        // row es una variable para crear 'tr' en tabla de la vista del cliente.
        let row = document.createElement('div');

        let Nom_apertura = document.createElement('button');
        Nom_apertura.innerHTML = aperura.Nom_apertura;
        row.appendChild(Nom_apertura);

        pasos.appendChild(row);
    });
});
*/
fetch("http://localhost:3004/pasos")
.then(rest => rest.json())
.then(rest => {
    rest.forEach(apertura => {
        let row = document.createElement('div');

        let Nom_apertura = document.createElement('button');
        Nom_apertura.innerHTML = apertura.Nom_apertura;
        row.appendChild(Nom_apertura);

        /** paso 1.- Obtener el id de la tienda a la que se le dio click.
         * paso 2.- Revisar la columna de pasos finalizados de esta tienda (en la tabla tiendas).
         * paso 3.- Recorrer la tabla para saber que paso esta marcado como finalizado (1) y cuales no (0).
         * paso 4.- Comparar si el id de la tienda coicide con el paso en el que va.
         * paso 5.- Ingresar a pasos marcando en algun color el paso en el que va o desabilitando los pasos anterores.
         * paso 6.- Al dar click en un paso este se tiene cambiar de color o desabilitarse.
         * paso 7.- Este nuevo paso desabilitado se debe guardar en la tabla de esta tienda en especifico para que al volver a abrirla se muestre como el paso en el que va.
         */

        // Aquí puedes verificar si el paso actual para la tienda seleccionada es igual al paso de esta iteración.
        if (pasoDeTienda[nombreDeLaTiendaSeleccionada] === apertura.paso) {
            // Si es así, se puede poner de algun color el paso o desabnilitar los pasos anteriores.
            //Nom_apertura.style.backgroundColor = 'yellow';
            console.log('vamos bien');
        }
        pasos.appendChild(row);

        Nom_apertura.addEventListener('click', function() {
            // Al dar click en un boton, este cambiara de boton para saber que ya fue completado.
            
            // Debemos enviar los valores de los botones (1,0) a la base de datos en la tabla de tiendas en la columna correspondiente al nombre y/o id de la tienda desde la que se realice la accion.
            
        });
    }); 
});
