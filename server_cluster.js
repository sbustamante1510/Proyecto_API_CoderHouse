import { MODO, PORT } from './config.js';
import cluster from 'cluster'
import { cpus } from 'os'
import { crearServidor } from './servidor/index.js';

if (MODO === 'cluster') {

    const cantCpus = cpus().length

    if (cluster.isPrimary) {
        console.log('modo de ejecucion: CLUSTER')
        console.log(`proceso primario: pid ${process.pid}`)

        for (let i = 0; i < cantCpus; i++) {
            cluster.fork()
        }

        cluster.on('exit', (worker) => {
            // console.log(`adios mundo cruel (pid: ${worker.process.pid})`)
            cluster.fork()
        })
    } else {
        console.log(`proceso secundario: pid ${process.pid}`)
        const servidor = crearServidor()
        await servidor.conectar({ puerto: PORT })
    }
} 