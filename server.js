//const {contenedordeProductos} = require('./contenedorProductos.js');
//const {contenedordeMensajes} = require('./contenedorMensajes.js');
import express from 'express';
// const {webRouter} = require('./routers/webRouter.js');
// const {routerApi} = require('./routers/routerApi.js');
import {routerApiTest}  from './routers/routerApiTest.js';
import {routerApiSession} from './routers/routerApiSession.js';
import {engine} from 'express-handlebars';
// import { Server: HttpServer } from 'http';
// import { Server: IOServer } from 'socket.io';


const servidor = express();
// const httpServer = new HttpServer(servidor)
// const io = new IOServer(httpServer)


//middleware
servidor.use(express.json());
servidor.use(express.urlencoded({extended: true}));
servidor.use('/',express.static('public'))

//servidor.use(express.static('public'));
servidor.engine('handlebars',engine());
servidor.set('view engine','handlebars');

// servidor.get('/',(req,res) => {
//     res.render('productos', { productos })
// })

const productosListado = [];
const mensajesChat = []

//sockets
// io.on('connection',socket => {
//     // socket.emit("mensajesActualizados", mensajes)

//     // socket.on('nuevoMensaje', mensaje => {

//     // })

//     console.log('Usuario conectado');
    
//     socket.emit('mensajesActualizados', productosListado);
//     socket.emit('mensajesActualizadosChat', mensajesChat);


    
//     socket.on('nuevoMensaje',async data => {
//         productosListado.push(data);
//         io.sockets.emit('mensajesActualizados', productosListado);
//         await contenedordeProductos.guardar(data);
//     })
    
//     socket.on('nuevoMensajeChat',async data => {
//         data.fecha = new Date().toLocaleString()
//         mensajesChat.push(data)
//         io.sockets.emit('mensajesActualizadosChat', mensajesChat);
//         await contenedordeMensajes.guardar(data);
//     })
    
// })



//rutas
// servidor.use(webRouter);
// servidor.use('/api/productos',routerApi);
servidor.use('/api/productos-test',routerApiTest);
servidor.use('/api/session',routerApiSession);

//Sockets necesario
// const server = httpServer.listen(8080, () => {
//     console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
// });

const server = servidor.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));
