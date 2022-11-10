const express = require('express');
const { controladorGetProductos , controladorPostProductos,
    controladorGetProductosId,controladorPutProductosId,
    controladorDeleteProductosId

    } = require("../controllers/controladorGetProductos");

const routerApi = express.Router();

routerApi.get('/',controladorGetProductos);
routerApi.get('/:id',controladorGetProductosId);
routerApi.post('/',controladorPostProductos);
routerApi.put('/:id',controladorPutProductosId);
routerApi.delete('/:id',controladorDeleteProductosId);



exports.routerApi = routerApi;