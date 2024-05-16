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
        // Creamos un div para cada boton.
        let row = document.createElement('div');
        // Creamos los botones conforme los trae la base de datos.
        let Nom_apertura = document.createElement('button');
        Nom_apertura.innerHTML = apertura.Nom_apertura; // Establece el contenido del botón al nombre de la apertura.
        row.appendChild(Nom_apertura); // Agrega el botón al div de la fila.
        // Mostramos el numero de cada paso.
        let Num_paso = document.createElement('p');
        Num_paso.innerHTML = apertura.Num_paso;
        row.appendChild(Num_paso);
        // Agrega la fila al elemento 'pasos' en el DOM.
        pasos.appendChild(row);
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
