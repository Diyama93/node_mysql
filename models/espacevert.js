let connection = require('../config/db')
let moment = require('../config/moment')
const { request } = require('express')

class Espacevert {
    //créer un constructeur qui prend un enrégistrement
    constructor (row) {
        this.row = row
    }
    //créer des getter pour récupérer les info
    get id() {
        return this.row.id
    }
    get longitude() {
        return this.row.longitude
    }
    get latitude() {
        return this.row.latitude
    }        
    get idEts() {
        return this.row.idEts
    }

  
    //create ets
    static create (longitude, latitude, idEts, cb) {
        //connexion à la bd et sauvé l'enré                
        connection.query("INSERT INTO espaceverts SET \
                            longitude = ?, \
                            latitude = ?, \
                            idEts = (SELECT id FROM etablissements WHERE nom = ?)", 
                            [longitude, latitude, idEts], (err, result) =>{
            if (err) throw err
            cb(result)
        })
    }
    //tous les espaceverts
    static all (cb){
        connection.query('SELECT * FROM espaceverts', (err, rows) => {
            if (err) throw err
            //renvoie un nouveau espacevert construit à partir de la ligne sélectionné
            cb(rows.map((row) => new Espacevert(row)))
        } )
    }
    //selectionner un espacevert
    static find (id, cb){
        connection.query('SELECT * FROM espaceverts WHERE id = ? LIMIT 1', [id], (err, rows) => {
            if (err) throw err
            //je veut que tu renvoie le premier enrégistrement sous forme de espacevert
            cb(new espacevert(rows[0]))
        } )
    }
    //modifier espacevert
    static update (request, response){
        connection.query('UPDATE espaceverts SET ? WHERE id = ?', [request.params.id], function(err, result){
            if(err) throw err;
            
            console.log('Record Updated ' + result.changedRows + ' rows');
            cb(new espacevert(rows[0]))
      });
    }

}

module.exports = Espacevert