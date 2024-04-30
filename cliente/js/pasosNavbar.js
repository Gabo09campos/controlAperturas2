//Obtenemos la tabla de el HTML a travez de su id para poder mandarle los datos.
let pasos = document.getElementById("pasosApertura");
/**
 * Con un fetch indicamos cual sera la url en donde nos mostrara los datos en la web.
 * Con .then recibimos la respuesta de la base de datos y con el json lo interpreta a una manera legible para el usuario.
 * En el forEach creamos una variable "tienda" y le indicamos que si encuentra algun registro nuevo se incremente la tabla con el appendChild.
*/
fetch("http://localhost:3004/pasos")
.then(rest => rest.json())
.then(rest => {
    rest.forEach((apertura, index) => {
        let row = document.createElement('div');
        
        let Nom_apertura = document.createElement('button');
        Nom_apertura.innerHTML = apertura.Nom_apertura;
        row.appendChild(Nom_apertura);
        
        pasos.appendChild(row);
    }); 
});
