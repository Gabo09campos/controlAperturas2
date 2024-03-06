const numeroTienda = document.getElementById("numeroTienda");
const nombreTienda = document.getElementById("nombreTienda");
const fPruebas = document.getElementById("fechaPruebas");
const fApertura = document.getElementById("fechaApertura");
const trTienda = document.getElementById("trTienda");

let mensaje = "";

function agregarTienda(){

    numeroTienda
    nombreTienda
    fPruebas
    fApertura
    

    let mensaje = numeroTienda.value + ' ' + nombreTienda.value + ' ' + fPruebas.value + ' ' + fApertura.value;
    numeroTienda.insertAdjacentHTML("afterend", mensaje);
    nombreTienda.insertAdjacentHTML("afterend", mensaje);
    fPruebas.insertAdjacentHTML("afterend", mensaje);
    fApertura.insertAdjacentHTML("afterend", mensaje);
}
