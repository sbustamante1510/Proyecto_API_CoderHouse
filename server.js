const express = require('express');
const {webRouter} = require('./routers/webRouter.js');
const {routerApi} = require('./routers/routerApi.js');
const {engine} = require('express-handlebars');

const servidor = express();

//middleware
servidor.use(express.json());
servidor.use(express.urlencoded({extended: true}));
servidor.use('/formulario',express.static('public'))

//servidor.use(express.static('public'));
servidor.engine('handlebars',engine());
servidor.set('view engine','handlebars');

// servidor.get('/',(req,res) => {
//     res.render('productos', { productos })
// })


//rutas
servidor.use(webRouter);
servidor.use('/api/productos',routerApi);

const server = servidor.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));
