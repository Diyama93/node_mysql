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
//ajout membre
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
        Membre.create(request.body.nom,request.body.prenom,request.body.email,request.body.dateFin,request.body.type, function() {
            request.flash('success', "Membre envoyé :) Merci")
            response.redirect('/membre')
        })
    }
})
//supprimer le membre
app.get('/membre/:id/delete',(request, response)=>{
    connection.query('DELETE FROM membres WHERE id = ?',[request.params.id],(err, rows, fields)=>{
        if(!err){
            request.flash('success', "Le membre est bien supprimé :) Merci")
            response.redirect('/membre')
            }
            else {
                request.flash ('error', "Un problème en survenu membres non supprimé :(")
                response.redirect('/membre')
                console.log(err);
            }
    })
})

// modification membre

app.get('/membre/:id/edit', (request, response) =>{
    let Membre = require('./models/membre')
    Membre.find(request.params.id, function(membre){
        response.render('membres/edit.ejs', {membre: membre})
    })
} )
/*
app.post('/membre/:id/edit',(request, response)=>{
    var param = [
        request.body, //donnée de modification
        request.query.id //condition de modification
    ]
    connection.query('UPDATE FROM membres WHERE id = ?', param, function(err, rows){
        if(!err){
            request.flash('success', "Le membre a été bien modifié :) Merci")
            response.redirect('/membre')
        }
        else {
            request.flash ('error', "Un problème en survenu membres non modifié :(")
            response.redirect('/membre')
            console.log(err);
        }
    })
})

app.post('/membre/:id/edit',(request, response)=>{
    const mbrId = request.body.id;
    let sql = "update membres set nom='"+request.body.nom+"', prenom='"+request.body.prenom+"', email='"+request.body.email+"', dateFin='"+request.body.dateFin+"', type='"+request.body.type+"' where id ="+mbrId;
    

   connection.query(sql,(err, results) =>{
        if(!err){
            request.flash('success', "Le membre est bien supprimé :) Merci")
            response.redirect('/membre')
            }
            else {
                request.flash ('error', "Un problème en survenu membres non supprimé :(")
                response.redirect('/membre')
                console.log(err);
            }        
    })
})*/
app.post('/membre/:id/edit',(request, response)=>{
    const {id} = request.params;
    const newMember = request.body;
  
    //request.connection((err, conn) =>{            
        connection.query('UPDATE membres SET ? WHERE id = ?',[newMember,request.params.id],(err, rows)=>{
            if(!err){
                request.flash('success', "Le membre est bien modifié :) Merci")
                response.redirect('/membre')
                }
                else {
                    request.flash ('error', "Un problème en survenu membres non modifié :(")
                    response.redirect('/membre')
                    console.log(err);
                }
        })
    //})
})