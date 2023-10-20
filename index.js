require('dotenv').config('./.env')
const path = require('path')
const sequelize = require('./db')
const express = require('express')
const cookieParser = require('cookie-parser')
const { requireAuth } = require('./controllers/authController')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

const session = require('express-session')
const sessionLength = 1000 * 60 * 60  // 1 hr
const SessionStore = require('express-session-sequelize')(session.Store)
const sequelizeSessionStore = new SessionStore({ db: sequelize, checkExpirationInterval: 1000 * 60 * 15, expiration: sessionLength })

const csrf = require('./mySimpleCsrf')

//middleware

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sequelizeSessionStore,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: sessionLength,
        httpOnly: true
    }
}))

app.use(csrf)

//logger
app.use((req,res,next)=>{
    console.log(`${req.method} - ${req.url} - ${req.headers['X-XSRF-TOKEN'] || 'none'}`)
    next()
})

//routes


app.use('/auth', require('./routes/authRoutes'))
app.use('/list', requireAuth, require ('./routes/listRoutes'))

//app.use('/login', (req,res)=>{res.send('Login Page')})

app.use( express.static(path.join(__dirname, '___frontend', 'dist')))
app.get ('/', (req,res)=>{res.sendFile(path.join(__dirname,'___frontend','dist','index.html'))})


//error handler
app.use((err, req, res, next) => {
    if (err) {
        console.log(err.message);
        res.send(err.message)
    }
})

//start server
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})