import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { randomUUID } from 'crypto'
import dotenv from 'dotenv'

const routerApiSession = express.Router();

const mongoURL = 'mongodb://localhost/sessiones'

routerApiSession.use(express.json())

dotenv.config();

routerApiSession.use(session({

    // store: MongoStore.create({ mongoURL }),

    // secret: 'secreto',
    // resave: false,
    // saveUninitialized: false,

    secret: process.env.SECRET,
    resave: process.env.RESAVE,
    saveUninitialized: process.env.SAVEUNINITIALIZED,


    // cookie: {
    //     maxAge: 60000
    // }
    }))

// routerApiSession.post('/login', (req, res) => {

//     const { username, password } = req.body

//     req.session.user = username
//     req.session.admin = true
//     console.log("Comprobando post")
//     res.redirect('/')
// })

// function auth(req, res, next) {
//     if (req.session.user === 'pepe' && req.session.admin) {
//         return next()
//     }
//     return res.status(401).send('error de autorización!')
// }

// routerApiSession.get('/privado', auth, (req, res) => {
//     console.log(req.session)
//     res.send('si estas viendo esto es porque ya te logueaste!')
// })

// routerApiSession.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) {
//         res.json({ status: 'Logout ERROR', body: err })
//         } else {
//         res.send('Logout ok!')
//         }
//     })
// })


routerApiSession.use(passport.initialize())

//----sesiones! opcional!
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((uid, done) => {
    const user = Object.values(users).find(u => u.id === uid)
    done(null, user)
});

routerApiSession.use(passport.session())
//----fin sesiones! opcional!

const users = {}

routerApiSession.post('/users', (req, res, next) => {
    const user = req.body
    user.id = randomUUID()
    users[user.username] = user
    res.status(201).json(user)
})

routerApiSession.get('/users/:username', (req, res, next) => {
    res.json(users[req.params.username])
})

passport.use('local-login', new LocalStrategy(
    {},
    (username, password, done) => {
        const user = users[username]
        if (user?.password !== password) {
            return done(null, false)
        }
        done(null, user)
    })
)

routerApiSession.post('/sessions',
    passport.authenticate('local-login', { failWithError: true }),
    (req, res) => {
        res.status(201).json({ user: req.user, sessionStart: Date.now() })
    }
)

function soloUsuariosLogueados(req, res, next) {
    if (!req.isAuthenticated()) {
        res.sendStatus(401)
    }
    next()
}

routerApiSession.get('/sessions', soloUsuariosLogueados, (req, res, next) => {
    res.json(req.user)
})

routerApiSession.delete('/session', (req, res, next) => {
    req.logout(err => {
        res.sendStatus(200)
    })
})

routerApiSession.use((err, req, res, next) => {
    res.status(err.status).json({ msg: 'el error es: ' + err.message })
})

export{routerApiSession}