const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') // comparar as senhas

//  MODEL DE USUÁRIO
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')


// CONFIGURA SISTEMA DE AUTENTICAÇÃO
module.exports = function(passport){ // usernameField é qual campo vai ser analisado
    passport.use(new localStrategy( {usernameField: 'email', passwordField: 'senha'}, function(email, senha, done){ 
        Usuario.findOne({email: email}).lean().then(function(usuario){
            if(!usuario){
                return done(null, false, {message: 'Email não cadastrado!'})
            }
            bcrypt.compare(senha, usuario.senha, function(erro, batem){
                if(batem){
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: 'Senha incorreta!'})
                }
            })
            
        })
    })) 

    passport.serializeUser(function(usuario, done){
        done(null, usuario)
    }) // salva dados do usuario na sessão

    passport.deserializeUser(function(id, done){
        Usuario.findById(id, function(err, usuario){
            done(err, usuario)
        })
    }) // salva dados do usuario na sessão

}