const express = require("express");
const http = require("node:http");
const conexion = require("./conexion.js");
const app = express();

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
/*
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'controlapertras'
})

conexion.connect(error => {
  if (error)
    console.log('Problemas de conexion con mysql')
})

const mime = {
    'html': 'text/html',
    'css': 'text/css',
    'jpg': 'image/jpg',
    'ico': 'image/x-icon',
    'mp3': 'audio/mpeg3',
    'mp4': 'video/mp4'
}

function encaminar(pedido, respuesta, camino){
    switch(camino){
        case 'cliente/listado': {
            listado(respuesta)
            break;
        }
        case 'cliente/consultaporusuario': {
            consulta(pedido, respuesta)
            break;
        }
        default: {
            fs.stat(camino, error => {
                if(!error) {
                    fs.readFile(camino, (error, contenido) => {
                        if(error) {
                            respuesta.writeHead(500, {'Content-Type': 'text/plain'})
                            respuesta.write('Error interno')
                            respuesta.end()
                        }else{
                            const vec = camino.split(',')
                            const extension = vec[vec.length - 1]
                            const mimearchivo = mime[extension]
                            respuesta.writeHead(200, {'Content-Type': mimearchivo})
                            console.log(error)
                            respuesta.write(contenido)
                            respuesta.end()
                        }
                    })
                }else{
                    respuesta.writeHead(404, { 'Content-Type': 'text/html' })
                    respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>')
                    respuesta.end()
                }
            })
        }
    }
}


function consulta(pedido, respuesta) {
    
    let info = ''
    pedido.on('data', datosparciales => {
        info += datosparciales
    })
    pedido.on('end', () => {
        const formulario = new URLSearchParams(info)
        const dato = [formulario.get('ingreso')]
        conexion.query("SELECT Nombre, Contraseña, T_usuario FROM usuarios WHERE Nombre, Contraseña, T_usuario=?", dato, (error, filas) => {
            if(error){
                console.log('error en la consulta', error)
                return
            }
            respuesta.writeHead(200, { 'Content-Type': 'text/html' })
            let datos = ''
            if(filas.length > 0){
                datos += 'Descripcion:' + filas[0].descripcion + '<br>'
                datos += 'Precio:' + filas[0].precio + '<hr>'
            }else{
                datos = 'No existe el usuario ingresado.'
            }
            respuesta.write('<!doctype html><html><head></head><body>')
            respuesta.write(datos)
            respuesta.write('<a href="-/index.html">Retornar</a>')
            respuesta.write('</body></html>')
            respuesta.end()
        } )
    })
}
*/

/*
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
**/

app.use("/login", function(pet, rest){
    const consultaSql = `SELECT Nombre, T_usuario, Contraseña FROM usuarios WHERE Nombre = ? AND Contraseña = ? LIMIT 1`;
    conexion.query(consultaSql, [pet.usuario, pet.contrasena], function(err, resultado){
        
        if(err){
            console.log(err)
            rest.status(500).json({error: "Hubo un error al realizar la consulta del login"});
        }
        console.log(resultado);

        // Verificamos que no este vacio el resultado.
        if(resultado.lenght > 0){
            // Desestructuración de los datos
            const [{Nombre, T_usuario, Contraseña}] = resultado;

            // Ahora puedes usar las variables Nombre, T_usuario y Contraseña directamente
            console.log(`Nombre: ${Nombre}, Tipo de Usuario: ${T_usuario}, Contraseña: ${Contraseña}`);

        }else{
            console.log("No se encontro un resultado");
        }

        return rest.json({resultado : resultado});
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


/*
const servidor = http.createServer((pedido, respuesta) => {
    const url = new URL('http://localhost:8888' + pedido.url)
    let camino = 'cliente' + url.pathname
    if (camino == 'cliente/')
      camino = 'cliente/login.html'
    encaminar(pedido, respuesta, camino)
    console.log("Estoy bien")
  })

  servidor.listen(8888)
*/
