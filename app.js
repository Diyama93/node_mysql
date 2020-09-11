const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

let bodyParser = require('body-parser')
let session = require('express-session');
const { request } = require("http");
const { response } = require("express");
const connection = require("./config/db");
const { error } = require("console");

dotenv.config({ path: './.env'});

const app = express();


const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));


app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(require('./middlewares/flash'));

app.set('view engine', 'ejs');
app.set('view engine', 'hbs');


/* Vérification du token */
const checkTokenMiddleware = (req, res, next) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    // Présence d'un token
    if (!token) {
        //return res.render('login')
        return res.status(401).json({ message: 'Error. Need a token' })
    }

    // Véracité du token
    jwt.verify(token, SECRET, (err, decodedToken) => {
        if (err) {
           // return res.render('login')
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            return next()
            //response.redirect('/admin')
        }
    })
}

//definir les routes

//pour la connexion
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

//pour la gestion des membres
const route1 = require('./routes/membre')
app.use(route1)

//pour la gestion des centres de formations
const route2 = require('./routes/etablissement')
app.use(route2)

//pour la gestion des centres de formations
const route3 = require('./routes/espacevert')
app.use(route3)

//choix du port
app.listen(5000, () =>{
    console.log("Server started on port 5000");
})
//,checkTokenMiddleware,
app.get('/admin' ,(request, response) =>{
    response.render('admin/index.ejs')
} )
