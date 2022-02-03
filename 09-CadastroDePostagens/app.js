const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const Sequelize = require('sequelize')



//  CONFIG
    //  TEMPLATE ENGINE  
    app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main.handlebars"}));
    app.set('view engine', 'handlebars');
    app.set("views", "./views");
<<<<<<< HEAD:09-CadastroDePostagens/app.js
    
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

=======
    app.get('/', (req, res) => {
        res.render('home');
    });

    //  CONEXÃO COM O BANCO DE DADOS
    const sequelize = new Sequelize('test', 'root', '@Rafael123', {
        host: 'localhost',
        dialect: 'mysql'
    })

//  ROTAS

>>>>>>> parent of 6e0a30c (atualizações):9-CadastroDePostagens/app.js
app.get('/cadastro', function(req, res){
    res.render('formulario')
})

app.post('/adicionar', function(req, res){ // 'post' só pode ser acessada quando alguém faz requisiçao com método post
    res.send('Formulário recebido!')})

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