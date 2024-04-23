// Llamamos a la vista de tinedas de usuarios con su id.
const tiendas = document.getElementById("tiendasUsuarios");
//Usamos el mismo Back que con el administrador, solo que quitamos funciones de los administradores.
fetch("http://localhost:3004/tiendas")
.then(rest => rest.json())
.then(rest => {
    rest.forEach(tienda => {
        let row = document.createElement('tr');

        let N_tienda = document.createElement('td');
        N_tienda.innerHTML = tienda.N_tienda;
        row.appendChild(N_tienda);

        let Nom_tienda = document.createElement('td');
        Nom_tienda.innerHTML = `<button id="enlacePasos">${tienda.Nom_tienda}</button>`
        row.appendChild(Nom_tienda);

        let Fecha_prueba = document.createElement('td');
        Fecha_prueba.innerHTML = tienda.Fecha_prueba;
        row.appendChild(Fecha_prueba);

        let Fecha_apertura = document.createElement('td');
        Fecha_apertura.innerHTML = tienda.Fecha_apertura;
        row.appendChild(Fecha_apertura);

        tiendas.appendChild(row);

        Nom_tienda.addEventListener('click', function() {
            // Traemos el id de la tienda y el objeto de los pasos de este id.
            let idTienda = tienda.id;
            console.log(idTienda);
            let pasoDeTienda = tienda.Pasos_finalizados; // Este es el objeto de pasos.
            // Guardamos el objeto en localStorage convertido en String.
            localStorage.setItem('PTAU', pasoDeTienda); // Paso de Tienda Actual a Usar (PTAU).
            console.log('pasos finalizados', pasoDeTienda);
            location.href = 'pasosUsuarios.html';
            localStorage.setItem('TAU', tienda.id); // Tienda Actual a Usar (TAU).
        });
    });
    
});