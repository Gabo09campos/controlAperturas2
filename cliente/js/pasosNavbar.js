// Estos son los pasos que se muestran al dar click en el boton del navbar. <--
//Obtenemos la tabla de el HTML a travez de su id para poder mandarle los datos.
let pasos = document.getElementById("pasosApertura");
// Realiza una solicitud GET a la API para obtener todos los pasos.
fetch("http://localhost:3004/pasos")
.then(rest => rest.json()) // Convierte la respuesta en un objeto JSON.
.then(rest => {
    // Ordena el array 'rest' según el número de paso.
    rest.sort((a, b) => a.Num_paso - b.Num_paso);
    // Para cada paso en el array 'rest'.
    rest.forEach((apertura) => {
        // row es una variable para crear 'tr' en tabla de la vista del cliente.
        let row = document.createElement('tr');

        let Num_paso = document.createElement('td');
        Num_paso.innerHTML = apertura.Num_paso;
        row.appendChild(Num_paso);
 
        let Nom_apertura = document.createElement('td');
        Nom_apertura.innerHTML = apertura.Nom_apertura;
        row.appendChild(Nom_apertura);
 
        let Departamento_responsable = document.createElement('td');
        Departamento_responsable.innerHTML = apertura.Departamento_responsble;
        row.appendChild(Departamento_responsable);
 
        let Usuario = document.createElement('td');
        Usuario.innerHTML = apertura.Usuario;
        row.appendChild(Usuario);
        // Creamos los botones para editar, eliminar y pasos finalizados de las tiendas.
        // Con 'abbr' ponemos texto emergente a los botones.
        let opciones = document.createElement('td');
        opciones.innerHTML = `
        <abbr title="Editar tienda">
            <button class="btnEditar">
                <img src="./assets/logos/edit.svg" alt="editar" class="imgEditar" tittle="Editar tienda">
            </button>
        </abbr>
        `;
        row.appendChild(opciones);
 
        pasos.appendChild(row);
        /**************************************************************************************************************** */
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


