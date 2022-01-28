// Arquivo principal - Carrega Módulos

const express = require('express')
const app = express()
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser')
const admin = require('./routes/admin')
const path = require('path') // módulo para trabalhar com pastas
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash') // tipo de sessão que só aparece uma vez, quando a página é recarregada, ela não está mais lá, como a mensagem "categoria criada com sucesso"



//  CONFIGURAÇÕES
    //  SESSÃO
    app.use(session({
        secret: 'cursodenode',    // chave para gerar sessão. Precisa ser segura
        resave: true,
        saveUninitialized: true
    }))

    app.use(flash()) // deve ficar abaixo a sessão

    //  MIDDLEWARE
    app.use(function(req, res, next){
        res.locals.success_msg = req.flash('success_msg') // res.locals cria variável global
        res.locals.error_msg = req.flash('error_msg')
        next()
    })

    //  BODY PARSER
    app.use(bodyParser.urlencoded({ extended: true })) // O extended ser true significa que os valores analisados no body podem ser de qualquer tipo. Se fosse falso, seriam aceitos apenas strings e arrays
    app.use(bodyParser.json())

    //  HANDLEBARS
    app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main.handlebars"}))
    app.set('view engine', 'handlebars')
    app.set("views", "./views")
    
    


    //  MONGOOSE
    mongoose.connect('mongodb://localhost/blogapp').then(function(){
        console.log('Conectado ao Mongo com sucesso!')
    }).catch(function(err){
        console.log('Erro ao se conectar ao Mongo'+err)
    }) // cria o banco de dados


    //  PUBLIC
    app.use(express.static(path.join(__dirname, 'public'))) // Fala para o express que a pasta com todos arquivos estáticos é a 'public'. O path.join com __dirname pega o caminho absoluto para a pasta public, afim de evitar erros.
    
    //  MIDDLEWARE -- tudo que tem o app.use. Todos recebem req res next
    /*app.use(function(req, res, next){
        console.log('Oi eu sou um Middleware!')
        next()
    })*/



//  ROTAS (quando se trabalha com muitas rotas, é melhor salvar em outro local)

app.use('/admin', admin) // O '/admin' é o prefixo para acessar as rotas na variável admin


//  OUTROS
const PORT = 8081
app.listen(PORT, function(){
    console.log('Servidor rodando em http://localhost:'+PORT)
})
