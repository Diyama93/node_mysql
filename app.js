const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

let bodyParser = require('body-parser')
let session = require('express-session')

dotenv.config({ path: './.env'});

const app = express();

/*
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})*/

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
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
/*
db.connect( (error) =>{
    if(error){
        console.log(error);
    }else {
        console.log("MYSQL Connected");
    }
})*/



//definir les routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
//app.use('/membre', require('./routes/auth'));

app.listen(5000, () =>{
    console.log("Server started on port 5000");
})

//afficher la pages des membres
app.get('/membre', (request, response) =>{
    let Membre = require('./models/membre');
    Membre.all( function (membres ) {
        response.render('membres/show.ejs', {membres: membres})
    })  
} )
app.get('/membre/add', (request, response) =>{
    let Membre = require('./models/membre');
    Membre.all( function (membres ) {
        response.render('membres/add.ejs', {membres: membres})
    })  
} )
app.post('/membre/add', (request, response) =>{
    if(request.body.nom === undefined || request.body.nom === ''){
        request.flash ('error', "Un problème en survenu membres non enrégitré :(")
        response.redirect('/membre/add')
    } else {
        let Membre = require('./models/membre')
        Membre.create(request.body.nom,request.body.prenom,request.body.email,request.body.dateFin,request.body.idType, function() {
            request.flash('success', "Membre envoyé :) Merci")
            response.redirect('/membre')
        })
    }
})

