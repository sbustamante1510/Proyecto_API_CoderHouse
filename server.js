const express = require('express');
const {webRouter} = require('./routers/webRouter.js');
const {routerApi} = require('./routers/routerApi.js');
const {engine} = require('express-handlebars');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')


const servidor = express();
const httpServer = new HttpServer(servidor)
const io = new IOServer(httpServer)


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
io.on('connection',socket => {
    // socket.emit("mensajesActualizados", mensajes)

    // socket.on('nuevoMensaje', mensaje => {

    // })

    console.log('Usuario conectado');
    
    socket.emit('mensajesActualizados', productosListado);
    socket.emit('mensajesActualizadosChat', mensajesChat);


    
    socket.on('nuevoMensaje',data => {
        productosListado.push(data)
        io.sockets.emit('mensajesActualizados', productosListado);
    })
    
    socket.on('nuevoMensajeChat',data => {
        data.fecha = new Date().toLocaleString()
        mensajesChat.push(data)
        io.sockets.emit('mensajesActualizadosChat', mensajesChat);
    })
    
})



//rutas
servidor.use(webRouter);
servidor.use('/api/productos',routerApi);

const server = httpServer.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));
