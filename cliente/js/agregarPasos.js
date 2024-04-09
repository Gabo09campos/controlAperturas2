/**
 * Con un fetch indicamos cual sera la url en donde nos mostrara los datos en la web.
 * Con .then recibimos la respuesta de la base de datos y con el json lo interpreta a una manera legible para el usuario.
 * En el forEach creamos una variable "tienda" y le indicamos que si encuentra algun registro nuevo se incremente la tabla con el appendChild.
*/

document.addEventListener('DOMContentLoaded', (event) => {
    fetch("http://localhost:3004/usuarios")
    .then(rest => rest.json())
    .then(rest => {
        let selectDep = document.getElementById('myDropdownDep'); // Menú desplegable de departamentos
        let selectUsu = document.getElementById('myDropdownUsu'); // Menú desplegable de usuarios

        rest.resultado.forEach(usuario => {
            // Código para el botón de departamentos
            let optionDep = document.createElement('option');
            optionDep.href = "#"; // El departamento del usuario se usa como valor
            optionDep.text = usuario.Departamento; // El departamento del usuario se muestra en el menú desplegable
            selectDep.appendChild(optionDep);

            // Código para el botón de usuarios
            let optionUsu = document.createElement('option');
            optionUsu.href = "#"; // El nombre del usuario se usa como valor
            optionUsu.text = usuario.Nombre; // El nombre del usuario se muestra en el menú desplegable
            selectUsu.appendChild(optionUsu);
        });

        document.getElementById('btnDep').addEventListener('click', function(e) {
            e.preventDefault();
            selectDep.classList.toggle("show");
        });

        document.getElementById('btnUsu').addEventListener('click', function(e) {
            e.preventDefault();
            selectUsu.classList.toggle("show");
        });
    });
});
