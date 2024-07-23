// Llamamos a la vista de tinedas de usuarios con su id.
const tiendas = document.getElementById("tiendasUsuarios");
//Usamos el mismo Back que con el administrador, solo que quitamos funciones de los administradores.
fetch("tiendas")
.then(rest => rest.json())
.then(rest => {
    rest.forEach(tienda => {
        let row = document.createElement('tr');

        let N_tienda = document.createElement('td');
        N_tienda.innerHTML = tienda.N_tienda;
        row.appendChild(N_tienda);

        let Nom_tienda = document.createElement('td');
        Nom_tienda.innerHTML = tienda.Nom_tienda;
        row.appendChild(Nom_tienda);

        let Fecha_prueba = document.createElement('td');
        Fecha_prueba.innerHTML = tienda.Fecha_prueba;
        row.appendChild(Fecha_prueba);

        let Fecha_apertura = document.createElement('td');
        Fecha_apertura.innerHTML = tienda.Fecha_apertura;
        row.appendChild(Fecha_apertura);

        // Creamos ls botones para editar, eliminar y pasos finalizados de las tiendas.
        // Con 'abbr' ponemos texto emergente a los botones.
        let opciones = document.createElement('td');
        opciones.innerHTML = `
        <abbr title="Ver pasos finalizados">
            <button id="enlacePasos" class="btnPasos">
                <img src="./assets/logos/tasks.svg" alt="pasos" class="imgPasos">
            </button>
        </abbr>  
        `;
        row.appendChild(opciones);

        tiendas.appendChild(row);

        // Al hacer click al nombre de la tienda te redirige a los pasos marcando en especifico el paso en el que va.
        opciones.querySelector('.btnPasos').addEventListener('click', function() {
            // Traemos el id de la tienda y el objeto de los pasos de este id.
            let idTienda = tienda.id;
            let pasoDeTienda = tienda.Pasos_finalizados; // Este es el objeto de pasos.
            // Guardamos el objeto en localStorage convertido en String.
            localStorage.setItem('PTAU', pasoDeTienda); // Paso de Tienda Actual a Usar (PTAU).
            location.href = 'pasosUsuarios.html';
            localStorage.setItem('TAU', tienda.id); // Tienda Actual a Usar (TAU).
        });
        // Funcion para buscar tiendas en la lista.
        document.addEventListener("keyup", e => {
            // Verifica si el evento se originó en el elemento con el ID "inputBuscar".
            if (e.target.matches("#inputBuscar")) {
                // Si el usuario presiona la tecla "Escape", borra el contenido del campo de búsqueda.
                if (e.key === "Escape") e.target.value = "";
                // Selecciona todas las filas de la tabla.
                document.querySelectorAll("tr").forEach(row => {
                    // Verifica si el texto de la fila incluye el valor de búsqueda (ignorando mayúsculas y minúsculas).
                    row.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                        ? row.style.display = ""  // Muestra la fila si la búsqueda coincide.
                        : row.style.display = "none";  // Oculta la fila si la búsqueda no coincide.
                });
            }
        });
    });
    
});