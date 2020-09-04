let connection = require('../config/db')
let moment = require('../config/moment')

class Membre {
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
    get prenom() {
        return this.row.prenom
    }
    
    get email() {
        return this.row.email
    }
    
    get dateFin() {
        return moment(this.row.dateFin)
    }
    get idType() {
        return this.row.idType
    }

    //tous les types de membres
    
    static allType (cb){
        connection.query('SELECT libelle FROM type', (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Type(row)))
        } )
    }
    //create member
    static create (nom, prenom, email, dateFin, idType, cb) {
        //connexion à la bd et sauvé l'enré        
        connection.query('INSERT INTO membres SET nom = ?, prenom = ?, email = ?, dateFin = ?, idType = ?', [nom, prenom, email, dateFin, idType], (err, result) =>{
            if (err) throw err
            cb(result)
        })
    }
    //tous les membres
    static all (cb){
        connection.query('SELECT * FROM membres', (err, rows) => {
            if (err) throw err
            //renvoie un nouveau membre construit à partir de la ligne sélectionné
            cb(rows.map((row) => new Membre(row)))
        } )
    }
    
    static find (id, cb){
        connection.query('SELECT * FROM membres WHERE id = ? LIMIT 1', [id], (err, rows) => {
            if (err) throw err
            //je veut que tu renvoie le premier enrégistrement sous forme de membre
            cb(new Membre(rows[0]))
        } )
    }

}

module.exports = Membre