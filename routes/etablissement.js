const express = require('express');

const router2 = express.Router();

const connection = require("../config/db");

//afficher la pages des etablissements
router2.get('/etablissement',(request, response) =>{
    let etablissement = require('../models/etablissement');
    etablissement.all( function (etablissements ) {
        response.render('admin/etablissements/show.ejs', {etablissements: etablissements})
    })  
} )

//ajout etablissement
router2.get('/etablissement/add', (request, response) =>{
    let etablissement = require('../models/etablissement');
    etablissement.all( function (etablissements ) {
        response.render('admin/etablissements/add.ejs', {etablissements: etablissements})
    })  
} )
router2.post('/etablissement/add', (request, response) =>{
    if(request.body.nom === undefined || request.body.nom === ''){
        request.flash ('error', "Un problème en survenu etablissements non enrégitré :(")
        response.redirect('/etablissement/add')
    } else {
        let etablissement = require('../models/etablissement')
        etablissement.create(request.body.nom,request.body.respo,request.body.dateFin, function() {
            request.flash('success', "Etablissement enrégistré :) Merci")
            response.redirect('/etablissement')
        })
    }
})
//supprimer le etablissement
router2.get('/etablissement/:id/delete',(request, response)=>{
    connection.query('DELETE FROM etablissements WHERE id = ?',[request.params.id],(err, rows, fields)=>{
        if(!err){
            request.flash('success', "Le etablissement est bien supprimé :) Merci")
            response.redirect('/etablissement')
            }
            else {
                request.flash ('error', "Un problème en survenu etablissements non supprimé :(")
                response.redirect('/etablissement')
                console.log(err);
            }
    })
})

// modification etablissement

router2.get('/etablissement/:id/edit', (request, response) =>{
    let etablissement = require('../models/etablissement')
    etablissement.find(request.params.id, function(etablissement){
        response.render('admin/etablissements/edit.ejs', {etablissement: etablissement})
    })
} )

router2.post('/etablissement/:id/edit',(request, response)=>{
    let sql = "UPDATE etablissements SET nom='"+request.body.nom+"', respo='"+request.body.respo+"',\
   dateFin='"+request.body.dateFin+"' where id ="+request.body.id
      let query = connection.query(sql,(err, results) =>{
        if(!err){
            request.flash('success', "Le etablissement est bien modifié :) Merci")
            response.redirect('/etablissement')
            }
            else {
                request.flash ('error', "Un problème en survenu etablissement non modifié :(")
                response.redirect('/etablissement')
                console.log(err);
            }        
    })
})
module.exports = router2;