const express = require('express');

const router3 = express.Router();

const connection = require("../config/db");

//afficher la pages des espaceverts
router3.get('/espacevert',(request, response) =>{
    let espacevert = require('../models/espacevert');
    espacevert.all( function (espaceverts ) {
        response.render('admin/espaceverts/show.ejs', {espaceverts: espaceverts})
    })  
} )

//ajout espacevert
router3.get('/espacevert/add', (request, response) =>{
    let etablissement = require('../models/etablissement');
    etablissement.all( function (etablissements ) {
        response.render('admin/espaceverts/add.ejs', {etablissements: etablissements})
    })  
} )
router3.post('/espacevert/add', (request, response) =>{
    if(request.body.idEts === undefined || request.body.idEts === ''){
        request.flash ('error', "Choisir un établissement d'installation :(")
        response.redirect('/espacevert/add')
    } else if(request.body.longitude === undefined || request.body.longitude === ''){
        request.flash ('error', "veillez verifie la  longitude saisie :(")
        response.redirect('/espacevert/add')
    }else {
        let espacevert = require('../models/espacevert')
        espacevert.create(request.body.longitude,request.body.latitude,request.body.idEts, function() {
            request.flash('success', "espacevert enrégistré :) Merci")
            response.redirect('/espacevert')
        })
    }
})
//supprimer le espacevert
router3.get('/espacevert/:id/delete',(request, response)=>{
    connection.query('DELETE FROM espaceverts WHERE id = ?',[request.params.id],(err, rows, fields)=>{
        if(!err){
            request.flash('success', "Le espacevert est bien supprimé :) Merci")
            response.redirect('/espacevert')
            }
            else {
                request.flash ('error', "Un problème en survenu espaceverts non supprimé :(")
                response.redirect('/espacevert')
                console.log(err);
            }
    })
})

// modification espacevert

router3.get('/espacevert/:id/edit', (request, response) =>{
    let espacevert = require('../models/espacevert')
    espacevert.find(request.params.id, function(espacevert){
        response.render('admin/espaceverts/edit.ejs', {espacevert: espacevert})
    })
} )

router3.post('/espacevert/:id/edit',(request, response)=>{
    let sql = "UPDATE espaceverts SET nom='"+request.body.nom+"', respo='"+request.body.respo+"',\
   dateFin='"+request.body.dateFin+"' where id ="+request.body.id
      let query = connection.query(sql,(err, results) =>{
        if(!err){
            request.flash('success', "Le espacevert est bien modifié :) Merci")
            response.redirect('/espacevert')
            }
            else {
                request.flash ('error', "Un problème en survenu espacevert non modifié :(")
                response.redirect('/espacevert')
                console.log(err);
            }        
    })
})
module.exports = router3;