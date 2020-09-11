let connection = require('../config/db')
let moment = require('../config/moment')

class Etablissement {
    //créer un constructeur qui prend un enrégistrement
    constructor (row) {
        this.row = row
    }
    //créer des getter pour récupérer les info
    get id() {
        return this.row.id
    }
    get nom() {
        return this.row.nom
    }
    get respo() {
        return this.row.respo
    }        
    get dateFin() {
        return moment(this.row.dateFin)
    }

  
    //create ets
    static create (nom, respo, dateFin, cb) {
        //connexion à la bd et sauvé l'enré        
        connection.query('INSERT INTO etablissements SET nom = ?, respo = ?, dateFin = ?', [nom, respo, dateFin], (err, result) =>{
            if (err) throw err
            cb(result)
        })
    }
    //tous les etablissements
    static all (cb){
        connection.query('SELECT * FROM etablissements', (err, rows) => {
            if (err) throw err
            //renvoie un nouveau etablissement construit à partir de la ligne sélectionné
            cb(rows.map((row) => new Etablissement(row)))
        } )
    }
    //selectionner un etablissement
    static find (id, cb){
        connection.query('SELECT * FROM etablissements WHERE id = ? LIMIT 1', [id], (err, rows) => {
            if (err) throw err
            //je veut que tu renvoie le premier enrégistrement sous forme de etablissement
            cb(new Etablissement(rows[0]))
        } )
    }
    //modifier etablissement
    static update (request, response){
        connection.query('UPDATE etablissements SET ? WHERE id = ?', [request.params.id], function(err, result){
            if(err) throw err;
            
            console.log('Record Updated ' + result.changedRows + ' rows');
            cb(new Etablissement(rows[0]))
      });
    }

}

module.exports = Etablissement