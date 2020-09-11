const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

let connection = require('../config/db')
exports.login = async (req, res) => {
    try {
        const{ email, password} = req.body;

        if( !email || !password) {
            return res.status(400).render('login',{
                message: 'SVP veillez saisir l\'adresse mail et le mot de passe'
            })
        }

        connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            console.log(results);
            if(!results || !(await bcrypt.compare(password, results[0].password)) ){
                res.status(401).render('login', {
                    message: "L'adresse mail ou le mot de passe est incorrecte"
                })
            }else {
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("Votre token est :  " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/admin");
            }
        })

    } catch (error) {
        console.log(error);
    }
}

exports.register = (req, res) => {
    console.log(req.body);
   
    const { name, email, password, passwordConfirm} = req.body;
    
    connection.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error){
            console.log(error);
        }

        if(results.length > 0) {
            return res.render('register', {
                message: 'Adresse mail déjà utilisé'
            })
        }else if( password !== passwordConfirm){
            return res.render('register', {
                message: 'Le mot de passe n\'est pas conforme'
            });           
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        connection.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (error, results)=>{
            if(error){
                console.log(error);
            }else {
                console.log(results);
                return res.render('register', {
                    message: 'Utlisateur bien enrégistré'
                });  
            }
        })

    });
}