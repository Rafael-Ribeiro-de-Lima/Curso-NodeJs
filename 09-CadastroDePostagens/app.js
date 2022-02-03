const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser')
const Post = require('./models/Post')

//  CONFIG
    //  TEMPLATE ENGINE  
    app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main.handlebars"}));
    app.set('view engine', 'handlebars');
    app.set("views", "./views");
    
    //  BODY PARSER
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

//  ROTAS

app.get('/', function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
        res.render('home', {posts: posts})
    })
})

    // Parametro posts pode ter qualquer nome
    // Post.all() retorna todos os posts existentes na tabela
    // order por id ordena os dados por id, podendo ser 'DESC' (do mais antigo pro mais novo) ou 'ASC'
    // render renderiza o arquivo home.handlebars e nas chaves pode colocar qualquer dado para o front-end (handlebars)

app.get('/cadastro', function(req, res){
    res.render('formulario')
})

app.post('/adicionar', function(req, res){ 
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('/') // Redireciona após fazer a postagem.
    }).catch(function(erro){
        res.send(`Houve um erro: ${erro}`)
    })
})
    //res.send(`Texto: ${req.body.titulo} Conteúdo: ${req.body.conteudo}`)})

// 'post' só pode ser acessada quando alguém faz requisiçao com método post

// Graças ao bodyparser, pode-se salvar os dados enviados pelo formulário de forma simples, utilizando req.body."nameDaTag"


// existem rotas get, post, delete, put, path,... pela url, só se consegue acessar rotas do tipo get

app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {id: req.params.id}}).then(function(){
        res.send('Postagem deletada com sucesso!')
    }).catch(function(erro){
        res.send('Essa postagem não existe!')
    })
})

// Esse "id" é o id do banco de dados

app.listen(8090, function(){
    console.log('Servidor rodando na url http://localhost:8090')
});