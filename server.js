const express = require("express");
const http = require("node:http");
const conexion = require("./conexion.js");
const app = express();
app.use(express.json());
app.use(express.static("./cliente"));
/** 
 * requerimos a express y creamos un servodor con http
 * creamos una constante para la aplicacion de express donde express es un servidor web http.
 * creamos una funcion de peticion(pet) y respuesta(rest).
 * 
 
 app.use("/", function(pet, rest){
     return rest.json({resultado : "exito"});
 });
*/

/**
 * app es una aplicacion de express, use es una funcion de la aplicacion(app).
 * esta funcion le dice a la aplicacion de express que use o cree una nueva ruta que seria la cadena en el primer parametro, en este caso "/usuarios", cuando llegue una peticion http a la ruta usuarios va a correr la funcion en el segundo parametro de la funcion use.
*/


app.use("/usuarios", function(pet, rest){
    
    conexion.query("SELECT * FROM usuarios", function(err, resultado){
        
        if(err){
            console.log(err);
            rest.status(500).json({error: "Hubo un error al realizar la consulta"});
            return;
        }

        return rest.json({resultado : resultado}); 
    }); 
});


app.use("/login", function(pet, rest){
    const {usuario, contrasena} = pet.query
    const consultaSql = `SELECT Nombre, T_usuario, Contrasena FROM usuarios WHERE Nombre = ? AND  Contrasena = ? `;
    console.log(usuario, contrasena); 
    conexion.query(consultaSql, [usuario, contrasena], function(err, resultado){
        if(err){
            console.log(err)
            rest.status(500).json({error: "Hubo un error al realizar la consulta del login"});
        }
        // Verificamos que no este vacio el resultado.
        if(resultado.length > 0){
            // Desestructuración de los datos
            const [{Nombre, T_usuario, Contrasena}] = resultado;
            // Ahora puedes usar las variables Nombre, T_usuario y Contraseña directamente
            console.log(`Nombre: ${Nombre}, Tipo de Usuario: ${T_usuario}, Contraseña: ${Contrasena}`);
        }else{
            console.log("No se encontro un resultado");
        }
       // rest.json({resultado : resultado});
       rest.json({resultado});
    });
});


/**
 * creamos un servidor http de node.js para acelerar el funcionanmiento.
 * le decimos el puerto en donde estara
 * creamos una function que nos muestre en consola si saliio bien
*/
let servidor = http.createServer(app);
servidor.listen(3000, function(){
    console.log("Te estoy escuchando");
});


