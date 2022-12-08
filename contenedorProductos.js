const createKnexClient = require('knex');
const {mysqlConfig} = require('./sqlConfig.js');

const clienteSql = createKnexClient(mysqlConfig);

class ContenedorProductos {
    constructor(clienteMysql,tabla){
        this.cliente = clienteMysql;
        this.tabla = tabla;
    }

    async guardar(cosa){
        await this.cliente(this.tabla).insert(cosa);
    }

}

const contenedordeProductos = new ContenedorProductos(clienteSql,'productos');
exports.contenedordeProductos = contenedordeProductos;