const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/registro', function(req, res){
    res.render('usuarios/registro')
})

router.post('/registro', function(req, res){
    var erros = []

    if(!req.body.nome || req.body.nome ==  undefined || req.body.nome == null){
        erros.push({texto: 'Nome inválido!'})
    }

    if(!req.body.email || req.body.email ==  undefined || req.body.email == null){
        erros.push({texto: 'E-mail inválido!'})
    }

    if(!req.body.senha || req.body.senha ==  undefined || req.body.senha == null){
        erros.push({texto: 'Senha inválida!'})
    }

    if(req.body.senha.length < 6){
        erros.push({texto: 'Senha muito curta! Sua senha tem que ter pelo menos 6 caracteres.'})
    }

    if(req.body.senha != req.body.senha2){
        erros.push({texto: 'As senha são diferentes! Tente novamente.'})
    }

    if(erros.length > 0){
        res.render('usuarios/registro', {erros: erros})
    }else{
        Usuario.findOne({email: req.body.email}).lean().then(function(usuario){
            if(usuario){
                req.flash('error_msg', 'Email já cadastrado!')
                res.redirect('/usuario/registro')
            }else{
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                })

                bcrypt.genSalt(10, function(erro, salt){
                    bcrypt.hash(novoUsuario.senha, salt, function(erro, hash){ // valor que quer hashear é o novoUsuario.senha
                        if (erro){
                            req.flash('error_msg', 'Houve um erro durante o salvmento do usuário')
                            res.redirect('/')
                        }
                        
                        novoUsuario.senha = hash

                        novoUsuario.save().then(function(){
                            req.flash('success_msg', 'Usuário registrado com sucesso!')
                            res.redirect('/')
                        }).catch(function(err){
                            req.flash('error_msg', 'Erro ao criar o usuário!')
                            res.redirect('/usuario/registro')
                        })
                    })
                }) // salt é 'sal', um valor aleatório misturado no hash que torna a senha ainda mais segura
            }
        }).catch(function(err){
            req.flash('error_msg', 'Houve um erro!')
            res.redirect('/')
        })
    }
})

router.get('/login', function(req, res){
    res.render('usuarios/login')
})

router.post('/login', function(req, res, next){ // rota de autenticação
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/usuario/login',
        failureFlash: true
    })(req, res, next)
}) 

router.get('/logout', function(req, res){
    req.logout() // passport faz logout
    req.flash('success_msg', 'Deslogado com sucesso.')
    res.redirect('/')
})

module.exports = router