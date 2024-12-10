const express = require('express');
const morgan = require('morgan');//ver las peticiones
const app = express();//servidor
const path = require('path');//Traba con directorios identificando el SO


//Configuracion Servidor
app.set('port',process.env.PORT || 3000)//asignar puerto, si lo da el So que lo tome, sino el 3000
app.set('views',path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);//usara el motor ejs para archivos html
app.set('view engine', 'ejs');//motor de plantillas, permite ejecutar javascript y traducirlo a html

//middlewares //Funciones que se ejecutan antes que lleguen a las rutas
app.use(express.json());//Acceder a la informacion de jason
app.use(morgan('dev'));//muestra los mensajes en consola de las cargas y peticiones.


//routes o urls
app.use(require('./routes/routes.js'));//usar las rutas 
app.set('trust proxy', true);


//file statics
app.use(express.static(path.join(__dirname, 'public')));//para archivos como imagenes,css,javascript


//Escuchando el servidor
app.listen(app.get('port'),() => {
  /*   console.log('servidor escuchando en puerto: ',app.get('port'));
    console.log('ip: ' +Object.values(OS.networkInterfaces())[0][0].address);
    console.log('Maquina: ' +OS.hostname()); */
});

