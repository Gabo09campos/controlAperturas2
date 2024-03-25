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

//Este es de prueba
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

// Back-end de login
app.use("/login", function(pet, rest){
    //Conectamos con el front para recibir los valores del formulario.
    const {usuario, contrasena} = pet.query
    //Realizamos la consulta a la base de datos para comprobar que el usuario ingresado existe.
    const consultaSql = `SELECT Nombre, T_usuario, Contrasena FROM usuarios WHERE Nombre = ? AND  Contrasena = ? `;
    conexion.query(consultaSql, [usuario, contrasena], function(err, resultado){
        if(err){
            console.log(err)
            rest.status(500).json({error: "Hubo un error al realizar la consulta del login"});
        }
        // Verificamos que no este vacio el resultado.
        if(resultado && resultado.length > 0){
            // Desestructuración de los datos
            // Ahora puedes usar las variables Nombre, T_usuario y Contraseña directamente
            const [{Nombre, T_usuario, Contrasena}] = resultado;
        }else{
            console.log("No se encontro un resultado");
        }
       // Con un json enviamos los datos hacia el cliente.
       rest.json({resultado});
    });
});


//Back-end index/lista de tiendas por aperturar.
app.get("/tiendas", function(pet, rest){
    //Hacemos la consulta a la base de datos de las tiendas existentes.
    //Utilizamos "DATE_FORMAT(Fecha_prueba, '%Y.%m.%d')" para que solo muestre la fecha del lado del cliente.
    conexion.query("SELECT id, N_tienda, Nom_tienda, DATE_FORMAT(Fecha_prueba, '%Y.%m.%d') as Fecha_prueba, DATE_FORMAT(Fecha_apertura, '%Y.%m.%d') as Fecha_apertura FROM tiendas", function(err, resultado){
        if(err){
            console.log(err)
            rest.status(500).send("Error en la query");
        }else{
            //Obetenemos los resultados y los enviamos con un json hacia el cliente.
            rest.status(200).send(resultado);
            return rest.json();
            conexion.end(); 
        }
    }); 
});

//Back-end para eliminar una tienda de la lista de aperturas.
app.delete("/borrarTienda/:id", function(req, res){
    // Aquí borramos la tienda de la base de datos.
    // Utilizamos req.params.id para obtener el ID de la tienda a borrar.
    conexion.query("DELETE FROM tiendas WHERE id = ?", [req.params.id], function(err, resultado){
        if(err){
            console.log(err)
            res.status(500).send("Error en la query");
        }else{
            // Se envía una respuesta al cliente para indicar que la tienda fue borrada exitosamente.
            res.status(200).send({message: 'Tienda eliminada exitosamente'});
            conexion.end(); 
        }
    }); 
});

//Back-end para editar una tienda de la lista de aperturas.
app.put("/editarTienda/:id", function(req, res){
    // Aquí es donde actualizamos los datos de la tienda en la base de datos.
    // Utilizaríamos req.params.id para obtener el ID de la tienda a actualizar.
    // Utilizaríamos req.body para obtener los nuevos datos de la tienda.
    conexion.query("UPDATE tiendas SET Nom_tienda = ?, Fecha_prueba = ?, Fecha_apertura = ? WHERE id = ?", [req.body.Nom_tienda, req.body.Fecha_prueba, req.body.Fecha_apertura, req.params.id], function(err, resultado){
        if(err){
            console.log(err)
            res.status(500).send("Error en la query");
        }else{
            // Envía una respuesta al cliente para indicar que la tienda fue actualizada exitosamente.
            res.status(200).send({message: 'Tienda actualizada exitosamente'});
            conexion.end(); 
        }
    }); 
});

// Back-end Agregar tiendas
app.use("/agregarTienda", function(pet, rest){
    //Conectamos con el front para recibir los valores del formulario.
    const {N_tienda, Nom_tienda, Fecha_prueba, Fecha_apertura} = pet.body
    // Insertamos los datos del formulario a la base de datos.
    const consultaSql = `INSERT INTO tiendas (N_tienda, Nom_tienda, Fecha_prueba, Fecha_apertura) VALUES (?, ?, ?, ?) `;
    conexion.query(consultaSql, [N_tienda, Nom_tienda, Fecha_prueba, Fecha_apertura], function(err, resultado){
        if(err){
            console.log(err)
            rest.status(500).json({error: "Hubo un error al realizar la consulta de LA BASE DE DATOS"});
        }else{
            console.log("Datos insertados correctamente");
        }
    });
});

/**
 * creamos un servidor http de node.js para acelerar el funcionanmiento.
 * le decimos el puerto en donde estara
 * creamos una function que nos muestre en consola si saliio bien
*/
let servidor = http.createServer(app);
servidor.listen(3004, function(){
    console.log("Te estoy escuchando");
});


