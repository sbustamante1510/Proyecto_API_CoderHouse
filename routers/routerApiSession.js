import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

const routerApiSession = express.Router();

const mongoURL = 'mongodb://localhost/sessiones'

routerApiSession.use(session({

    store: MongoStore.create({ mongoURL }),

    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
    }))

  // uso query para mostarlo desde el navegador tambien!
routerApiSession.post('/login', (req, res) => {

    const { username, password } = req.body

    // if (username !== 'pepe' || password !== 'pepepass') {
    //     return res.status(401).send('login failed')
    // }

    req.session.user = username
    req.session.admin = true
    console.log("Comprobando post")
    // res.send('login success!')
    res.redirect('/')
})

function auth(req, res, next) {
    if (req.session.user === 'pepe' && req.session.admin) {
        return next()
    }
    return res.status(401).send('error de autorización!')
}

routerApiSession.get('/privado', auth, (req, res) => {
    console.log(req.session)
    res.send('si estas viendo esto es porque ya te logueaste!')
})

routerApiSession.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
        res.json({ status: 'Logout ERROR', body: err })
        } else {
        res.send('Logout ok!')
        }
    })
    // res.redirect('/')
})

export{routerApiSession}