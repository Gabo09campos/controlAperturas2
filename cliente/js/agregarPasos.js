/**
 * Con un fetch indicamos cual sera la url en donde nos mostrara los datos en la web.
 * Con .then recibimos la respuesta de la base de datos y con el json lo interpreta a una manera legible para el usuario.
 * En el forEach creamos una variable "tienda" y le indicamos que si encuentra algun registro nuevo se incremente la tabla con el appendChild.
 */
fetch("http://localhost:3004/usuarios")
.then(rest => rest.json())
.then(rest => {
    rest.forEach(usuarios => {
        usuarios
        // row es una variable para crear 'a' en tabla de la vista del cliente.
        let row = document.createElement('a');

        

        /************************************************* */
        /* Cuando el usuario da clic se dispara la fuincion de verDepartamentos */
        function verDepartamentos(event) {
            event.preventDefault();
            document.getElementById("myDropdownDep").classList.toggle("show");
        }

        /* Cuando el usuario da clic se dispara la fuincion de verUsuarios */
        function verUsuarios(event) {
            event.preventDefault();
            document.getElementById("myDropdownUsu").classList.toggle("show");
        }
        /* Al efectuarse la funcion se recorren las opciones de los botones para mostrarlas y que el usuario elija alguna.*/
        window.onclick = function(event) {
            if (!event.target.matches('.btnDep')) {
                var dropdowns = document.getElementsByClassName("departamentos");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                        let departamento = document.createElement('a');
                        departamento.innerHTML = usuarios.Departamento;
                        row.appendChild(departamento);
                    }
                }
            }

            if (!event.target.matches('.btnUsu')) {
                var dropdowns = document.getElementsByClassName("usuarios");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                        let usuario = document.createElement('a');
                        usuario.innerHTML = usuarios.Nombre;
                        row.appendChild(usuario);
                    }
                }
            }
        }
    });
});

fetch("http://localhost:3004/usuarios")
.then(rest => rest.json())
.then(rest => {
    let selectDep = document.getElementById('myDropdownDep'); // Menú desplegable de departamentos
    let selectUsu = document.getElementById('myDropdownUsu'); // Menú desplegable de usuarios

    rest.resultado.forEach(usuario => {
        // Crear un nuevo elemento 'option' para cada departamento
        let optionDep = document.createElement('option');
        optionDep.value = usuario.Departamento; // El departamento del usuario se usa como valor
        optionDep.text = usuario.Departamento; // El departamento del usuario se muestra en el menú desplegable
        selectDep.appendChild(optionDep);

        // Crear un nuevo elemento 'option' para cada usuario
        let optionUsu = document.createElement('option');
        optionUsu.value = usuario.Nombre; // El nombre del usuario se usa como valor
        optionUsu.text = usuario.Nombre; // El nombre del usuario se muestra en el menú desplegable
        selectUsu.appendChild(optionUsu);
    });
});
