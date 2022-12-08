const createKnexClient = require('knex');
const {mysqlConfig} = require('./sqlConfig.js');

const clienteSql = createKnexClient(mysqlConfig);

class ContenedorMensajes {
    constructor(clienteMysql,tabla){
        this.cliente = clienteMysql;
        this.tabla = tabla;
    }

    async guardar(cosa){
        await this.cliente(this.tabla).insert(cosa);
    }

}

const contenedordeMensajes = new ContenedorMensajes(clienteSql,'mensajes');
exports.contenedordeMensajes = contenedordeMensajes;