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
require('./models/Postagem')
const Postagem = mongoose.model('postagens')
require('./models/Categoria')
const Categoria = mongoose.model('categorias')
const usuarios = require('./routes/usuario')
const passport = require('passport')
require('./config/auth')



//  CONFIGURAÇÕES
    //  SESSÃO
    app.use(session({
        secret: 'cursodenode',    // chave para gerar sessão. Precisa ser segura
        resave: true,
        saveUninitialized: true
    }))

    app.use(passport.initialize())
    app.use(passport.session()) 
    app.use(flash()) // devem ficar abaixo a sessão. configuram o passport e o flash

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

app.get('/', function(req, res){
    Postagem.find().lean().populate('categoria').sort({data: 'desc'}).then(function(postagens){
        res.render('index', {postagens: postagens})
    }).catch(function(err){
        req.flash('error_msg', 'Erro! Não foi possível carregar as postagens.')
        res.redirect('/404')
    })
})

app.get('/postagem/:slug', function(req, res){
    Postagem.findOne({slug: req.params.slug}).lean().then(function(postagem){
        if(postagem){
            res.render('postagem/index', {postagem: postagem})
        } else{
            req.flash('error_msg', 'Esta postagem não existe!')
            res.redirect('/')
        }
    }).catch(function(err){
        req.flash('error_msg', 'Houve um erro!')
        res.redirect('/')
    })
})

app.get('/categorias', function(req, res){
    Categoria.find().lean().sort({nome: 'asc'}).then(function(categorias){
        res.render('categorias/index', {categorias: categorias})
    }).catch(function(err){
        req.flash('error_msg', 'Houve um erro ao listar as categorias')
        res.redirect('/')
    })
    res.render
})

app.get('/categorias/:slug', function(req, res){
    Categoria.findOne({slug: req.params.slug}).lean().then(function(categoria){
        if(categoria){
            Postagem.find({categoria: categoria._id}).lean().then(function(postagens){
                res.render('categorias/postagens', {postagens: postagens, categoria: categoria})
            }).catch(function(err){
                req.flash('error_msg', 'Houve um erro ao listar as postagens!')
                res.redirect('/')
            })

        }else{
            req.flash('error_msg', 'Esta categoria não existe!')
            res.redirect('/')
        }
    }).catch(function(err){
        req.flash('error_msg', 'Houve um erro interno ao carregar a página dessa categoria')
        res.redirect('/')
    })
})

app.get('/404', function(req, res){
    res.send('ERRO 404!')
})

app.use('/admin', admin) // O '/admin' é o prefixo para acessar as rotas na variável admin

app.use('/usuario', usuarios) // precisa importar a rota com o require


//  OUTROS
const PORT = 8081
app.listen(PORT, function(){
    console.log('Servidor rodando em http://localhost:'+PORT)
})
