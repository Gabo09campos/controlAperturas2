/* Creamos una variable para llamar a la libreria y los metodos necesarios */
let baseDatos = require("mysql");

/* Creamos otra variable para crear la conexion con la base de datos.
    Utilizando la variable anterior llamamos el metodo de crear la coneccion. 
    Dentro del metodo creamos el objeto de la coneccion con las propiedades ya definidas,
    (host=nombre de base de datos, database=nombre de la base de datos, user=nombre de usuario, password).
*/
let conexion = baseDatos.createConnection({
    host: "localhost",
    database: "controlapertras",
    user: "root",
    password: ""
});

/**
 * exportamos la conexion para que pueda ser requerida en otras hojas.
 */
module.exports = conexion; 

/* Se realiza una comproblacion para saber si la conexion es correcta.
/**
 * dentro del metodo utilizamos una funcion para comprobar si existe o no error para la conexion a la base de datos.
 * Con un condicional comprobamos si existe un error, que nos arroje los resultados de el error, si no un mensaje positivo.
 
conexion.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log("conexion exitosa");
    }
}); */

/**
 * para finalizar la ejecucion de la comprobacion hacemos lo siguiente:
 
conexion.end(); */