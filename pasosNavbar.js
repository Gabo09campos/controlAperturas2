let pasos = document.getElementById("pasosApertura");
// Realiza una solicitud GET a la API para obtener todos los pasos.
fetch("http://localhost:3004/pasos")
.then(rest => rest.json()) 
.then(rest => {
    // Ordena el array 'rest' según el número de paso.
    rest.sort((a, b) => a.Num_paso - b.Num_paso);
    rest.forEach((apertura) => {
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
        // Editar paso.
        opciones.querySelector('.btnEditar').addEventListener('click', async function() {
            // Mostramos un formulario SweetAlert2 con los valores actuales de la tienda.
            const { value: formValues } = await Swal.fire({
                title: "Multiple inputs",
                html: `
                    <input id="swal-input1" class="swal2-input" value="${apertura.Num_paso}">
                    <input id="swal-input2" class="swal2-input" value="${apertura.Nom_apertura}">
                    <input id="swal-input3" class="swal2-input" value="${apertura.Departamento_responsble}">
                    <input id="swal-input4" class="swal2-input" value="${apertura.Usuario}">
                `,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById("swal-input1").value,
                        document.getElementById("swal-input2").value,
                        document.getElementById("swal-input3").value,
                        document.getElementById("swal-input4").value
                    ];
                }
            });
            if (formValues) {
                const [nuevoNumeroPaso, nuevoNombrePaso, nuevoDepartamentoResponsable, nuevoUsuario] = formValues;
                const myDataObject = {
                    Num_paso: nuevoNumeroPaso,
                    Nom_apertura: nuevoNombrePaso,
                    Departamento_responsble: nuevoDepartamentoResponsable,
                    Usuario: nuevoUsuario
                }
                console.log(apertura.Id_agregar);
                // Hacemos una petición PUT para actualizar la tienda en el servidor.
                fetch(`http://localhost:3004/editarPaso/${apertura.Id_agregar}`, { 
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(myDataObject)
                })
                .then(response => response.json())
                .then(() => {
                    // Finalmente actualiza los datos en la tabla.
                    Num_paso.innerHTML = nuevoNumeroPaso;
                    Nom_apertura.innerHTML = nuevoNombrePaso;
                    Departamento_responsable.innerHTML = nuevoDepartamentoResponsable;
                    Usuario.innerHTML = nuevoUsuario;
                })
                .catch(error => console.error('error:', error));
            }
        });
        // Funcion para buscar pasos por su nombre.
        document.addEventListener("keyup", e => {
            if (e.target.matches("#inputBuscar")) {
                if (e.key === "Escape") e.target.value = "";
                document.querySelectorAll("div button").forEach(row => {
                    row.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                        ? row.style.display = ""  
                        : row.style.display = "none";  
                });
            }
        });
    }); 
});


