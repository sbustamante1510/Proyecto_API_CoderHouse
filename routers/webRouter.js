const express = require('express');

const productosHandlebars = []

const webRouter = express.Router();

webRouter.get('/formulario',(req,res) => {
    res.render('productos', { productosHandlebars })
})

webRouter.post('/productos',(req,res) => {
    productosHandlebars.push(req.body);
    console.log(productosHandlebars);
    res.redirect('/')
})

webRouter.get('/productos',(req,res) => {
    res.render('historial', { productosHandlebars , nroProductos : productosHandlebars.length > 0 })
})

exports.webRouter = webRouter;