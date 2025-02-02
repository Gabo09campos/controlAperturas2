const express = require("express");
const http = require("node:http");
const conexion = require("./conexion.js");
const funciones = require('./funciones/funciones.js'); // Importamos las funciones para encriptar las contraseñas.
const jwt = require('jsonwebtoken');
const app = express();
const { log } = require("node:console");
const os = require("os");
const userInfo = os.userInfo;
const nodemailer = require('nodemailer'); // Para poder enviar correos.

app.use(express.json());
app.use(express.static("./cliente"));
/** 
 * requerimos a express y creamos un servidor con http.
 * creamos una constante para la aplicacion de express donde express es un servidor web http.
 * creamos una funcion de peticion(pet) y respuesta(rest).
 * app es una aplicacion de express, use es una funcion de la aplicacion(app).
 * esta funcion le dice a la aplicacion de express que use o cree una nueva ruta que seria la cadena en el primer parametro, en este caso "/usuarios", cuando llegue una peticion http a la ruta usuarios va a correr la funcion en el segundo parametro de la funcion use.
*/

//Back-end de usuarios.
app.use("/usuarios",  function(pet, rest){
    conexion.query("SELECT id, Nombre, Apellidos, Correo_electrónico, N_empleados, T_usuario, Departamento, Permiso FROM usuarios", function(err, resultado){
        if(err){
            console.log(err);
            rest.status(500).json({error: "Hubo un error al realizar la consulta"});
            return;
        }
        // Con este for convertimos los boleanos de los permisos en string para un mejor entendiminetopara el usuario.
        for( i=0; i<resultado.length ; i++){
            resultado[i].Permiso = funciones.convertirBoleean(resultado[i].Permiso);
        }
        return rest.json(resultado);
    }); 
});

// Back-end de login.
app.post("/login", (req, res) => {
    // Obtenemos del front los valores del cuerpo.
    let { usuario, contrasena } = req.body;
    // Realizamos la consulta a la base de datos para comprobar que el usuario ingresado existe.
    const consultaSql = `SELECT Nombre, T_usuario, Contrasena, Departamento, Permiso FROM usuarios WHERE Nombre = ?`;
    conexion.query(consultaSql, [usuario], (err, resultado) => {  
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Hubo un error al realizar la consulta del login" });
        }
        // Verificamos que no esté vacío el resultado.
        if (resultado && resultado.length > 0) {
            // Desestructuración de los datos.
            const [{ Nombre, T_usuario, Contrasena }] = resultado;
            const contralog = funciones.cifrarTexto(contrasena);
            console.log(contralog);
            // Comparamos la contraseña ingresada con la desencriptada
            if (contralog === resultado[0].Contrasena) {
                // Creamos un token JWT para el usuario.
                let token = jwt.sign({
                    usuario: usuario
                }, 'este-es-el-seed', { expiresIn: '120m' });

                // Enviamos la respuesta, el usuario y el token.
                res.json({
                    ok: true,
                    usuario: usuario,
                    token,
                    resultado
                });
            } else {
                console.log("Contraseña incorrecta");
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o contraseña incorrectos'
                    }
                });
            }
        } else {
            console.log("No se encontró un resultado");
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }
    });
});

//Back-end index/lista de tiendas por aperturar.
app.get("/tiendas", function(pet, rest){
    //Hacemos la consulta a la base de datos de las tiendas existentes.
    //Utilizamos "DATE_FORMAT(Fecha_prueba, '%Y.%m.%d')" para que solo muestre la fecha del lado del cliente.
    conexion.query("SELECT id, N_tienda, Nom_tienda, DATE_FORMAT(Fecha_prueba, '%Y-%m-%d') as Fecha_prueba, DATE_FORMAT(Fecha_apertura, '%Y-%m-%d') as Fecha_apertura, Pasos_finalizados FROM tiendas", function(err, resultado){
        if(rest){
            //Obetenemos los resultados y los enviamos con un json hacia el cliente.
            rest.status(200).send(resultado);
        }else{
            console.log(err)
            rest.status(500).send("Error en la query");
        }
    }); 
});

//Back-end pasos de las tiendas por aperturar.
app.get("/pasos", function(pet, rest){
    //Hacemos la consulta a la base de datos de las tiendas existentes.
    conexion.query("SELECT * FROM pasosconsecutivos", function(err, resultado){
        if(rest){
            //Obetenemos los resultados y los enviamos con un json hacia el cliente.
            rest.status(200).send(resultado);
        }else{
            console.log(err)
            rest.status(500).send("Error en la query");
        }
    }); 
});

//Back-end de departamentos.
app.get("/departamentos", function(pet, rest){
    conexion.query("SELECT * FROM departamentos", function(err, resultado){
        if(err){
            console.log(err);
            rest.status(500).json({error: "Hubo un error al realizar la consulta"});
            return;
        }
        return rest.json(resultado);
    }); 
});

//Back-end para editar una tienda de la lista de aperturas.
app.put("/editarTienda/:id", function(req, res){
    // Aquí es donde actualizamos los datos de la tienda en la base de datos.
    // Utilizaríamos req.params.id para obtener el ID de la tienda a actualizar.
    // Utilizaríamos req.body para obtener los nuevos datos de la tienda.
    conexion.query("UPDATE tiendas SET N_tienda = ?, Nom_tienda = ?, Fecha_prueba = ?, Fecha_apertura = ? WHERE id = ?", [req.body.N_tienda,  req.body.Nom_tienda, req.body.Fecha_prueba, req.body.Fecha_apertura, req.params.id], function(err, resultado){
        if(res){
            // Envía una respuesta al cliente para indicar que la tienda fue actualizada exitosamente.
            res.status(200).send({message: 'Tienda actualizada exitosamente'});
            //conexion.end();
        }else{
            console.log(err)
            res.status(500).send("Error en la query");
        }
    }); 
});

//Back-end para editar pasos de las tiendas control aperturas.
app.put("/editarPaso/:id", function(req, res){
    conexion.query("UPDATE pasosconsecutivos SET Num_paso = ?, Nom_apertura = ?, Departamento_responsble = ?, Usuario = ? WHERE Id_agregar = ?", [req.body.Num_paso,  req.body.Nom_apertura, req.body.Departamento_responsble, req.body.Usuario, req.params.id], function(err, resultado){
        if(res){
            res.status(200).send({message: 'Paso actualizado exitosamente'});
            //conexion.end();
        }else{
            console.log(err)
            res.status(500).send("Error en la query");
        }
    }); 
});

//Back-end para actualizar un numero de paso.
app.put("/actualizarPaso/:Id_agregar", function(req, res){
    // Aquí es donde actualizamos los datos de la tienda en la base de datos.
    // Utilizaríamos req.params.Id_agregar para obtener el ID del paso a actualizar.
    // Utilizaríamos req.body.Num_paso para obtener los nuevos datos del paso.
    conexion.query("UPDATE pasosconsecutivos SET Num_paso = ? WHERE Id_agregar = ?", [req.body.Num_paso,  req.params.Id_agregar], function(err, resultado){
        if(res){
            // Envía una respuesta al cliente para indicar que la tienda fue actualizada exitosamente.
            res.status(200).send({message: 'Numero de paso actualizado exitosamente'});
            //conexion.end();
        }else{
            console.log(err)
            res.status(500).send("Error en la query");
        }
    }); 
});

//Back-end para eliminar un usuario de la lista de aperturas.
app.post("/borrarUsuario/:id", function(req, res){
    // Aquí borramos la tienda de la base de datos.
    // Utilizamos req.params.id para obtener el ID de la tienda a borrar.
    conexion.query("DELETE FROM usuarios WHERE id = ?", [req.params.id], function(err, resultado){
        if(res){
            // Se envía una respuesta al cliente para indicar que la tienda fue borrada exitosamente.
            res.status(200).send({message: 'Usuario eliminada exitosamente'});
        }else{
            console.log(err)
            res.status(500).send("Error en la query");
        }
    }); 
});

//Back-end para editar un usuario de la lista de aperturas.
app.put("/editarUsuario/:id", function(req, res){
    // Aquí es donde actualizamos los datos del usuario en la base de datos.
    // Utilizaríamos req.params.id para obtener el ID del usuario a actualizar.
    // Utilizaríamos req.body para obtener los nuevos datos del usuario.
    // Encriptamos la contraseña para enviarla a la base de datos.
    const {Nombre, Apellidos, Correo_electrónico, N_empleados, T_usuario, Departamento, Contrasena, Permiso} = req.body
    const contrasena1 = funciones.cifrarTexto(Contrasena);
    conexion.query("UPDATE usuarios SET Nombre = ?, Apellidos = ?, Correo_electrónico = ?, N_empleados = ?, T_usuario = ?, Departamento = ?, Contrasena = ?, Permiso = ? WHERE id = ?", [Nombre,  Apellidos, Correo_electrónico,N_empleados, T_usuario, Departamento, contrasena1, Permiso, req.params.id], function(err, resultado){
        if(res){
            // Envía una respuesta al cliente para indicar que el usuario fue actualizado exitosamente.
            res.status(200).send({message: 'Usuario actualizado exitosamente'});
        }else{
            console.log(err)
            res.status(500).send("Error en la query");
        }
    }); 
});

// Back-end Agregar nuevas tiendas.
app.use("/agregarTienda", function(pet, rest){
    //Conectamos con el front para recibir los valores del formulario.
    const {N_tienda, Nom_tienda, Fecha_prueba, Fecha_apertura, Pasos_finalizados} = pet.body
    // Insertamos los datos del formulario a la base de datos.
    const consultaSql = `INSERT INTO tiendas (N_tienda, Nom_tienda, Fecha_prueba, Fecha_apertura, Pasos_finalizados) VALUES (?, ?, ?, ?, ?) `;
    // Convertimos el arreglo en string con JSON.stringify para oder guardarlo en la base de datos.
    conexion.query(consultaSql, [N_tienda, Nom_tienda, Fecha_prueba, Fecha_apertura,  JSON.stringify(Pasos_finalizados)], function(err, resultado){
        if(err){
            console.log(err)
            rest.status(500).json({error: "Hubo un error al realizar la consulta de LA BASE DE DATOS"});
        }else{
            console.log("Datos insertados correctamente");
            rest.status(200).send({message: 'Tienda agregada exitosamente'});
        }
    });
});

// Back-end Agregar los pasos finalizados.
app.post("/agregarPasoFinzalizado", function(pet, rest){
    // Conectamos con el front para recibir los valores del formulario.
    const {id, Id_agregar, estado} = pet.body;
    // Convertimos el estado a un string para poder almacenarlo en la base de datos.
    const estadoString = JSON.stringify(estado);
    // Actualizamos los datos del formulario a la base de datos.
    const consultaSql = `UPDATE tiendas SET Pasos_finalizados = ? WHERE id = ?`;
    conexion.query(consultaSql, [estadoString, id], function(err, resultado){
        if(err){
            console.log(err);
            rest.status(500).json({error: "Hubo un error al realizar la consulta de LA BASE DE DATOS" + err.message});
        } else {
            console.log("Datos actualizados correctamente");
            rest.status(200).send({message: 'Paso finalizado agregado exitosamente'});
        }
    });
});

//Back-end para agregar pasos a seguir para la apertura.
app.use("/agregarPaso", function(pet, rest){
    //Conectamos con el front para recibir los valores del formulario.
    const {Nom_apertura, Departamento_responsble, Usuario, Num_paso} = pet.body
    // Insertamos los datos del formulario a la base de datos.
    const consultaSql = `INSERT INTO pasosconsecutivos (Nom_apertura, Departamento_responsble, Usuario, Num_paso) VALUES (?, ?, ?, ?) `;
    conexion.query(consultaSql, [Nom_apertura, Departamento_responsble, Usuario, Num_paso], function(err, resultado){
        if(err){
            console.log(err)
            rest.status(500).json({error: "Hubo un error al realizar la consulta de la base de datos"});
        }else{
            console.log("Datos insertados correctamente");
            rest.status(200).send({message: 'Paso agregado exitosamente'});
        }
    });
});

//Back-end para agregar nuevos usuarios.
app.use("/agregarUsuario", function(pet, rest){
    //Conectamos con el front para recibir los valores del formulario.
    const {Nombre, Apellidos, Correo_electrónico, N_empleados, T_usuario, Departamento, Contrasena, Permiso} = pet.body
    // Encriptamos la contraseña para enviarla a la base de datos.
    const contrasena1 = funciones.cifrarTexto(Contrasena);
    // Insertamos los datos del formulario a la base de datos.
    const consultaSql = `INSERT INTO usuarios (Nombre, Apellidos, Correo_electrónico, N_empleados, T_usuario, Departamento, Contrasena, Permiso) VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;
    conexion.query(consultaSql, [Nombre, Apellidos, Correo_electrónico, N_empleados, T_usuario, Departamento, contrasena1, Permiso], function(err, resultado){
        if(err){
            console.log(err)
            rest.status(500).json({error: "Hubo un error al realizar la consulta de la base de datos"});
        }else{
            console.log("Datos insertados correctamente");
            rest.status(200).send({message: 'Usuario agregado exitosamente'});
        }
    });
});

//Back-end de enviar correo.
app.use("/enviarCorreo", async function(req, res){
    // Extraemos los datos que recibimos desde el front.
    const {name, email} = req.body;
    // Ponemos los datos para poder enviar el correo.
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Dirección IP del servidor de correo.
        port: 465, // Puerto por defecto para SMTP.
        secure: true, // Desactivamos la seguridad. 
        auth: {
            user: 'aplicacionespos', // Usuario del servidor de correo
            user: 'gc786041@gmail.com', // Usuario del servidor de correo
            pass: 'mlct nhnq effw axmm' // Contraseña del usuario
          },
    });
    transporter.verify().then(() => {
        console.log('Ready for send email');
        try{
             transporter.sendMail({
                from: '"Aplicaciones POS" <aplicacionespos@chedraui.com.mx>',
                to: email, // Usamos el correo que recibimos.
                subject: `Correo de prueba para ${name}`, // Usamos el nombre que recibimos.
                html: `
                <b>El departamento del paso anterior ya ha finalizado su parte del trabajo.</b>
                `
            });
            res.status(200).json({ message: 'Correo enviado exitosamente' }); // Respuesta de exito.
        } catch(error){
            emailStatus = error;
            return res.status(400).json({ message: 'Algo ha salido mal', error});
        }
    });
});

// Usa el puerto proporcionado por Heroku o 3000 si se ejecuta localmente.
const port = process.env.PORT || 3000;
// Creamos el servidor.
const server = http.createServer(app);
// Escuchamos el puerto y nos dice cual es.
server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

