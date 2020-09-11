const express = require('express');

const router1 = express.Router();

const connection = require("../config/db");

//afficher la pages des membres
router1.get('/membre',(request, response) =>{
    let Membre = require('../models/membre');
    Membre.all( function (membres ) {
        response.render('admin/membres/show.ejs', {membres: membres})
    })  
} )

//ajout membre
router1.get('/membre/add', (request, response) =>{
    let Membre = require('../models/membre');
    Membre.all( function (membres ) {
        response.render('admin/membres/add.ejs', {membres: membres})
    })  
} )
router1.post('/membre/add', (request, response) =>{
    if(request.body.nom === undefined || request.body.nom === ''){
        request.flash ('error', "Un problème en survenu membres non enrégitré :(")
        response.redirect('/membre/add')
    } else {
        let Membre = require('../models/membre')
        Membre.create(request.body.nom,request.body.prenom,request.body.email,request.body.dateFin,request.body.type, function() {
            request.flash('success', "Membre envoyé :) Merci")
            response.redirect('/membre')
        })
    }
})
//supprimer le membre
router1.get('/membre/:id/delete',(request, response)=>{
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

router1.get('/membre/:id/edit', (request, response) =>{
    let Membre = require('../models/membre')
    Membre.find(request.params.id, function(membre){
        response.render('admin/membres/edit.ejs', {membre: membre})
    })
} )

router1.post('/membre/:id/edit',(request, response)=>{
    let sql = "UPDATE membres SET nom='"+request.body.nom+"', prenom='"+request.body.prenom+"',\
    email='"+request.body.email+"', dateFin='"+request.body.dateFin+"', type='"+request.body.type+"' where id ="+request.body.id
      let query = connection.query(sql,(err, results) =>{
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
})
module.exports = router1;