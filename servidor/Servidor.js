import express, { Router } from 'express'

const router = Router()

router.get('/', (req, res, next) => {
    res.send(`[pid: ${process.pid}] peticion recibida!`)
})

export default class Servidor {
    #app
    #server
    constructor() {
        this.#app = express()
        this.#app.use('/api', router)
    }

    async conectar({ puerto = 0 }) {
        return new Promise((resolve, reject) => {
            this.#server = this.#app.listen(puerto, () => {
                resolve({ puerto })
            })
            this.#server.on('error', error => {
                reject(error)
            })
        })
    }

    async desconectar() {
        return new Promise((resolve, reject) => {
            this.#server.close(error => {
                if (error) {
                    reject(error)
                } else {
                    resolve(true)
                }
            })

        })
    }
}