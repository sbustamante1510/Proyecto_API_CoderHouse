const { randomUUID} = require('crypto');

const productos = [];

const controladorGetProductos = (req, res) => {
    // let resultado;
    // if(req.query.min || req.query.max)
    //     resultado = productos.filter(e => e >())
    res.json(productos);
};


const controladorGetProductosId = (req,res) => {
    const buscarProducto = productos.find( e => e.id === req.params.id)

    if(!buscarProducto){
        res.status(404);
        res.json({error : "producto no encontrado"});
    }
    else{
        res.json(buscarProducto);
    }
}


const controladorPostProductos = (req,res) => {
    const productoNuevo = req.body;
    productoNuevo.id = randomUUID();
    productos.push(productoNuevo);
    res.status(201);
    res.json(productoNuevo);
}


const controladorPutProductosId = (req,res) => {
    const indiceProducto = productos.findIndex(e => e.id === req.params.id);

    if(indiceProducto === -1){
        res.status(404);
        res.json({error : "producto no encontrado"});
    }
    else{
        productos[indiceProducto] = req.body;
        res.json(req.body)
    }
}


const controladorDeleteProductosId = (req,res) => {
    const indiceProducto = productos.findIndex(e => e.id === req.params.id);

    if(indiceProducto === -1){
        res.status(404);
        res.json({error : "producto no encontrado"});
    }
    else{
        const borrado = productos.splice(indiceProducto,1)
        res.json(borrado[0])
    }
}

exports.controladorGetProductos = controladorGetProductos;
exports.controladorPostProductos = controladorPostProductos;
exports.controladorGetProductosId = controladorGetProductosId;
exports.controladorPutProductosId = controladorPutProductosId;
exports.controladorDeleteProductosId = controladorDeleteProductosId;