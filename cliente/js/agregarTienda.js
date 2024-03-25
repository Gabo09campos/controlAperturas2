const numeroTienda = document.getElementById("numeroTienda");
const nombreTienda = document.getElementById("nombreTienda");
const fPruebas = document.getElementById("fechaPruebas");
const fApertura = document.getElementById("fechaApertura");

const parrafo = document.getElementById("warnings");
const botonAceptar = document.getElementById("btnAceptar");
const botonCancelar = document.getElementById("btnCancelar");

let mensaje = "";
/**
     * A travez del form estaremos escuchando todo lo que sucede en el login con el "addEventListener".
     * Con el "preventDefault" evitamos que se envie el formulario al dar clic al boton sin antes obtener lo datos.
     * Creamos una variable "warnings" para mandar el mensaje de input no valido.
     * Agregamos un booleano para saber si se mostrara el mensaje de warning o no.
     * Finalmente redirigimos hacia una nueva pantalla despues de dar clic al boton y haber validado que todo este correcto esto con "href".
     * Y utilizamos una funcion "reset" para limpiar el formulario despues de ingresar.
 
//form.addEventListener("submit", e =>{ 
    e.preventDefault();
    let warnings = "";
    let entrar = true;
    /**
     * Importamos en el front a "axios" que es una libreria para hacer peticiones http
     * Con un objeto enviamos a travez de la ruta los valores de la nueva tienda para agregarla a la lista.
     
    if(numeroTienda.value.length < 3 || nombreTienda.value.length < 10 || fPruebas.value.length < 8 || fApertura.value.length < 8 ){
        warnings += 'Todos los campos deben ser llenados correctamente <br>'
        entrar = true;
        parrafo.innerHTML = warnings;
    }else{
        axios.post("agregarTienda", {
            N_tienda: numeroTienda.value,
            Nom_tienda: nombreTienda.value,
            Fecha_prueba: fPruebas.value,
            Fecha_apertura: fApertura.value
        })
        .then(function (response) {
            console.log(response.data);
        })
        .then((error) => console.log(error));
    }
    form.reset();
    location.href = './index.html';
}); */

document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById('formAgregarTienda');
    
    if(form){
        form.addEventListener("submit", e =>{ 
            e.preventDefault();
            let warnings = "";
            let entrar = true;

            if(numeroTienda.value.length < 3 || nombreTienda.value.length < 10 || fPruebas.value.length < 8 || fApertura.value.length < 8 ){
                warnings += 'Todos los campos deben ser llenados correctamente <br>'
                entrar = true;
                parrafo.innerHTML = warnings;
                console.log(numeroTienda.value, nombreTienda.value, fPruebas.value, fApertura.value);
            }else{
                axios.post("agregarTienda", {
                    N_tienda: numeroTienda.value,
                    Nom_tienda: nombreTienda.value,
                    Fecha_prueba: fPruebas.value,
                    Fecha_apertura: fApertura.value
                })
                .then(function (response) {
                    console.log(response.data);
                })
                .then((error) => console.log(error));
            }
            form.reset();
            location.href = './index.html';
        });
    } else {
        console.log("El elemento 'form' no existe en el DOM");
    }
});
