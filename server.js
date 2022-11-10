const express = require('express');
const {routerApi} = require('./routers/routerApi.js');

const servidor = express();

//middleware
servidor.use(express.json());
servidor.use(express.urlencoded({extended: true}));
servidor.use('/views',express.static('views'))

//rutas
servidor.use('/api/productos',routerApi);

const server = servidor.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));
